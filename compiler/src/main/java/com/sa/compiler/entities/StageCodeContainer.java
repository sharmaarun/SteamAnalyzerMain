/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.compiler.entities;

/**
 *
 * @author arunsharma
 */
public class StageCodeContainer implements Comparable<StageCodeContainer> {
    
    private int id;
    private String code;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
    
    
    
    @Override
    public int compareTo(StageCodeContainer o) {
        return id - o.id;
    }
    
}
