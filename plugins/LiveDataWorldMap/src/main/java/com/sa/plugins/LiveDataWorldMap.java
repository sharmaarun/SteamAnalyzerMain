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

import com.sa.core.ReportStage;
import com.sa.core.StreamAnalyzer;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.streaming.api.java.JavaDStream;

/**
 * One of the base components used to provide social tweets stream.
 *
 * @author arunsharma
 */
public class LiveDataWorldMap extends ReportStage {

    private Map<String, String> fields;
    private JavaDStream<String> input, output; //TODO: make it more flexible

    public LiveDataWorldMap(JavaSparkContext _sc, StreamAnalyzer sa) {
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
    @Override
    public void preload() {
        
    }

    @Override
    public void fetch(JavaDStream input) {
        this.input = (JavaDStream<String>)input;
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

    /**
     * starts the stream of tweets
     */
    @Override
    public void start() {

        try {
            
                System.out.println("=================================================================");
                System.out.println("Settin up Report");
                Configuration conf = new Configuration();
                FileSystem fs = FileSystem.get(new URI(sa.getProperties().get("hdfsMaster")), conf);
                getSc().getConf().registerKryoClasses(new Class<?>[]{Class.forName("org.apache.hadoop.hdfs.DistributedFileSystem")});
                output = Executor.process(properties, fs, input, getCachePath());

            
        } catch (Exception ex) {
            ex.printStackTrace(System.out);
        }
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
