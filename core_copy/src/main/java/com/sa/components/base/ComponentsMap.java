/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sa.components.base;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * Map of all the plugins/components <-> mapper files
 * @author arunsharma
 */
public class ComponentsMap {
    
    static ComponentsMap instance;
    static Map<InbuiltComponentsEnum,Properties> componentsMap ;

    private ComponentsMap() {
        componentsMap = new HashMap<>();
    }
    
    // Initialize the componets map
    // The map should contain the Plugin/Component as key and Mapper File Path as value
    private static void init() {
        //initialize inbuild plugins/components
        for(InbuiltComponentsEnum e : InbuiltComponentsEnum.values()) {
            componentsMap.put(e, ComponentMapperData.getMap(e));
        }
        //TODO: initialize plugins/components from components directory
    }
    
    // get ComponentsMa as singleton instance
    public static ComponentsMap getInstance() {
        if(instance == null) {
            instance = new ComponentsMap();
            init();
        }
        return instance;
    }

    public static Map<InbuiltComponentsEnum, Properties> getComponentsMap() {
        return componentsMap;
    }
    
    
    
}
