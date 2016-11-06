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
var ListProjectsPage = (function () {
    function ListProjectsPage(http) {
        var _this = this;
        this.http = http;
        this.title = "List Projects";
        this.projects = [];
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        //fetch projects 
        http.get('/api/projects', this.headers).map(function (res) { return res.json(); }).subscribe(function (d) {
            console.log(_this.projects);
            _this.projects = d;
            console.log(_this.projects);
        }, function (e) {
            console.log("Cound not fetch projects list!");
        }, function (s) {
            console.log("Fetched Projects!");
        });
    }
    ListProjectsPage = __decorate([
        core_1.Component({
            templateUrl: 'app/project/list-projects.component.html',
            providers: [http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ListProjectsPage);
    return ListProjectsPage;
}());
exports.ListProjectsPage = ListProjectsPage;
//# sourceMappingURL=list-projects.component.js.map