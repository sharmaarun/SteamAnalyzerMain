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
var commons_component_1 = require('../home/commons.component');
var ListPluginsPage = (function () {
    function ListPluginsPage(http) {
        //load the plugins
        this.http = http;
        this.title = "List Plugins";
        this.plugins = [];
        this.selectedPlugin = {};
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.refreshPluginsList();
    }
    ListPluginsPage.prototype.refreshPluginsList = function () {
        var _this = this;
        //fetch projects 
        this.http.get('/api/plugins', this.headers).map(function (res) { return res.json(); }).subscribe(function (d) {
            console.log(_this.plugins);
            _this.plugins = d;
            console.log(_this.plugins);
        }, function (e) {
            console.log("Cound not fetch projects list!");
        }, function (s) {
            console.log("Fetched Projects!");
        });
    };
    ListPluginsPage.prototype.showInfo = function (p) {
        this.selectedPlugin = p;
        $("#infoViewer").modal("show");
    };
    ListPluginsPage.prototype.remove = function (p) {
        var confirm = window.confirm("Continue with plugin removal?");
        if (!confirm)
            return;
        commons_component_1.Commons.loaderShow();
        var action;
        this.http.post('/api/plugins/remove', { plugin: p }, this.headers).map(function (res) { return res.json(); }).subscribe(function (d) {
            commons_component_1.Commons.loaderDone("");
            action = commons_component_1.Commons.toast({ content: "Removed Plugin " + p.name + " ..." });
        }, function (e) {
            action = commons_component_1.Commons.toast({ content: "Cound not remove plugin!", timeout: 3000 });
            commons_component_1.Commons.loaderDone("");
            console.log("");
        }, function (s) {
            action = commons_component_1.Commons.toast({ content: "Done.", timeout: 1000 });
            commons_component_1.Commons.loaderDone("");
            console.log("Fetched Projects!");
        });
    };
    ListPluginsPage = __decorate([
        core_1.Component({
            templateUrl: 'app/plugins/list-plugins.component.html',
            providers: [http_1.HTTP_PROVIDERS],
            pipes: [commons_component_1.FilterPropsPipe]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ListPluginsPage);
    return ListPluginsPage;
}());
exports.ListPluginsPage = ListPluginsPage;
//# sourceMappingURL=list-plugins.component.js.map