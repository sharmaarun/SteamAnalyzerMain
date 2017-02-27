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
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.api.java.function.VoidFunction;
import org.apache.spark.streaming.api.java.JavaDStream;
import twitter4j.Status;

/**
 * This class serves as base for doing all the spark related operations on RDDs.
 * @author arunsharma
 */
public class TweetFetcher implements Serializable{
    
    public TweetFetcher() {
        
    }
    
    //fetch the data/tweets into string stream array
    public static void fetch(TwitterStreamProvider tsp, JavaDStream iStream, JavaRDD<String> output) {
        
        
        JavaDStream<String> statuses = iStream.map(new Function<Status, String>() {
            public String call(Status status) {
                return status.getText();
            }
        });
        
        
        //save each bunch into the specified buffer
        //TODO: move to other function
        
        statuses.foreachRDD(new VoidFunction<JavaRDD<String>>() {
            String cpPath = new String(tsp.getCheckpointPath());
            
            
            @Override
            public void call(JavaRDD<String> t1) {
//                System.out.println("=================================");
//                System.out.println("=================================");
//                System.out.println("RDD id: " + t1.id());
//                System.out.println("Count is " + t1.count());
//                System.out.println("=================================");
//                System.out.println("=================================");
//              
                System.out.println("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-");
                System.out.println(cpPath);
                
                t1.coalesce(1).saveAsTextFile(cpPath+"/rdd"+t1.id());
                return;
            }
        });
        
        
        
        
        
        
        
        
        
        
    }
    
}
