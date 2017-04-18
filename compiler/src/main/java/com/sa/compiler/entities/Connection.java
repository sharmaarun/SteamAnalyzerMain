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
public class Connection{
    
    
    private int e;
    private int s;
    private String shole;
    private String ehole;
    public int getE() {
        return e;
    }

    public void setE(int e) {
        this.e = e;
    }

    public int getS() {
        return s;
    }

    public void setS(int s) {
        this.s = s;
    }

    public String getShole() {
        return shole;
    }

    public void setShole(String shole) {
        this.shole = shole;
    }

    public String getEhole() {
        return ehole;
    }

    public void setEhole(String ehole) {
        this.ehole = ehole;
    }
    
        
    
}
