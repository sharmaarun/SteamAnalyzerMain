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
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var Commons = (function () {
    function Commons(http) {
        this.http = http;
        this.headers = new http_1.Headers({ "Content-Type": "application/json" });
        console.log(http);
        this.http = http;
    }
    Commons.escapeHtml = function (string) {
        var _this_ = this;
        return String(string).replace(/[&<>"'`=\/]/g, function (s) {
            return " ";
        });
    };
    Commons.getUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    //cookies
    Commons.getCookie = function (key) {
        var cookies = document.cookie.split(";");
        var obj = {};
        for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
            var c = cookies_1[_i];
            var k = c.split("=")[0] == undefined ? "" : c.split("=")[0].trim();
            var v = c.split("=")[1] == undefined ? "" : c.split("=")[1].trim();
            obj[k] = v;
        }
        console.log(obj);
        return obj[key];
    };
    Commons.setCookie = function (key, val) {
        document.cookie = key + "=" + val;
    };
    Commons.loaderShow = function () {
        console.log("in loaershow");
        var loader = document.getElementById("loaderComponent");
        loader.style.display = "block";
        var ldt = document.getElementById("loaderDoneText");
        ldt.style.display = "none";
        var li = document.getElementById("loaderIcon");
        li.style.display = "block";
    };
    Commons.loaderDone = function (msg) {
        clearTimeout(Commons.loaderTimer);
        var ldt = document.getElementById("loaderDoneText");
        ldt.style.display = "block";
        var li = document.getElementById("loaderIcon");
        li.style.display = "none";
        if (msg !== undefined && msg !== "") {
            alert(msg);
        }
        Commons.loaderTimer = setTimeout(function () {
            var loader = document.getElementById("loaderComponent");
            loader.style.display = "none";
            var ldt = document.getElementById("loaderDoneText");
            ldt.style.display = "none";
            var li = document.getElementById("loaderIcon");
            li.style.display = "none";
        }, 3000);
    };
    Commons.loaderError = function (output) {
        alert(output);
    };
    Commons.toast = function (options) {
        var o = {
            content: "Ola!",
            timeout: 2000
        };
        if (options != undefined && options != null && options != "") {
            o = options;
        }
        $.snackbar(o);
    };
    Commons.prototype.containsProperty = function (obj, prop) {
        var props = Object.keys(obj);
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var p = props_1[_i];
            if (p == prop) {
                return true;
            }
        }
    };
    Commons.extend = function (o1, o2) {
        var out = o1;
        var k2 = Object.keys(o2);
        for (var _i = 0, k2_1 = k2; _i < k2_1.length; _i++) {
            var kj = k2_1[_i];
            out[kj] = o2[kj];
        }
        return out;
    };
    Commons.clone = function (obj) {
        return $.extend(true, {}, obj);
    };
    Commons.getEnumFromString = function (enu, str) {
        if (enu.hasOwnProperty(str))
            return enu[str];
        else
            return 0;
    };
    Commons.prototype.getStatus = function (cb) {
        var _this_ = this;
        Commons.loaderShow();
        var action;
        _this_.http.get('/api/dash/services/status', this.headers).map(function (res) { return res.json(); }).subscribe(function (d) {
            Commons.loaderDone("");
            action = Commons.toast({ content: "Loaded Status.", timeout: 1000 });
            cb(d.payload);
        }, function (e) {
            Commons.loaderDone("");
            console.log("");
        }, function (s) {
            Commons.loaderDone("");
            console.log("Fetched Projects!");
        });
    };
    Commons.loaderTimer = -1;
    Commons.entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    Commons = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Commons);
    return Commons;
}());
exports.Commons = Commons;
var FilterProjectsPipe = (function () {
    function FilterProjectsPipe() {
    }
    FilterProjectsPipe.prototype.transform = function (items, args) {
        if (!items)
            return [];
        if (args == "" || args == undefined || args == null)
            return items;
        return items.filter(function (it) { if (args == "" || args == undefined || args == null) {
            return true;
        }
        else {
            return it.displayName == undefined ? false : it.displayName.indexOf(args) !== -1;
        } });
    };
    FilterProjectsPipe = __decorate([
        core_1.Pipe({
            name: 'filterProjects'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FilterProjectsPipe);
    return FilterProjectsPipe;
}());
exports.FilterProjectsPipe = FilterProjectsPipe;
var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (items, args) {
        if (!items)
            return [];
        return items.filter(function (it) { if (args == "" || args == undefined || args == null) {
            return true;
        }
        else {
            return it.indexOf(args) !== -1;
        } });
    };
    FilterPipe = __decorate([
        core_1.Pipe({
            name: 'filter'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FilterPipe);
    return FilterPipe;
}());
exports.FilterPipe = FilterPipe;
var FilterPluginsPipe = (function () {
    function FilterPluginsPipe() {
    }
    FilterPluginsPipe.prototype.transform = function (items, args) {
        if (!items)
            return [];
        if (args == "" || args == undefined || args == null)
            return items;
        return items.filter(function (it) { if (args == "" || args == undefined || args == null) {
            return true;
        }
        else {
            return it.name == undefined ? false : it.name.indexOf(args) !== -1;
        } });
    };
    FilterPluginsPipe = __decorate([
        core_1.Pipe({
            name: 'filterPlugins'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FilterPluginsPipe);
    return FilterPluginsPipe;
}());
exports.FilterPluginsPipe = FilterPluginsPipe;
var FilterPropsPipe = (function () {
    function FilterPropsPipe() {
    }
    FilterPropsPipe.prototype.transform = function (items, args) {
        var prop = args[0], val = args[1];
        if (prop == undefined)
            return [];
        if (!items)
            return [];
        return items.filter(function (it) { if (args == "" || args == undefined || args == null) {
            return true;
        }
        else {
            return it[prop].indexOf(val) !== -1;
        } });
    };
    FilterPropsPipe = __decorate([
        core_1.Pipe({
            name: 'filterProps'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FilterPropsPipe);
    return FilterPropsPipe;
}());
exports.FilterPropsPipe = FilterPropsPipe;
(function (STAGE_TYPES) {
    STAGE_TYPES[STAGE_TYPES["UNDEFINED_STAGE"] = 0] = "UNDEFINED_STAGE";
    STAGE_TYPES[STAGE_TYPES["STREAM_STAGE"] = 1] = "STREAM_STAGE";
    STAGE_TYPES[STAGE_TYPES["PROCESS_STAGE"] = 2] = "PROCESS_STAGE";
    STAGE_TYPES[STAGE_TYPES["DATABASE_STAGE"] = 3] = "DATABASE_STAGE";
    STAGE_TYPES[STAGE_TYPES["REPORT_STAGE"] = 4] = "REPORT_STAGE";
})(exports.STAGE_TYPES || (exports.STAGE_TYPES = {}));
var STAGE_TYPES = exports.STAGE_TYPES;
var mouseDown = false, mouseUp = true;
//initialize mouse capture
document.body.onmousedown = function () {
    mouseDown = true;
    mouseUp = false;
};
document.body.onmouseup = function () {
    mouseDown = false;
    mouseUp = true;
};
//mouse class
var MouseManager = (function () {
    function MouseManager() {
    }
    MouseManager.isMouseDown = function () {
        return mouseDown;
    };
    MouseManager.isMouseUp = function () {
        return mouseUp;
    };
    return MouseManager;
}());
exports.MouseManager = MouseManager;
//# sourceMappingURL=commons.component.js.map