/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.compiler.entities;

import com.sa.compiler.commons.EntityTypeEnums;

/**
 *
 * @author arunsharma
 */
public abstract class Stage {
    
    protected EntityTypeEnums type;
    protected String fqcn;

    public EntityTypeEnums getType() {
        return type;
    }

    public void setType(EntityTypeEnums type) {
        this.type = type;
    }

    public String getFqcn() {
        return fqcn;
    }

    public void setFqcn(String fqcn) {
        this.fqcn = fqcn;
    }
    
    
    
}
