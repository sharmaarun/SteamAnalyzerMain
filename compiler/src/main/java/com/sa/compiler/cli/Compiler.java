/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.compiler.cli;

import com.sa.compiler.parser.ClassWriter;
import com.sa.compiler.parser.Parser;
import java.io.File;
import java.io.FileInputStream;

/**
 *
 * @author arunsharma
 */
public class Compiler {

    public Compiler() {

    }

    //compile text based class
    public boolean compile(Parser parser, String inputText) {
        //parse input JSON
        return parser.parse(inputText);

    }

    //compile file based class
    public void compile(String inputPath, String outputPath) {
        String jsonText = "";
        ClassWriter writer = new ClassWriter(outputPath);

        Parser parser = new Parser();
        try {
            int c;
            FileInputStream fis = new FileInputStream(new File(inputPath));
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
                } catch (Exception ex) {
                    System.out.println("Error: Could not write to file!");
                    ex.printStackTrace();
                }
            }
        }
    }

}
