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
var Commons = (function () {
    function Commons() {
    }
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
    Commons.loaderTimer = -1;
    Commons = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
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
//# sourceMappingURL=commons.component.js.map