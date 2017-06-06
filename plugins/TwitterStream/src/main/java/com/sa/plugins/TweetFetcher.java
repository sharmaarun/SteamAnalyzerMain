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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.api.java.function.VoidFunction;
import org.apache.spark.streaming.api.java.JavaDStream;
import twitter4j.Status;

/**
 * This class serves as base for doing all the spark related operations on RDDs.
 *
 * @author arunsharma
 */
public class TweetFetcher implements Serializable {

    public TweetFetcher() {

    }

    //fetch the data/tweets into string stream array
    public static JavaDStream<String> fetch(TwitterStreamProvider tsp, JavaDStream iStream, JavaDStream<String> output) {

        //setup the creds again for worker nodes
        String ck = (String) tsp.getProperties().get("consumer_key");
        String cs = (String) tsp.getProperties().get("consumer_secret");
        String at = (String) tsp.getProperties().get("access_token");
        String ats = (String) tsp.getProperties().get("access_token_secret");
        System.setProperty("twitter4j.oauth.consumerKey", ck);
        System.setProperty("twitter4j.oauth.consumerSecret", cs);
        System.setProperty("twitter4j.oauth.accessToken", at);
        System.setProperty("twitter4j.oauth.accessTokenSecret", ats);
        
        output = iStream.map(new Function<Status, String>() {
            public String call(Status status) {
                String id = status.getId()+"";
                String userName = status.getUser()==null?"":status.getUser().getName();
                String createdAt = status.getCreatedAt()==null?"":status.getCreatedAt().toString();
                String geoLocation = status.getGeoLocation()==null?"":status.getGeoLocation().toString();
                String text = status.getText()==null?"":status.getText();
                text = text.replaceAll("[\\\n\\\"\\\t\\\r]","");
                text = text.replaceAll("\\\\","");
                return "{\"id\":\""+id+"\","
                        + "\"text\":\""+text+"\","
                        + "\"createdAt\":\""+createdAt+"\","
                        + "\"geoLocation\":\""+geoLocation+"\"}"+"\","
                        + "\"userName\":\""+userName+"\"}";
            }
        });
        return output;
    }

}
