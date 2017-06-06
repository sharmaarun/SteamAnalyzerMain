/* 
 * Copyright 2016 arunsharma.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import { Inject, Injectable, Pipe, PipeTransform } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class Commons {
    
    headers = new Headers({"Content-Type":"application/json"});
    constructor(private http: Http) {
        console.log(http);
        this.http = http;
    }
    public static loaderTimer = -1;
    public static entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    public static escapeHtml(string) {
        var _this_ = this;
        return String(string).replace(/[&<>"'`=\/]/g, function(s) {
            return " ";
        });
    }

    public static getUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    
    //cookies
    public static getCookie(key) {
        var cookies = document.cookie.split(";");
        
        var obj = {};
        for(let c of cookies) {
            var k = c.split("=")[0]==undefined?"":c.split("=")[0].trim();
            var v = c.split("=")[1]==undefined?"":c.split("=")[1].trim();
            obj[k]=v;
        }
        console.log(obj);
        return obj[key];
    }
    
    public static setCookie(key,val) {
        document.cookie = key+"="+val;
    }

    public static loaderShow() {
        console.log("in loaershow");
        var loader = document.getElementById("loaderComponent");
        loader.style.display = "block";
        var ldt = document.getElementById("loaderDoneText");
        ldt.style.display = "none";
        var li = document.getElementById("loaderIcon");
        li.style.display = "block";
    }

    public static loaderDone(msg) {

        clearTimeout(Commons.loaderTimer);
        var ldt = document.getElementById("loaderDoneText");
        ldt.style.display = "block";
        var li = document.getElementById("loaderIcon");
        li.style.display = "none";
        if (msg !== undefined && msg !== "") {
            alert(msg);
        }
        Commons.loaderTimer = setTimeout(function() {
            var loader = document.getElementById("loaderComponent");
            loader.style.display = "none";
            var ldt = document.getElementById("loaderDoneText");
            ldt.style.display = "none";
            var li = document.getElementById("loaderIcon");
            li.style.display = "none";
        }, 3000);
    }


    public static loaderError(output) {
        alert(output);
    }

    public static toast(options) {
        var o = {
            content: "Ola!",
            timeout: 2000
        };
        if (options != undefined && options != null && options != "") {
            o = options;
        }

        $.snackbar(o);


    }

    public containsProperty(obj, prop) {
        var props = Object.keys(obj);
        for (let p of props) {
            if (p == prop) {
                return true;
            }
        }
    }

    public static extend(o1, o2) {
        var out = o1;
        var k2 = Object.keys(o2);

        for (let kj of k2) {
            out[kj] = o2[kj];
        }
        return out;
    }

    public static clone(obj) {
        return $.extend(true, {}, obj);
    }

    public static getEnumFromString(enu, str) {
        if (enu.hasOwnProperty(str)) return enu[str];
        else return 0;
    }
    
    public getStatus(cb) {
        var _this_ = this;
        Commons.loaderShow();
        var action;
        _this_.http.get('/api/dash/services/status', this.headers).map(res => res.json()).subscribe(
            d => {
                Commons.loaderDone("");
                action =Commons.toast({ content: "Loaded Status.", timeout:1000});
                cb(d.payload);
            }, e => {
                Commons.loaderDone("");
                console.log("");
            }, s => {
                Commons.loaderDone("");
                console.log("Fetched Projects!");
            }
        );
    }


}

@Pipe({
    name: 'filterProjects'
})
@Injectable()
export class FilterProjectsPipe implements PipeTransform {
    transform(items: any[], args?): any[] {
        if (!items) return [];
        if (args == "" || args == undefined || args == null) return items;
        return items.filter(it => { if (args == "" || args == undefined || args == null) { return true; } else { return it.displayName == undefined ? false : it.displayName.indexOf(args) !== -1 } });
    }
}


@Pipe({
    name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], args?): any[] {
        if (!items) return [];
        return items.filter(it => { if (args == "" || args == undefined || args == null) { return true; } else { return it.indexOf(args) !== -1 } });
    }
}

@Pipe({
    name: 'filterPlugins'
})
@Injectable()
export class FilterPluginsPipe implements PipeTransform {
    transform(items: any[], args?): any[] {
        if (!items) return [];
        if (args == "" || args == undefined || args == null) return items;
        return items.filter(it => { if (args == "" || args == undefined || args == null) { return true; } else { return it.name == undefined ? false : it.name.indexOf(args) !== -1 } });
    }
}

@Pipe({
    name: 'filterProps'
})
@Injectable()
export class FilterPropsPipe implements PipeTransform {
    transform(items: any[], args?): any[] {
        let [prop, val] = args;
        if (prop == undefined) return [];
        if (!items) return [];
        return items.filter(it => { if (args == "" || args == undefined || args == null) { return true; } else { return it[prop].indexOf(val) !== -1 } });
    }
}

export enum STAGE_TYPES {
    UNDEFINED_STAGE = 0,
    STREAM_STAGE,
    PROCESS_STAGE,
    DATABASE_STAGE,
    REPORT_STAGE
}



var mouseDown = false, mouseUp = true;
//initialize mouse capture
document.body.onmousedown = function() {
    mouseDown = true;
    mouseUp = false;
}
document.body.onmouseup = function() {
    mouseDown = false;
    mouseUp = true;
}
//mouse class

export class MouseManager {



    public static isMouseDown() {
        return mouseDown;
    }

    public static isMouseUp() {
        return mouseUp;
    }

}