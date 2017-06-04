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
package com.sa.core;

import java.io.ByteArrayInputStream;
import java.io.ObjectInputStream;
import java.io.Serializable;
import java.util.Base64;
import java.util.HashMap;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.streaming.api.java.JavaStreamingContext;

/**
 * Base class for all the components/stages/plugins [names are interchangeable]
 *
 * @author arunsharma
 */
public abstract class BaseStage implements Serializable{
    public transient JavaSparkContext sc;
    public transient StreamAnalyzer sa;
    public transient JavaStreamingContext jsc;
    public String inputStreamPath;
    public HashMap<String,String> properties;
    private int id;
    private String name;
    public BaseStage(JavaSparkContext sc, StreamAnalyzer sa) {
        this.sc = sc;
        this.sa = sa;
        properties = new HashMap<>();
    }
    
    public BaseStage(JavaSparkContext sc, StreamAnalyzer sa, HashMap<String,Object> metadata) {
        this(sc,sa);
        //update properties
        this.updateProperties(metadata);
        this.name = properties.get("_stage_type_")==null?"UNDEFINED_STAGE":properties.get("_stage_type_");
        this.id = this.id==0?Integer.parseInt(properties.get("id")==null?"0":properties.get("id")):this.id;
    }
    
    /**
     * update base stage's properties map with the values provided
     * @param metadata 
     */
    public void updateProperties(HashMap<String,Object> metadata) {
        if(metadata!=null)
        for(String k: metadata.keySet()) {
            properties.put(k,metadata.get(k).toString());
        }
    }
    /**
     * Every stage has to implement this method.<br/><br/>
     * the stage will be fed with the metadata(a hashmap) coming from the UI. 
     * Use the data to preload your plugin/stage.
     */
    public abstract void preload();
    
    /**
     * Every stage has to implement this method.<br/><br/>
     * Implement this method and perform spark based actions
     */
    public abstract void start();
    
    /**
     * Returns the current job's path.
     * @return String - project/job path
     */
    public String getProjectPath(){
        return this.sa.getApplicationPath();
    }
    
    /**
     * Returns the path to directory where this plugin's runtime data is stored.<br/>
     * Each plugin is provided with a location in the memory space [HDFS, Alluxion etc].
     * @return String - location of the cache directory
     */
    public String getCachePath() {
        
        return getProjectPath()+"/"+name+"_"+id;
    }
    
    
    /**
     * Read the object from Base64 string.
     */
    public static Object deserialize(String s) {
        Object o = null;
        try {
            byte[] data = Base64.getDecoder().decode(s);
            ObjectInputStream ois = new ObjectInputStream(
                    new ByteArrayInputStream(data));
            o = ois.readObject();
            ois.close();
            
        } catch (Exception  ex) {
            System.err.println("Could not deserialize metadata! Fatal error");
            ex.printStackTrace();
        }
        return o;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public JavaSparkContext getSc() {
        return sc;
    }

    public void setSc(JavaSparkContext sc) {
        this.sc = sc;
    }

    public StreamAnalyzer getSa() {
        return sa;
    }

    public void setSa(StreamAnalyzer sa) {
        this.sa = sa;
    }

    public JavaStreamingContext getJsc() {
        return jsc;
    }

    public void setJsc(JavaStreamingContext jsc) {
        this.jsc = jsc;
    }

    public String getInputStreamPath() {
        return inputStreamPath;
    }

    public HashMap<String, String> getProperties() {
        return properties;
    }

    public void setProperties(HashMap<String, String> properties) {
        this.properties = properties;
    }
    
    
    
}
