/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.compiler.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.sa.compiler.commons.EntityTypeEnums;

/**
 *
 * @author arunsharma
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Stage {

    protected int id;
    protected EntityTypeEnums type;
    protected Plugin plugin;
    protected int x,y;
    protected String name;
    @JsonProperty(value = "inputs")
    protected JsonNode inputs;
    protected JsonNode outputs;
    protected JsonNode pathsIn;
    protected JsonNode pathsOut;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public EntityTypeEnums getType() {
        return type;
    }

    public void setType(EntityTypeEnums type) {
        this.type = type;
    }

    public Plugin getPlugin() {
        return plugin;
    }

    public void setPlugin(Plugin plugin) {
        this.plugin = plugin;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public JsonNode getInputs() {
        return inputs;
    }

    public void setInputs(JsonNode inputs) {
        this.inputs = inputs;
    }

    public JsonNode getOutputs() {
        return outputs;
    }

    public void setOutputs(JsonNode outputs) {
        this.outputs = outputs;
    }

    public JsonNode getPathsIn() {
        return pathsIn;
    }

    public void setPathsIn(JsonNode pathsIn) {
        this.pathsIn = pathsIn;
    }

    public JsonNode getPathsOut() {
        return pathsOut;
    }

    public void setPathsOut(JsonNode pathsOut) {
        this.pathsOut = pathsOut;
    }

    

}
