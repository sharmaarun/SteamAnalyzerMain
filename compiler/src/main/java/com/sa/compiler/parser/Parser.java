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
import com.sa.compiler.entities.Connection;
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
    private List<Connection> connections;
    private ObjectMapper mapper;

    private boolean stagesParsed,connectionsParsed;

    public Parser() {
        mapper = new ObjectMapper();
        streamStages = new ArrayList<>();
        connections = new ArrayList<>();
    }

    private void parseStages(ArrayNode stages) {

        //JsonNode[] sub_stages = stages.
        try {
            for (JsonNode node : stages) {
                        StreamStage stage = mapper.treeToValue(node, StreamStage.class);
                        streamStages.add(stage);
            }
            stagesParsed = true;
        } catch (Exception ex) {
            System.out.println("Error: Could not parse stages!" + ex);
            ex.printStackTrace();
            stagesParsed = false;
            return;
        }
    }

    private void parseConnections(ArrayNode conns) {

        //JsonNode[] sub_stages = stages.
        try {
            for (JsonNode node : conns) {
                Connection c = mapper.treeToValue(node, Connection.class);
                connections.add(c);
            }
            connectionsParsed = true;
        } catch (Exception ex) {
            System.out.println("Error: Could not parse connections!" + ex);
            ex.printStackTrace();
            connectionsParsed = false;
            return;
        }
    }

    public boolean parse(String inputJSON) {
        try {
            JsonNode topology = mapper.readTree(inputJSON);
            ArrayNode stages = (ArrayNode) topology.get("stages");
            ArrayNode connects = (ArrayNode) topology.get("connections");
            //parse the stages
            parseStages(stages);
            //parse connections
            parseConnections(connects);

            return stagesParsed && connectionsParsed;

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

    public List<Connection> getConnections() {
        return connections;
    }

    public void setConnections(List<Connection> connections) {
        this.connections = connections;
    }
    
    

}
