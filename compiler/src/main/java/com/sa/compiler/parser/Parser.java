/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.compiler.parser;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.sa.compiler.commons.EntityTypeEnums;
import com.sa.compiler.entities.StreamStage;
import java.util.ArrayList;
import java.util.List;

/**
 * Parses input JSON topology into Topology Object
 *
 * @author arunsharma
 */
public class Parser {

    private List<StreamStage> streamStages;
    private ObjectMapper mapper;

    private boolean stagesParsed;

    public Parser() {
        mapper = new ObjectMapper();
        streamStages = new ArrayList<>();
    }

    private void parseStages(ArrayNode stages) {

        //JsonNode[] sub_stages = stages.
        try {
            for (JsonNode node : stages) {
                EntityTypeEnums ntype = EntityTypeEnums.valueOf(node.get("type").asText());
                switch (ntype) {
                    case STREAM_STAGE: {
                        StreamStage stage = mapper.treeToValue(node, StreamStage.class);
                        streamStages.add(stage);
                        continue;
                    }
                }
            }
            stagesParsed = true;
        } catch (Exception ex) {
            System.out.println("Error: Could not parse supplied JSON");
            ex.printStackTrace();
            stagesParsed = false;
            return;
        }
    }

    public boolean parse(String inputJSON) {
        try {
            JsonNode topology = mapper.readTree(inputJSON);
            ArrayNode stages = (ArrayNode)topology.get("stages");
            
            //parse the stages
            parseStages(stages);
            
            return stagesParsed?true:false;
            
        } catch (Exception ex) {
            System.out.println("Error: Could not parse supplied JSON");
            ex.printStackTrace();
            return false;
            
        }

    }

    public List<StreamStage> getStreamStages() {
        return streamStages;
    }

    public void setStreamStages(List<StreamStage> streamStages) {
        this.streamStages = streamStages;
    }
    
    

}
