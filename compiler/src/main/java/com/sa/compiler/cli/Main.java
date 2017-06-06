/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.compiler.cli;

import com.sa.compiler.commons.CLICommandsEnum;

/**
 * Main entry point for this topology compiler
 *
 * @author arunsharma
 */
public class Main {

    private boolean verbose;

    public static void main(String args[]) {

        Main main = new Main();

        //check if no argument supplied
        if (args.length < 1) {
            System.out.println("Usage: compiler command <input_file> <output_path>");
            return;
        }

        //check for verbose flag
        for (String arg : args) {
            if (arg.equalsIgnoreCase("VERBOSE")) {
                main.verbose = true;
                
            }

            if (arg.startsWith("--variable:")) {
                String k = arg.split(":")[1].split("=")[0];
                String v = arg.split(":")[1].split("=")[1];
                System.setProperty(k, v);
            }
        }

        // found command(s)
        String inputFile = "", outputFile = "";
        //check if the first argument provided is correct and switch accordingly
        for (int j = 0; j < args.length; j++) {
            int i = j;
            String arg = args[i];
            if(arg.startsWith("--")) continue;
            if (!main.isValidCommand(arg)) {
                main.showUsageHelp();
                System.out.println("Invalid Command : " + arg);
                return;
            } else {
                switch (CLICommandsEnum.valueOf(arg)) {
                    // in case of compile command,
                    case COMPILE: {

                        //check if enough arguments supplied for this command?
                        try {
                            inputFile = args[i + 1];
                            if (main.isValidCommand(inputFile)) {
                                System.out.println("Error :Command can not be supplied as an input file!");
                                return;
                            }
                            j += 1;
                        } catch (ArrayIndexOutOfBoundsException ex) {
                            main.showUsageHelp();
                            System.out.println("Not enough arguments provided!");
                            return;
                        }

                        boolean outputProvided = false;
                        if (i + 2 >= args.length) {
                            main.printVerbose("Output file path not provided, using default [current directory path]!");
                        } else if (!main.isValidCommand(args[i + 2])) {
                            outputProvided = true;
                        } else {
                            main.printVerbose("Output file path not provided, using default [current directory path]!");
                        }

                        if (!outputProvided) {
                            if (!inputFile.substring(inputFile.lastIndexOf(".") < 0 ? 0 : inputFile.lastIndexOf("."), inputFile.length()).equalsIgnoreCase(".json")) {
                                System.out.println("Error: Only JSON format supported!");
                                return;
                            }
                            outputFile = inputFile.contains("/") ? inputFile.substring(inputFile.lastIndexOf("/") + 1, inputFile.lastIndexOf(".")) + ".jar" : inputFile.substring(0, inputFile.lastIndexOf(".")) + ".jar";
                        } else {
                            outputFile = args[i + 2];
                            j += 1;
                        }
                        main.printVerbose("Input file is : " + inputFile);
                        main.printVerbose("Output file is : " + outputFile);

                        //do the main compilation
                        Compiler compiler = new Compiler();
                        compiler.compile(inputFile, outputFile);

                        break;

                    }

                }
            }
        }

    }

    boolean isValidCommand(String command) {
        try {
            CLICommandsEnum.valueOf(command);
        } catch (IllegalArgumentException ex) {
            return false;
        }
        return true;
    }

    void showUsageHelp() {
        System.out.println("Usage: compiler command <input_file> <output_path>");
    }

    void printVerbose(String msg) {
        if (verbose) {
            System.out.println(msg);
        }
    }

}
