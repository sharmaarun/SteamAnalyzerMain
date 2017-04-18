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
import com.sa.core.IConnector;
import com.sa.core.StreamAnalyzer;
import com.sa.core.StreamBase;
import com.sa.core.commons.dto.RDDDTO;
import java.beans.Transient;
import java.io.Serializable;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import javafx.util.Duration;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.spark.Accumulator;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.api.java.function.MapFunction;
import org.apache.spark.api.java.function.VoidFunction;
import org.apache.spark.streaming.Seconds;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.twitter.*;
import twitter4j.Status;

/**
 * One of the base components used to provide social tweets stream.
 *
 * @author arunsharma
 */
public class Filter extends StreamBase implements IConnector {

    private Map<String, String> fields;
    JavaDStream<Status> stream;
    private JavaDStream<String> input, output;

    public Filter(JavaSparkContext _sc, StreamAnalyzer sa) {
        super(_sc, sa);
        sc = _sc;
        this.sa = sa;
    }

    /**
     * This method helps the plugin/component to operate on meta-data and do
     * initialization before class instantiation.
     *
     * This method should return a string the represents the initialization
     * code. For this plugin, we need to initialize the credential info. Hence
     * we create a code-string that doesn't depend on variables but hard coded
     * string values instead.
     *
     * @param metadata
     */
    public void preload(HashMap<String, Object> metadata) {
        fields = new HashMap<>();
        try {
            String items = (String) metadata.get("items");
//            System.setProperty("safilter.items", items);
            fields.put("items", items);

        } catch (Exception ex) {
            System.out.println("Could not initialize plugin : ");
            ex.printStackTrace();
        }
    }

    @Override
    public void setInputStreamPath(String path) {
        this.inputStreamPath = path;
    }

    /**
     * TODO: Remove it
     */
    @Override
    public void fetch() {

    }

    /**
     * used by other stages to poll data from the temporary memory. i.e. the
     * bunch of tweets received in last iteration.
     *
     * @return
     */
    @Override
    public JavaDStream<String> poll() {

        return output;
    }

    @Override
    public String getCheckpointPath() {
        if (sa.getProperties().get("hdfsMaster") != null) {
//            return sa.getProperties().get("hdfsMaster") + "/" + System.getProperty("reports.path") + "/" + getId() + "/";
            return sa.getProperties().get("hdfsMaster") + "/null/Filter" + getId() + "/";
        }
        return null;
    }

    /**
     * starts the stream of tweets
     */
    @Override
    public void start() {
//        while (true) {

        try {

            System.out.println("=================================================================");
            System.out.println("Setting up filter : " + getId());

            output = FilterProcessor.process(fields, input, output);

        } catch (Exception ex) {
            ex.printStackTrace(System.out);
        }
//            try{
//                Thread.sleep(1000);
//            } catch (Exception ex ){
//                ex.printStackTrace(System.out);
//            }

    }

    public StreamAnalyzer getSa() {
        return sa;
    }

    public Map<String, String> getFields() {
        return fields;
    }

    public JavaDStream<String> getInput() {
        return input;
    }

    public void setInput(JavaDStream<String> input) {
        this.input = input;
    }

    public JavaDStream<String> getOutput() {
        return output;
    }

    public void setOutput(JavaDStream<String> output) {
        this.output = output;
    }

}
