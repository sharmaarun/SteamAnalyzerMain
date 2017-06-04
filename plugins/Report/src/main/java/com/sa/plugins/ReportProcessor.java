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

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.Function2;
import org.apache.spark.api.java.function.PairFunction;
import org.apache.spark.api.java.function.VoidFunction;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaPairDStream;
import scala.Tuple2;

/**
 * This class serves as base for doing all the spark related operations on RDDs.
 *
 * @author arunsharma
 */
public class ReportProcessor implements Serializable {

    public ReportProcessor() {

    }

    //fetch the data/tweets into string stream array
    /**
     *
     * @param sc
     * @param inputStreamPath
     */
//    public static void process(JavaSparkContext sc, String inputStreamPath) {
    public static void process(Map<String, String> fields, FileSystem fs, JavaDStream<String> data, String outpath) throws IOException {

        String filePath = outpath + "/report.json";
        String x_label = fields.get("x_label");
        String y_label = fields.get("y_label");
        String stream_label = fields.get("stream_label");
        JavaDStream<Long> lc = data.count();
        
        lc.foreachRDD(new VoidFunction<JavaRDD<Long>>() {
            @Override
            public void call(JavaRDD<Long> t) throws Exception {

                long newCount = t.first();
                long lastCount=0;
                String lastDate = "";
                JsonNode node;

                if (fs.exists(new Path(filePath))) {
                    FSDataInputStream fis = fs.open(new Path(filePath));
                    BufferedReader br = new BufferedReader(new InputStreamReader(fis));
                    String line, d = "";
                    try {

                        line = br.readLine();
                        while (line != null) {
                            d += line;

                            line = br.readLine();
                        }
                    } finally {
                        br.close();
                    }
                    if (d != null && d != "" && d.length() > 0) {
                        node = new ObjectMapper().readTree(d);
                        lastCount = node.get("count").asLong();
                        lastDate = node.get("date").asText();
                    }
                }
                FSDataOutputStream fos = fs.create(new Path(filePath));
                ObjectNode n = JsonNodeFactory.instance.objectNode();
                n.put("x_label", x_label);
                n.put("y_label", y_label);
                n.put("stream_label", stream_label);
                n.put("count", lastCount+newCount);
                n.put("last_count", lastCount+newCount);
                n.put("date", new Date().toString());
                n.put("lastDate", lastDate);
                System.out.println(n.toString());
                fos.writeBytes(n.toString());
                fos.close();
            }
        });

    }

}
