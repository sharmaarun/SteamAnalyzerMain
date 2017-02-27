/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.compiler.parser;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sa.compiler.entities.StreamStage;
import com.sa.components.base.ComponentsMap;
import com.sa.pomeditor.PomEditor;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.Base64;
import java.util.HashMap;

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
        mavenProject.loadProject(projectPath+"/pom.xml");
        System.out.println("Adding core library ...");
        mavenProject.removeProjectDependency(System.getProperty("coreLibPath"));
        //TODO: replace "maven" with variable value  v c
        mavenProject.addProjectDependency(System.getProperty("coreLibPath"),"maven");
        
        //imports
        String imports = ""
                + "import com.sa.core.StreamAnalyzer;\n"
                + "import java.util.concurrent.TimeUnit;\n"
                + "import org.apache.spark.api.java.JavaRDD;\n"
                + "import org.apache.spark.api.java.JavaSparkContext;\n"
                + "import java.util.HashMap;\n"
                + "\n";

//Get all the stages and connections and set fully qualified class names
        String stagesCode = "";
        for (StreamStage stage : parser.getStreamStages()) {

            //TODO: remove below comment
            //String fqcn = (String) cMap.getComponentsMap().get(stage.getPlugin()).get("fqcn");
            ////inject dependencies
            System.out.println("Adding plugin : " + stage.getPlugin() + " as dependency...");
            String pluginPath = System.getProperty("pluginsPath") + "/" + stage.getPlugin();
            //read the json file
            try {
                JsonNode topology = mapper.readTree(new File(pluginPath + "/plug.json"));
                String fqcn = topology.get("fqcn").asText();
                String plugin = topology.get("plugin").asText();
                String pkg = topology.get("package").asText();
                String jar = topology.get("jar").asText();

                //check if the plugin name matches plugin path specified
                if (stage.getPlugin().equalsIgnoreCase(plugin)) {
                    stage.setFqcn(fqcn);
                    imports += "import " + fqcn+" ; \n\n";
                    
                    mavenProject.removeProjectDependency(pluginPath);
                    mavenProject.addProjectDependency(pluginPath, jar);
                }
            } catch (Exception ex) {
                System.out.println("Error occured while reading plugin config! Skipping. This may lead to fatal error at runtime!");
                ex.printStackTrace();
                continue;
            }

            try {
                
                HashMap<String, Object> metaMap = new HashMap<>();
                String serializedMetaMap = serialize(metaMap);
                boolean metaDataFound = false;
                try {
                

                    //serialize the metadata
                    JsonNode data = stage.getMetadata();
                    metaMap = mapper.convertValue(data, HashMap.class);

                    for (String k : metaMap.keySet()) {
                        System.out.println("key: " + k + " value :" + metaMap.get(k));
                    }

                    serializedMetaMap = serialize(metaMap);
                    metaDataFound = true;
                
                } catch (Exception ex) {
                    System.out.println("Warning: No metadata found / Invalid metadata, skipping preloading!");
                    ex.printStackTrace();
                    metaDataFound = false;
                }

                stagesCode += stage.getFqcn() + " tsp_" + stage.getId() + " = new  " + stage.getFqcn() + "(sc, sa); \n\n";
                if (metaDataFound) {
                    stagesCode += "HashMap<String,Object> metaData = (HashMap<String,Object>)tsp_" + stage.getId() + ".deserialize(\"" + serializedMetaMap + "\");\n\n";
                    stagesCode += "tsp_" + stage.getId() + ".preload(metaData); \n\n";
                }
                stagesCode += "tsp_" + stage.getId() + ".start(); \n\n";

            } catch (Exception ex) {
                System.out.println("Error : ");
                ex.printStackTrace();
                return false;
            }

        }

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

        FileOutputStream fos = new FileOutputStream(new File(projectPath+"/src/main/java/com/sa/SAEntryPoint.java"));
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
