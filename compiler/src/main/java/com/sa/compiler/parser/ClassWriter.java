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
    private String filePath;
    private ObjectMapper mapper;

    public ClassWriter(String classFilePath) {

        filePath = classFilePath;
        cMap = ComponentsMap.getInstance();
        code = "";
        mapper = new ObjectMapper();

    }

    public boolean prepare(Parser parser) {

        //imports
        String imports = "import com.sa.components.base.TwitterStreamProvider;\n"
                + "import com.sa.core.StreamAnalyzer;\n"
                + "import java.util.concurrent.TimeUnit;\n"
                + "import org.apache.spark.api.java.JavaRDD;\n"
                + "import org.apache.spark.api.java.JavaSparkContext;\n"
                + "import java.util.HashMap;\n"
                + "\n";

//Get all the stages and connections and set fully qualified class names
        String stagesCode = "";
        for (StreamStage stage : parser.getStreamStages()) {

            String fqcn = (String) cMap.getComponentsMap().get(stage.getPlugin()).get("fqcn");
            stage.setFqcn(fqcn);
            try {
                Class clazz = Class.forName(fqcn);
                HashMap<String, Object> metaMap = new HashMap<>();
                String serializedMetaMap = serialize(metaMap);
                boolean preloadFound = false;
                try {
                    Method m = clazz.getMethod("preload", HashMap.class);

                    //serialize the metadata
                    JsonNode data = stage.getMetadata();
                    metaMap = mapper.convertValue(data, HashMap.class);
                    
                    for(String k : metaMap.keySet()){
                        System.out.println("key: " + k + " value :" + metaMap.get(k));
                    }
                    
                    serializedMetaMap = serialize(metaMap);
                    preloadFound = true;
                } catch (IllegalArgumentException ex) {
                    System.out.println("Warning: No metadata found / Invalid metadata, skipping preloading!");
                    ex.printStackTrace();
                    preloadFound = false;

                } catch (Exception ex) {
                    System.out.println("Warning: No preload method found for the plugin, skipping preloading!");
                    ex.printStackTrace();
                    preloadFound = false;

                }

                
                stagesCode += fqcn + " tsp_" + stage.getId() + " = new  " + fqcn + "(sc); \n\n";
                if (preloadFound) {
                    stagesCode += "HashMap<String,Object> metaData = (HashMap<String,Object>)tsp_" + stage.getId() + ".deserialize(\"" + serializedMetaMap + "\");\n\n";
                    stagesCode += "tsp_" + stage.getId() + ".preload(metaData); \n\n";
                }
                stagesCode += "tsp_" + stage.getId() + ".start(); \n\n";

                
                

            } catch (Exception ex) {
                System.out.println("Error : Class not found!");
                ex.printStackTrace();
                return false;
            }

        }

        //for each stage, based on it's type, append to the eventual code string, the resulting code corresponding to this stage
        //once the final code string is ready, write it to file
        code += ""
                + "package com.sa.examples;\n"
                + "\n"
                + imports
                + "/**\n"
                + " *\n"
                + " * \n"
                + " */\n"
                + "public class " + filePath + " {\n"
                + "    \n"
                + "    public static void main(String args[]) {\n"
                + "        \n"
                + "        StreamAnalyzer sa = StreamAnalyzer.initialize();\n"
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

        FileOutputStream fos = new FileOutputStream(new File(filePath));
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
