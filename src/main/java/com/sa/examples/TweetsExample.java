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
package com.sa.examples;

import com.sa.components.base.TwitterStreamProvider;
import com.sa.core.StreamAnalyzer;
import java.util.concurrent.TimeUnit;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;

/**
 *
 * @author arunsharma
 */
public class TweetsExample {
    
    public static void main(String args[]) {
        
        StreamAnalyzer sa = StreamAnalyzer.initializeStandalone();
        JavaSparkContext sc = sa.getContext();
        
        TwitterStreamProvider tsp = new TwitterStreamProvider(sc);
        
        tsp.start();
        
        while(true) {
            try{
            TimeUnit.SECONDS.sleep(1);
            } catch(Exception ex) {
                
            }
            System.out.println("Go!");
//            for(JavaRDD<String> lp : tsp.poll()) {
//                System.out.println(lp.count());
//            }
        }
    }
    
}
