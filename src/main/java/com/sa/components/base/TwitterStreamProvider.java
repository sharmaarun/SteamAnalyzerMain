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
package com.sa.components.base;

import com.sa.core.IConnector;
import com.sa.core.StreamBase;
import java.beans.Transient;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javafx.util.Duration;
import org.apache.spark.Accumulator;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.api.java.function.VoidFunction;
import org.apache.spark.streaming.Seconds;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.twitter.*;
import twitter4j.Status;

/**
 * One of the base components used to provide social tweets stream.
 * @author arunsharma
 */
public class TwitterStreamProvider extends StreamBase implements IConnector {

    private Map<String, String> creds;
    JavaDStream<Status> stream;
    private List<JavaRDD<String>> inputBuffer; //TODO: make it more flexible

    public TwitterStreamProvider(JavaSparkContext _sc) {
        sc = _sc;
        tsc = new JavaStreamingContext(sc, Seconds.apply(1));

        //set twitter auth creds
        System.setProperty("twitter4j.oauth.consumerKey", "xSL5FtNNrXqYtj0qyLBAoEHJF");
        System.setProperty("twitter4j.oauth.consumerSecret", "MlAkJxyGxAfJZ28HZxXu8XSWZpVG8zDepkTYdjqyoArPpdRM22");
        System.setProperty("twitter4j.oauth.accessToken", "81409457-zSbn3elxFuBregKhjQQ4l3quNzLEuaA9KnKGgZ23l");
        System.setProperty("twitter4j.oauth.accessTokenSecret", "i7frmi03QOrr0XBZ2t7jOgsHfwCmvGwIV6hkXW36EuD49");
        
        //create a twitter stream using spark streaing context
        stream = TwitterUtils.createStream(tsc);
        
        //initialize the input buffer. It serves as the temporary memory storage of incoming tweets.
        //TODO: make this persist into a file in hdfs
        inputBuffer = new ArrayList<JavaRDD<String>>();
    }

    /**
     * TODO: Remove it
     */
    @Override
    public void fetch() {
        
    }
   
    /**
     * used by other stages to poll data from the temporary memory. i.e. the bunch of tweets received in last iteration.
     * @return 
     */
    @Override
    public List<JavaRDD<String>> poll() {
        return inputBuffer;
    }
    
    /**
     * starts the stream of tweets
     */
    @Override
    public void start() {
        try {
            TweetFetcher.fetch(stream,inputBuffer); //workaround to escape from serialization of the whole class.
            tsc.start();
            tsc.awaitTermination();
        } catch (Exception ex) {
            System.out.println(ex);
        }
    }

    public Map<String, String> getCreds() {
        return creds;
    }

    public void setCreds(Map<String, String> creds) {
        this.creds = creds;
    }

}
