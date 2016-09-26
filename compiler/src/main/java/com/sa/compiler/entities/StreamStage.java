/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.compiler.entities;

import com.fasterxml.jackson.databind.JsonNode;
import com.sa.components.base.InbuiltComponentsEnum;

/**
 * StreamStage class that represents a stream plugin in use along with metadata
 * @author arunsharma
 */
public class StreamStage extends Stage{
    
    private int id;
    private JsonNode metadata;
    private InbuiltComponentsEnum plugin;
    private String fqcn;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public InbuiltComponentsEnum getPlugin() {
        return plugin;
    }

    public void setPlugin(InbuiltComponentsEnum plugin) {
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
    
    
    
    
    
}
