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
package com.sa.plugins;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.UUID;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.streaming.api.java.JavaDStream;

/**
 * This class serves as base for doing all the spark related operations on RDDs.
 *
 * @author arunsharma
 */
public class WordsFetcher implements Serializable {

    public WordsFetcher() {

    }

    /**
     * 
     * @param tsp
     * @param iStream
     * @param output
     * @return 
     */
    public static JavaDStream<String> fetch(JavaDStream<String> iStream, JavaDStream<String> output) {

        
        output = iStream.map(new Function<String, String>() {
            @Override
            public String call(String t1) throws Exception {
                
                return "{\"id\":\""+UUID.randomUUID().toString()+"\",\"datetime\":\""+new Date()+"\",\"msg\":\""+t1.replaceAll("[^a-zA-Z0-9_\\s\\.,]", "")+"\"}";
            }
        });
        return output;
    }

}
