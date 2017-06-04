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

import com.sa.core.StreamAnalyzer;
import com.sa.core.StreamStage;
import java.util.HashMap;
import java.util.Map;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.streaming.Seconds;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.twitter.*;
import twitter4j.Status;

/**
 * One of the base components used to provide social tweets stream.
 *
 * @author arunsharma
 */
public class TwitterStreamProvider extends StreamStage {

    private Map<String, String> creds;
    JavaDStream<Status> stream;
    private JavaDStream<String> output; //TODO: make it more flexible
//    private StreamAnalyzer sa;

    public TwitterStreamProvider(JavaSparkContext _sc, StreamAnalyzer sa) {
        super(_sc, sa);
        sc = _sc;
        this.sa = sa;
        jsc = new JavaStreamingContext(sc, Seconds.apply(1));

        //initialize the input buffer. It serves as the temporary memory storage of incoming tweets.
        //TODO: make this persist into a file in hdfs
        System.out.println("Initialized Twitter Stream Provider : " + getId());
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

            String ck = properties.get("consumer_key");
            String cs = properties.get("consumer_secret");
            String at = properties.get("access_token");
            String ats = properties.get("access_token_secret");

            System.setProperty("twitter4j.oauth.consumerKey", ck);
            System.setProperty("twitter4j.oauth.consumerSecret", cs);
            System.setProperty("twitter4j.oauth.accessToken", at);
            System.setProperty("twitter4j.oauth.accessTokenSecret", ats);

            //create a twitter stream using spark streaing context
            stream = TwitterUtils.createStream(jsc);
        } catch (Exception ex) {
            System.out.println("Could not initialize plugin : ");
            ex.printStackTrace();
        }

    }

    /**
     * used by other stages to poll data from the temporary memory. i.e. the
     * bunch of tweets received in last iteration.
     *
     * @return
     */
    @Override
    public JavaDStream<String> poll() {

        return this.output;
    }

    /**
     * starts the stream of tweets
     */
    @Override
    public void start() {
        try {
            output = TweetFetcher.fetch(this, stream, output); //workaround to escape from serialization of the whole class.

        } catch (Exception ex) {
            ex.printStackTrace(System.out);
        }
    }

    public Map<String, String> getCreds() {
        return creds;
    }

    public void setCreds(Map<String, String> creds) {
        this.creds = creds;
    }

}
