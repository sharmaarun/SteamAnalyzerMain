/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.compiler.entities;

import com.fasterxml.jackson.databind.JsonNode;

/**
 * StreamStage class that represents a stream plugin in use along with metadata
 * @author arunsharma
 */
public class StreamStage extends Stage{
    
    private int id;
    private JsonNode metadata;
    private String plugin;
    private String fqcn;
    private JsonNode pos;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public String getPlugin() {
        return plugin;
    }

    public void setPlugin(String plugin) {
        this.plugin = plugin;
    }

    public JsonNode getMetadata() {
        return metadata;
    }

    public void setMetadata(JsonNode metadata) {
        this.metadata = metadata;
    }

    public String getFqcn() {
        return fqcn;
    }

    public void setFqcn(String fqcn) {
        this.fqcn = fqcn;
    }

    public JsonNode getPos() {
        return pos;
    }

    public void setPos(JsonNode pos) {
        this.pos = pos;
    }
    
    
    
    
    
}
