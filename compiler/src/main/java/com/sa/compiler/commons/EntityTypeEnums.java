/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.compiler.commons;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

/**
 * All the entity types should be registered here first
 *
 * @author arunsharma
 */
public enum EntityTypeEnums {
    UNDEFINED_STAGE("UNDEFINED_STAGE"),
    STREAM_STAGE("STREAM_STAGE"),
    PROCESS_STAGE("PROCESS_STAGE"),
    DATABASE_STAGE("DATABASE_STAGE"),
    REPORT_STAGE("REPORT_STAGE");
    public final String val;

    static Map<String, EntityTypeEnums> map = new HashMap<>();

    static {
        map.put("0", UNDEFINED_STAGE);
        map.put("1", STREAM_STAGE);
        map.put("2", PROCESS_STAGE);
        map.put("3", DATABASE_STAGE);
        map.put("4", REPORT_STAGE);
    }

    private EntityTypeEnums(String val) {
        this.val = val;
    }
    public String getValue() {
        return val;
    }
//    @JsonValue
//    public String toValue() {
//        for (Entry<String, EntityTypeEnums> entry : map.entrySet()) {
//            if (entry.getValue() == this) {
//                return entry.getKey();
//            }
//        }
//
//        return null; // or fail
//    }
//
//    @JsonCreator
//    public EntityTypeEnums fromValue(String val) {
//        if (val != null) {
//            for (Entry<String, EntityTypeEnums> entry : map.entrySet()) {
//                if (entry.getKey() == val || entry.getValue().toString().equalsIgnoreCase(val)) {
//                    return entry.getValue();
//                }
//            }
//
//            return EntityTypeEnums.UNDEFINED_STAGE;
//        }
//
//        return EntityTypeEnums.UNDEFINED_STAGE;
//    }
}
