
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
public class TweetExampleTopology {
    
    public static void main(String args[]) {
        
        StreamAnalyzer sa = StreamAnalyzer.initializeStandalone();
        JavaSparkContext sc = sa.getContext();
         com.sa.components.base.TwitterStreamProvider tsp_0 = new  com.sa.components.base.TwitterStreamProvider(sc); 

HashMap<String,Object> metaData = (HashMap<String,Object>)tsp_0.deserialize("rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAALY3JlZGVudGlhbHNzcgAXamF2YS51dGlsLkxpbmtlZEhhc2hNYXA0wE5cEGzA+wIAAVoAC2FjY2Vzc09yZGVyeHEAfgAAP0AAAAAAAAx3CAAAABAAAAAEdAAMY29uc3VtZXJfa2V5dAAZeFNMNUZ0Tk5yWHFZdGowcXlMQkFvRUhKRnQAD2NvbnN1bWVyX3NlY3JldHQAMk1sQWtKeHlHeEFmSloyOEhaeFh1OFhTV1pwVkc4ekRlcGtUWWRqcXlvQXJQcGRSTTIydAAMYWNjZXNzX3Rva2VudAAyODE0MDk0NTctelNibjNlbHhGdUJyZWdLaGpRUTRsM3F1TnpMRXVhQTlLbktHZ1oyM2x0ABNhY2Nlc3NfdG9rZW5fc2VjcmV0dAAtaTdmcm1pMDNRT3JyMFhCWjJ0N2pPZ3NIZndDbXZHd0lWNmhrWFczNkV1RDQ5eAB4");

tsp_0.preload(metaData); 

tsp_0.start();

/*com.sa.components.base.TwitterStreamProvider tsp_1 = new  com.sa.components.base.TwitterStreamProvider(sc); 

HashMap<String,Object> metaData = (HashMap<String,Object>)tsp_1.deserialize("rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAALY3JlZGVudGlhbHNzcgAXamF2YS51dGlsLkxpbmtlZEhhc2hNYXA0wE5cEGzA+wIAAVoAC2FjY2Vzc09yZGVyeHEAfgAAP0AAAAAAAAx3CAAAABAAAAAEdAAMY29uc3VtZXJfa2V5dAAZeFNMNUZ0Tk5yWHFZdGowcXlMQkFvRUhKRnQAD2NvbnN1bWVyX3NlY3JldHQAMk1sQWtKeHlHeEFmSloyOEhaeFh1OFhTV1pwVkc4ekRlcGtUWWRqcXlvQXJQcGRSTTIydAAMYWNjZXNzX3Rva2VudAAyODE0MDk0NTctelNibjNlbHhGdUJyZWdLaGpRUTRsM3F1TnpMRXVhQTlLbktHZ1oyM2x0ABNhY2Nlc3NfdG9rZW5fc2VjcmV0dAAtaTdmcm1pMDNRT3JyMFhCWjJ0N2pPZ3NIZndDbXZHd0lWNmhrWFczNkV1RDQ5eAB4");

tsp_1.preload(metaData); 

tsp_1.start() 

 */

        
        
    }
    
}
