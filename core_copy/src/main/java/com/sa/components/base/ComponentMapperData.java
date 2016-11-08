/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.components.base;

import java.util.Properties;

/**
 * should contain 
 * @author arunsharma
 */
public class ComponentMapperData {
    
    public static Properties getMap(InbuiltComponentsEnum component) {
        Properties props = new Properties();
        switch(component) {
            case TWITTER_STREAM_PLUGIN :
            {
                props.put("fqcn", "com.sa.components.base.TwitterStreamProvider");
                break;
            }
        }
        
        return props;
    }
    
}
