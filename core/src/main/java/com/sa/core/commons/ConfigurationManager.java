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
package com.sa.core.commons;

import java.util.Properties;
import org.apache.spark.api.java.JavaSparkContext;

/**
 * Maintains/Manages the local configuration per application/job. [Singleton]
 * 
 * 
 * @author arunsharma
 */
public final class ConfigurationManager {
    
    private static ConfigurationManager instance;
    private JavaSparkContext sc;
    private String filePath = "";
    private Properties config;
    
    private ConfigurationManager(String _filePath) {
        
        filePath = _filePath;
        config = new Properties();
    }
    
    public static ConfigurationManager getInstance(JavaSparkContext _sc) {
        if(instance==null) {
            instance = new ConfigurationManager("./config");
            instance.sc = _sc;
        }
        return instance;
    }
}
