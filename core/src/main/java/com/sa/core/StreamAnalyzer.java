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
import java.util.UUID;
import org.apache.log4j.Logger;
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
    
    
    public StreamAnalyzer(JavaSparkContext _sc) {
        context = _sc;
        instance = this;
        init();
    }
    
    /**
     * Initializes the Stream Analyzation Engine as a Singleton
     * @return 
     */
    public static StreamAnalyzer initializeStandalone() {
        if (instance == null) {
            if (context == null) {
                try {
                    context = new JavaSparkContext("spark://192.168.64.128:8085", "DefaultApp" + UUID.randomUUID());
                } catch (Exception ex) {
                    logger.error("Error while initializing spark context : ",ex);
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

    public JavaSparkContext getContext() {
        return context;
    }

    public void setContext(JavaSparkContext context) {
        this.context = context;
    }

}
