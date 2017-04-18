/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.compiler.cli;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sa.compiler.entities.StreamStage;
import com.sa.compiler.parser.ClassWriter;
import com.sa.compiler.parser.Parser;
import com.sa.pomeditor.PomEditor;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 *
 * @author arunsharma
 */
public class Compiler {

    private ObjectMapper mapper;

    public Compiler() {
        mapper = new ObjectMapper();
    }

    //compile text based class
    public boolean compile(Parser parser, String inputText) {
        //parse input JSON
        return parser.parse(inputText);

    }

    //compile file based class
    public void compile(String inputPath, String outputPath) {
        String jsonText = "";
        ClassWriter writer = new ClassWriter(inputPath);

        Parser parser = new Parser();
        try {
            int c;
            FileInputStream fis = new FileInputStream(new File(inputPath + "/topology.json"));
            while ((c = fis.read()) != -1) {
                jsonText += (char) c;
            }
        } catch (Exception ex) {
            System.out.println("Error : Invalid File");
            ex.printStackTrace();
            return;
        }

        System.out.println("Parsing topology json ...");
        if (compile(parser, jsonText)) {
            System.out.println("Done.");

            System.out.println("Preparing to write to file ...");
            if (writer.prepare(parser)) {
                System.out.println("Done.");
                try {
                    writer.write();

                    //after write compile the project
                    System.out.println("Running maven command to build the final project/topology...");
                    try {
                        System.out.println(buildMavenProject(inputPath));
                    } catch (Exception ex) {
                        System.out.println("Error occured while building project! See below error:");
                        ex.printStackTrace();
                    }
                } catch (Exception ex) {
                    System.out.println("Error: Could not write to file!");
                    ex.printStackTrace();
                }
            }
        }
    }

    public String buildMavenProject(String path) throws IOException, InterruptedException {
        Process p = Runtime.getRuntime().exec("mvn -e -f "+ path+"/pom.xml clean compile assembly:single");
        p.waitFor();
        BufferedReader reader
                = new BufferedReader(new InputStreamReader(p.getInputStream()));

        StringBuilder sb = new StringBuilder();
        String line = "";
        
        while ((line = reader.readLine()) != null) {
            sb.append(line + "\n");

        }
        return sb.toString();

    }
}