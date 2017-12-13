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

import com.fasterxml.jackson.core.io.JsonStringEncoder;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.api.java.function.Function2;
import org.apache.spark.api.java.function.PairFunction;
import org.apache.spark.api.java.function.VoidFunction;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaPairDStream;
import scala.Tuple2;
import twitter4j.JSONObject;

/**
 * This class serves as base for doing all the spark related operations on RDDs.
 *
 * @author arunsharma
 */
public class Executor implements Serializable {

    public Executor() {

    }

    //fetch the data/tweets into string stream array
    /**
     *
     * @param sc
     * @param inputStreamPath
     */
//    public static void process(JavaSparkContext sc, String inputStreamPath) {
    public static JavaDStream<String> process(Map<String, String> fields, FileSystem fs, JavaDStream<String> data, String outpath) throws IOException {

        String geolocation = fields.get("geolocation_field");
        String text = fields.get("text_field");
        String id = fields.get("id_field");

        data = data.map(new Function<String, String>() {
            @Override
            public String call(String t1) throws Exception {
                String out = "";
                JsonNode node = new ObjectMapper().readTree(t1);
                out = "{"
                        + "\"geolocation\":\"" + node.get(geolocation).asText().replaceAll("[\"]", "") + "\","
                        + "\"id\":\"" + (node.get(id) == null ? UUID.randomUUID().toString() : node.get(id).asText().replaceAll("[\"]", "")) + "\","
                        //                        + "\"country\":\"" + node.get(country) == null ? "" : (node.get(country)) + "\","
                        + "\"text\":\"" + new String(JsonStringEncoder.getInstance().quoteAsString(node.get(text).asText().replaceAll("[\"]", ""))) + "\""
                        + "}";
                System.out.println(out);
                return out;
            }
        });

        JavaDStream<String> d = data.reduce(new Function2<String, String, String>() {
            @Override
            public String call(String t1, String t2) throws Exception {
                String tmp = (t2 == null || t2.length() < 1) ? "" : (t2 + ",");
                t1 = t1 + tmp;
                return t1;
            }
        });

        d.foreachRDD(new VoidFunction<JavaRDD<String>>() {
            @Override
            public void call(JavaRDD<String> t) throws Exception {
                try {
                    String data = "";
                    try {
                        List<String> raw = t.collect();
                        for (String r : raw) {
                            data += r;
                        }
                    } catch (Exception ex) {
                        ex.printStackTrace(System.out);
                    }

                    data = data.replace("}{", "},{");
                    data = data.replace("},,{", "},{");
                    int li = data.lastIndexOf("}");
                    data = data.substring(0, li > -1 ? li : 0);
                    data += data.length() > 0 ? "}" : "";
//                data = 

                    String dataarr = "[" + data + "]";
                    try {

                        List<JsonNode> dnodes = new ObjectMapper().readValue(dataarr, new TypeReference<List<JsonNode>>() {
                        });

                    } catch (Exception ex) {
                        ex.printStackTrace(System.out);
                    }

                    if (!data.equalsIgnoreCase("")) {
                        FSDataOutputStream fos2 = fs.create(new Path(outpath + "/rdd" + t.id() + ".json"));
                        fos2.writeBytes(dataarr);
                        fos2.close();
                    }
                } catch (Exception ex) {
                    ex.printStackTrace(System.out);
                }
            }
        });

        return data;

    }

}
