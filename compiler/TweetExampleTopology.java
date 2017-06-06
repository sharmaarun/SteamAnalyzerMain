package com.sa.examples;

import com.sa.components.base.TwitterStreamProvider;
import com.sa.core.StreamAnalyzer;
import java.util.concurrent.TimeUnit;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import java.util.HashMap;

/**
 *
 * 
 */
public class tweet-example-topo.jar {
    
    public static void main(String args[]) {
        
        StreamAnalyzer sa = StreamAnalyzer.initializeStandalone();
        JavaSparkContext sc = sa.getContext();
         com.sa.components.base.TwitterStreamProvider tsp_0 = new  com.sa.components.base.TwitterStreamProvider(sc); 

HashMap<String,Object> metaData = (HashMap<String,Object>)tsp_0.deserialize("rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAAEdAAMY29uc3VtZXJfa2V5dAAZeFNMNUZ0Tk5yWHFZdGowcXlMQkFvRUhKRnQADGFjY2Vzc190b2tlbnQAMjgxNDA5NDU3LXpTYm4zZWx4RnVCcmVnS2hqUVE0bDNxdU56TEV1YUE5S25LR2daMjNsdAAPY29uc3VtZXJfc2VjcmV0dAAyTWxBa0p4eUd4QWZKWjI4SFp4WHU4WFNXWnBWRzh6RGVwa1RZZGpxeW9BclBwZFJNMjJ0ABNhY2Nlc3NfdG9rZW5fc2VjcmV0dAAtaTdmcm1pMDNRT3JyMFhCWjJ0N2pPZ3NIZndDbXZHd0lWNmhrWFczNkV1RDQ5eA==");

tsp_0.preload(metaData); 

tsp_0.start(); 

 

        
        
    }
    
}
