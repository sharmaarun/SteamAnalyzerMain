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
import java.util.Arrays;
import java.util.Iterator;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.streaming.api.java.JavaDStream;

/**
 * This class serves as base for doing all the spark related operations on RDDs.
 *
 * @author arunsharma
 */
public class WordsFetcher implements Serializable {

    public WordsFetcher() {

    }

    //fetch the data/tweets into string stream array
    public static JavaDStream<String> fetch(HostStreamProvider tsp, JavaDStream<String> iStream, JavaDStream<String> output) {

        
        output = iStream.flatMap(new FlatMapFunction<String, String>() {
            @Override
            public Iterator<String> call(String t) throws Exception {
                return Arrays.asList(t.split(" ")).iterator();
            }
        });
        return output;
        //save each bunch into the specified buffer
        //TODO: move to other function
//        statuses.foreachRDD(new VoidFunction<JavaRDD<String>>() {
//            String cpPath = tsp.getCheckpointPath();
//
//            @Override
//            public void call(JavaRDD<String> t1) {
//
//                try {
//                    t1.coalesce(1).saveAsTextFile(cpPath + "/rdd" + t1.id());
//                } catch (Exception ex) {
//                    ex.printStackTrace(System.out);
//                }
//                return;
//            }
//        });
    }

}
