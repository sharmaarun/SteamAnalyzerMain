/**
 * The MIT License (MIT)
 * Copyright (c) 2016 SciNet[THS Team] @ UPRM
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */
package com.sa.core;

import com.sa.core.commons.ConfigurationManager;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.apache.log4j.Logger;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;

/**
 * Main initialization class for configuring and making the lib ready for use
 *
 * @author arunsharma
 */
public class StreamAnalyzer {

    private final static Logger logger = Logger.getLogger(StreamAnalyzer.class);
    private static StreamAnalyzer instance;
    private static JavaSparkContext context;
    private static ConfigurationManager config;
    private static Map<String, String> arguments;

    //job argument defaults
    private static String applicationId;
    private static String applicationName;
    private static String applicationPath;
    private static String sparkMasterURL;
    private static String hdfsMaster;
    private static String driverId;

    public StreamAnalyzer(JavaSparkContext _sc) {
        context = _sc;
        instance = this;
        init();
    }

    /**
     * Initializes the Stream Analyzation Engine as a Singleton
     *
     * @return
     */
    public static StreamAnalyzer initialize(String[] args) {
        if (instance == null) {
            if (context == null) {
                try {
                    initializeArguments(args);
                    //check all arguments to the program and config accordingly
                    SparkConf conf = new SparkConf();
                    conf.setAppName(applicationName)
                            .setMaster(sparkMasterURL).set("spark.scheduler.mode", "FAIR");
                    context = new JavaSparkContext(sparkMasterURL, applicationName);
                } catch (Exception ex) {
                    logger.error("Error while initializing spark context : ", ex);
                    return null;
                }
            }
            instance = new StreamAnalyzer(context);
            init();
        }
        return instance;
    }

    /**
     * initializes subcomponents of the engine
     */
    private static void init() {
        //local initialization
        config = ConfigurationManager.getInstance(context);

    }

    private static void initializeArguments(String[] args) {
        if (args.length <= 0) {
            return;
        }
        arguments = new HashMap<String, String>();
        for (String arg : args) {
            if (arg.startsWith("--variable:")) {
                try {
                    String k = arg.split("::")[1].split("=")[0];
                    String v = arg.split("::")[1].split("=")[1];
                    arguments.put(k, v);
                    System.setProperty(k, v);
                } catch (Exception ex) {
                    System.err.println("Invalid variable specified : " + arg);
                    ex.printStackTrace();
                }
            }
        }

        /*
        Enter default values for all the argument fields
         */
        applicationId = UUID.randomUUID().toString();
        applicationName = "Default" + applicationId;
        applicationPath = "/" + applicationName;
        sparkMasterURL = "localhost[*]";
        hdfsMaster = "hdfs:localhost:9000";

        /*
        Check for supplied arguments and fill arguments and system properties map acordingly
         */
        if (arguments.get("applicationId") != null) {
            applicationId = arguments.get("applicationId");
        }
        if (arguments.get("applicationName") != null) {
            applicationName = arguments.get("applicationName");
        }
        if (arguments.get("hdfsMaster") != null) {
            hdfsMaster = arguments.get("hdfsMaster");
        }
        if (arguments.get("sparkMasterURL") != null) {
            sparkMasterURL = arguments.get("sparkMasterURL");
        }
        if (arguments.get("applicationPath") != null) {
            applicationPath = arguments.get("applicationPath");
        }

    }

    private String getProperty(String key) {
        return arguments == null ? null : arguments.get(key);
    }

    public Map<String, String> getProperties() {
        return new HashMap<>(arguments);
    }

    public JavaSparkContext getContext() {
        return context;
    }

    public void setContext(JavaSparkContext context) {
        this.context = context;
    }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        StreamAnalyzer.applicationId = applicationId;
    }

    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        StreamAnalyzer.applicationName = applicationName;
    }

    public String getHdfsMaster() {
        return hdfsMaster;
    }

    public void setHdfsMaster(String hdfsMaster) {
        StreamAnalyzer.hdfsMaster = hdfsMaster;
    }

    public String getDriverId() {
        return driverId;
    }

    public void setDriverId(String driverId) {
        StreamAnalyzer.driverId = driverId;
    }

    public  String getApplicationPath() {
        return applicationPath;
    }

    public  void setApplicationPath(String applicationPath) {
        StreamAnalyzer.applicationPath = applicationPath;
    }

    public  String getSparkMasterURL() {
        return sparkMasterURL;
    }

    public  void setSparkMasterURL(String sparkMasterURL) {
        StreamAnalyzer.sparkMasterURL = sparkMasterURL;
    }
    
    

}
