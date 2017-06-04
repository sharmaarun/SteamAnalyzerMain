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
import java.util.ArrayList;
import java.util.Map;

/**
 *
 * @author arunsharma
 */
//@JsonIgnoreProperties(ignoreUnknown = true)
public class Plugin {
    @JsonProperty(value = "name")
    protected String name;
    @JsonProperty(value = "_v")
    protected String _v;
    protected EntityTypeEnums type;
    @JsonProperty(value = "package")
    protected String pkg;
    protected String plugin;
    protected String fqcn;
    protected String jar;
    protected String description;
    @JsonProperty(value = "inputs", required = false)
    protected JsonNode inputs;
    @JsonProperty(value = "outputs", required = false)
    protected JsonNode outputs;
    protected JsonNode clientParams;
    protected JsonNode schema;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getV() {
        return _v;
    }

    public void setV(String _v) {
        this._v = _v;
    }

    public EntityTypeEnums getType() {
        return type;
    }

    public void setType(EntityTypeEnums type) {
        this.type = type;
    }

    public String getPlugin() {
        return plugin;
    }

    public void setPlugin(String plugin) {
        this.plugin = plugin;
    }

    public String getFqcn() {
        return fqcn;
    }

    public void setFqcn(String fqcn) {
        this.fqcn = fqcn;
    }

    public String getJar() {
        return jar;
    }

    public void setJar(String jar) {
        this.jar = jar;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public JsonNode getOutputs() {
        return outputs;
    }

    public void setOutputs(JsonNode outputs) {
        this.outputs = outputs;
    }

    public JsonNode getClientParams() {
        return clientParams;
    }

    public void setClientParams(JsonNode clientParams) {
        this.clientParams = clientParams;
    }

    public String getPkg() {
        return pkg;
    }

    public void setPkg(String pkg) {
        this.pkg = pkg;
    }

    public JsonNode getInputs() {
        return inputs;
    }

    public void setInputs(JsonNode inputs) {
        this.inputs = inputs;
    }

    public JsonNode getSchema() {
        return schema;
    }

    public void setSchema(JsonNode schema) {
        this.schema = schema;
    }

    
    
}
