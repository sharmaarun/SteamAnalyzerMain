/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.compiler.parser;

import com.fasterxml.jackson.databind.JsonNode;
import com.sa.compiler.entities.StreamStage;
import com.sa.components.base.ComponentsMap;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Method;

/**
 *
 * @author arunsharma
 */
public class ClassWriter {

    private ComponentsMap cMap;
    private String code;
    private String filePath;
    

    public ClassWriter(String classFilePath) {

        filePath = classFilePath;
        cMap = ComponentsMap.getInstance();
        code = "";

    }

    public boolean prepare(Parser parser) {

        //imports
        String imports = "import com.sa.components.base.TwitterStreamProvider;\n"
                + "import com.sa.core.StreamAnalyzer;\n"
                + "import java.util.concurrent.TimeUnit;\n"
                + "import org.apache.spark.api.java.JavaRDD;\n"
                + "import org.apache.spark.api.java.JavaSparkContext;\n"
                + "\n";

//Get all the stages and connections and set fully qualified class names
        String stagesCode = "";
        for (StreamStage stage : parser.getStreamStages()) {

            String fqcn = (String) cMap.getComponentsMap().get(stage.getPlugin()).get("fqcn");
            stage.setFqcn(fqcn);
            try {
                Class clazz = Class.forName(fqcn);
                for(Method m : clazz.getDeclaredMethods()) {
                    System.out.println(m.getName() + " <== " + m.getClass());
                }
                for(Method m : clazz.getMethods()) {
                    System.out.println(m.getName() + " <== " + m.getClass());
                }
                try {
                    Method m = clazz.getMethod("preload", JsonNode.class);
                    System.out.println(m.getName());
                    String resultCode = (String)m.invoke(null, (Object)stage.getMetadata());
                    stagesCode += resultCode+"\n\n";
                } catch (Exception ex) {
                    System.out.println("Warning: No preload method found for the plugin, skipping preloading!");
                    ex.printStackTrace();
                    
                }
                
                String initalizationCode = fqcn + " tsp_"+stage.getId() + " = new  " + fqcn + "(sc); \n\n";
                String startStageCode = "tsp_"+stage.getId()+".start() \n\n";
                
                stagesCode += initalizationCode;
                stagesCode += startStageCode;
                
                
                
            } catch (Exception ex) {
                System.out.println("Error : Class not found!");
                ex.printStackTrace();
                return false;
            }

        }

        //for each stage, based on it's type, append to the eventual code string, the resulting code corresponding to this stage
        //once the final code string is ready, write it to file
        code += "/**\n"
                + "package com.sa.examples;\n"
                + "\n"
                + imports
                + "/**\n"
                + " *\n"
                + " * @author arunsharma\n"
                + " */\n"
                + "public class " + filePath + " {\n"
                + "    \n"
                + "    public static void main(String args[]) {\n"
                + "        \n"
                + "        StreamAnalyzer sa = StreamAnalyzer.initializeStandalone();\n"
                + "        JavaSparkContext sc = sa.getContext();\n"
                + "         "+stagesCode+" \n\n"
                + "        \n"
                + "        \n"
                + "    }\n"
                + "    \n"
                + "}\n"
                + "";
        return true;
    }
    
    
    public void write() throws FileNotFoundException, IOException{
        
        FileOutputStream fos = new FileOutputStream(new File(filePath));
        fos.write(code.getBytes());
        fos.close();
    }

}
