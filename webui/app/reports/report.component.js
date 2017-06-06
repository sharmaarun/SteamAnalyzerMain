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
var router_1 = require('@angular/router');
var ReportPage = (function () {
    function ReportPage(http, route) {
        this.http = http;
        this.route = route;
        this.projectName = "";
        this.chartsRef = {};
        this.loadedCharts = false;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var _this_ = this;
        if (this.projectName == undefined) {
            var uri = window.location.href.split["/"];
            this.projectName = uri[uri.length - 1];
        }
    }
    ReportPage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.projectName = params['name']; // (+) converts string 'id' to a number
            // In a real app: dispatch action to load the details here.
        });
    };
    ReportPage.prototype.ngOnDestroy = function () {
    };
    ReportPage.prototype.getUpdates = function () {
        //fetch projects 
        var _this_ = this;
        console.log(_this_.projectName);
        this.http.post('/api/reports', { project: _this_.projectName }, this.headers).map(function (res) { return res.json(); }).subscribe(function (dd) {
            if (dd != undefined && dd.length > 0) {
            }
        }, function (e) {
            console.log("Cound not fetch projects list!");
        }, function (s) {
            console.log("Fetched Projects!");
        });
    };
    ReportPage.prototype.appendRandom = function (arr) {
        var tmp = 0;
        for (var i = 0; i < arr.length; i++) {
            tmp = arr[i];
            if (i < arr.length - 1) {
                arr[i] = arr[i + 1];
            }
        }
        arr[arr.length - 1] = Math.random() * 100;
    };
    ReportPage = __decorate([
        core_1.Component({
            templateUrl: 'app/reports/report.component.html',
            providers: [http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.ActivatedRoute])
    ], ReportPage);
    return ReportPage;
}());
exports.ReportPage = ReportPage;
//# sourceMappingURL=report.component.js.map