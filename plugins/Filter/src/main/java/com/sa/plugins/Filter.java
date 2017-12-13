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

import com.sa.core.IConnector;
import com.sa.core.ProcessStage;
import com.sa.core.StreamAnalyzer;
import java.util.HashMap;
import java.util.Map;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.streaming.api.java.JavaDStream;

/**
 * One of the base components used to provide social tweets stream.
 *
 * @author arunsharma
 */
public class Filter extends ProcessStage {

    private JavaDStream<String> input, output;

    public Filter(JavaSparkContext _sc, StreamAnalyzer sa) {
        super(_sc, sa);
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
        
        try {
            
            System.out.println("=================================================================");
            System.out.println("Setting up filter : " + getId());
            
        } catch (Exception ex) {
            System.out.println("Could not initialize plugin : ");
            ex.printStackTrace();
        }
    }

    
    /**
     * TODO: Remove it
     */
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
//        while (true) {

        try {

            output = FilterProcessor.process(properties, input, output);

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
