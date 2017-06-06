/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.compiler.parser;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sa.compiler.commons.EntityTypeEnums;
import com.sa.compiler.entities.Connection;
import com.sa.compiler.entities.Stage;
import com.sa.components.base.ComponentsMap;
import com.sa.pomeditor.PomEditor;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

/**
 *
 * @author arunsharma
 */
public class ClassWriter {

    private ComponentsMap cMap;
    private String code;
    private String projectPath;
    private ObjectMapper mapper;
    private PomEditor mavenProject;

    public ClassWriter(String projectPath) {

        this.projectPath = projectPath;
        cMap = ComponentsMap.getInstance();
        code = "";
        mapper = new ObjectMapper();

    }

    public boolean prepare(Parser parser) {
        PomEditor mavenProject = new PomEditor();
        mavenProject.loadProject(projectPath + "/pom.xml");
        System.out.println("Adding core library ...");
        mavenProject.removeProjectDependency(System.getProperty("coreLibPath"));
        //TODO: replace "maven" with variable value  v c
        mavenProject.addProjectDependency(System.getProperty("coreLibPath"), "maven");

        //imports
        String imports = ""
                + "import com.sa.core.StreamAnalyzer;\n"
                + "import java.util.concurrent.TimeUnit;\n"
                + "import org.apache.spark.api.java.JavaRDD;\n"
                + "import org.apache.spark.api.java.JavaSparkContext;\n"
                + "import java.util.HashMap;\n"
                + "\n";

        //Get all the stages and connections and set fully qualified class names
        String stagesCode = "", initCode = "";
        ArrayList<String> stagesCodeArr = new ArrayList<>();
        stagesCodeArr.add("LEAVE_IT_LIKE_THIS");
        ArrayList<Stage> tmpStages = new ArrayList<>();
        // streamer id is the id of the stream starting stage
        // Only one stream stage can be present in a topology at a time because of Apache Spark's limitations
        int streamerId = 0;
        for (Stage stage : parser.getStages()) {
            if (stage.getType() == EntityTypeEnums.STREAM_STAGE) {
                tmpStages.add(stage);
            }
        }
        for (int si = 0; si < tmpStages.size(); si++) {
            Stage stage = tmpStages.get(si);

            //TODO: remove below comment
            //String fqcn = (String) cMap.getComponentsMap().get(stage.getPlugin()).get("fqcn");
            ////inject dependencies
            System.out.println("Adding plugin : " + stage.getPlugin().getName() + "[Type:" + stage.getType() + "] as dependency...");
            String pluginPath = System.getProperty("pluginsPath") + "/" + stage.getPlugin().getName();
            //read the json file
            try {
                JsonNode topology = mapper.readTree(new File(pluginPath + "/plug.json"));
                String fqcn = topology.get("fqcn").asText();
                String plugin = topology.get("plugin").asText();
                String pkg = topology.get("package").asText();
                String jar = topology.get("jar").asText();
//                int version = Integer.parseInt(topology.get("_v").asText().replaceAll(".", ""));
//                int stagePluginVersion = Integer.parseInt(stage.getPlugin().getV());

                //check if the plugin name matches plugin path specified
                if (stage.getPlugin().getName().equalsIgnoreCase(plugin)) {

                    imports += "import " + fqcn + " ; \n\n";

                    mavenProject.removeProjectDependency(pluginPath);
                    mavenProject.addProjectDependency(pluginPath, jar);
                } else {
                    //invalid plugin version / plugin version mismatch
                    System.out.println("Plugin version/name mismatch! This may lead to error at runtime.");
                }
            } catch (Exception ex) {
                System.out.println("Error occured while reading plugin config! Skipping. This may lead to fatal error at runtime!");
                ex.printStackTrace();
                continue;
            }

            try {

                HashMap<String, Object> metaMap = new HashMap<>();
                String serializedMetaMap = "";
                try {

                    //serialize the metadata
                    JsonNode data = stage.getPlugin().getClientParams();
                    ArrayList<HashMap<String, String>> tmp = new ArrayList<>();
                    tmp = mapper.convertValue(data, ArrayList.class);

                    for (HashMap<String, String> mp : tmp) {
                        metaMap.put(mp.get("param"), mp.get("nv") == null ? "" : mp.get("nv"));
                    }

                } catch (Exception ex) {
                    System.out.println("Warning: No metadata found / Invalid metadata, skipping preloading!");
                    ex.printStackTrace();
                }
                
                //put extra parameters
                //component id
                metaMap.put("id", stage.getId());
                metaMap.put("_stage_type_", stage.getName());
                
                serializedMetaMap = serialize(metaMap);

                initCode += stage.getPlugin().getFqcn() + " tsp_" + stage.getId() + " = new  " + stage.getPlugin().getFqcn() + "(sc, sa); \n\n";
                stagesCode += "HashMap<String,Object> metaData_" + stage.getId() + " = (HashMap<String,Object>)tsp_" + stage.getId() + ".deserialize(\"" + serializedMetaMap + "\");\n\n";
                stagesCode += "tsp_" + stage.getId() + ".updateProperties(metaData_" + stage.getId() + "); \n\n";
                stagesCode += "tsp_" + stage.getId() + ".preload(); \n\n";
                stagesCode += "tsp_" + stage.getId() + ".setId(" + stage.getId() + "); \n\n";
                stagesCode += "tsp_" + stage.getId() + ".setName(\"" + stage.getName() + "\"); \n\n";

                //check for all the output connections and push the related stage to tmpStages
                Iterator<String> outputsIterator = stage.getPathsOut().fieldNames();
                String p;
                int nextId = -1;
                if (outputsIterator.hasNext()) {
                    p = outputsIterator.next();
                    for (JsonNode n : stage.getPathsOut().get(p)) {
                        nextId = Integer.parseInt(n.get("to").get("node").get("id").asText());
                        for (Stage stg : parser.getStages()) {
                            if (stg.getId() == nextId) {
                                tmpStages.add(stg);
                            }
                        }
                    }
                }

                //check if the stage has any connections
                int sid = -1;
                //check if input/output paths connected
                Iterator<String> itr = stage.getPathsIn().fieldNames();
                if (!stage.getPathsIn().isNull()) {
                    itr.next();
                }

                if (!stage.getPathsIn().isNull() && itr.hasNext()) {

                    String field = itr.next();
                    sid = Integer.parseInt(stage.getPathsIn().get(field).get("from").get("node").get("id").asText());
                }

                if (sid >= 0) {
                    stagesCode += "tsp_" + stage.getId() + ".fetch(tsp_" + sid + ".poll()); \n\n";
//                    stagesCode += "tsp_"+stage.getId()+".setInputStreamPath(tsp_"+sid+".getCheckpointPath()); \n\n";
                }

                stagesCode += "tsp_" + stage.getId() + ".start(); \n\n";
                if (stage.getType() == EntityTypeEnums.STREAM_STAGE && streamerId == 0) {
                    streamerId = stage.getId();
                    stagesCodeArr.set(0, stagesCode);
                } else {
                    stagesCodeArr.add(stagesCode);
                }
                stagesCode = "";

            } catch (Exception ex) {
                System.out.println("Error : ");
                ex.printStackTrace();
                return false;
            }

        }

        //TODO: make it flexible
        for (String sc : stagesCodeArr) {
            stagesCode += sc;
        }
        stagesCode = initCode + stagesCode;
        stagesCode += "tsp_" + streamerId + ".getJsc().start(); \n";
        stagesCode += "tsp_" + streamerId + ".getJsc().awaitTermination(); \n";

        //for each stage, based on it's type, append to the eventual code string, the resulting code corresponding to this stage
        //once the final code string is ready, write it to file
        code += ""
                + "package com.sa;\n"
                + "\n"
                + imports
                + "/**\n"
                + " *\n"
                + " * \n"
                + " */\n"
                + "public class SAEntryPoint {\n"
                + "    \n"
                + "    public static void main(String args[]) throws Exception {\n"
                + "        \n"
                + "        StreamAnalyzer sa = StreamAnalyzer.initialize(args);\n"
                + "        JavaSparkContext sc = sa.getContext();\n"
                + "         " + stagesCode + " \n\n"
                + "        \n"
                + "        \n"
                + "    }\n"
                + "    \n"
                + "}\n"
                + "";
        return true;
    }

    public void write() throws FileNotFoundException, IOException {

        FileOutputStream fos = new FileOutputStream(new File(projectPath + "/src/main/java/com/sa/SAEntryPoint.java"));
        fos.write(code.getBytes());
        fos.close();
    }

    /**
     * Write the object to a Base64 string.
     */
    private static String serialize(Serializable o) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(o);
        oos.close();
        return Base64.getEncoder().encodeToString(baos.toByteArray());
    }

}
