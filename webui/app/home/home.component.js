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
var commons_component_1 = require('./commons.component');
var http_1 = require("@angular/http");
var HomeComponent = (function () {
    function HomeComponent(http, commons) {
        this.http = http;
        this.commons = commons;
        this.loggedIn = false;
        this.user = { email: "arun.sharma@upr.edu", username: "arun", password: "arun" };
        this.fUser = {
            email: "",
            password: ""
        };
        this.headers = new http_1.Headers({ "Content-Type": "application/json" });
        this.title = "Stream Analyzer";
        this.reports = [];
        this.filterReports = "";
        this.stats = {
            spark: {
                status: false
            },
            hadoop: {
                status: false
            }
        };
        this.projectStatus = {};
        this.flag = false;
        var _this_ = this;
        if (commons_component_1.Commons.getCookie("loggedin") == "true") {
            console.log(commons_component_1.Commons.getCookie("loggedin"));
            console.log("Loggedin.");
            this.loggedIn = true;
        }
        console.log(document.cookie);
        if (this.loggedIn)
            this.init();
    }
    HomeComponent.prototype.init = function () {
        var _this_ = this;
        //load status
        _this_.getStatus();
    };
    HomeComponent.prototype.getStatus = function () {
        var _this_ = this;
        _this_.commons.getStatus(function (data) { _this_.mapStats(data); });
        _this_.initReports();
    };
    HomeComponent.prototype.initReports = function () {
        var _this = this;
        commons_component_1.Commons.loaderShow();
        this.reports = [];
        var action;
        this.http.get('/api/projects', this.headers).map(function (res) { return res.json(); }).subscribe(function (d) {
            commons_component_1.Commons.loaderDone("");
            action = commons_component_1.Commons.toast({ content: "Loaded Reports.", timeout: 1000 });
            for (var i = 0; i < d.length; i++) {
                _this.reports.push(d[i]);
                _this.getRunStatus(d[i].driverId);
            }
        }, function (e) {
            commons_component_1.Commons.loaderDone("");
            console.log("");
        }, function (s) {
            commons_component_1.Commons.loaderDone("");
            console.log("Fetched Projects!");
        });
    };
    HomeComponent.prototype.login = function () {
        if (this.fUser.email != this.user.email || this.fUser.password != this.user.password) {
            commons_component_1.Commons.toast({ content: "Invalid Username/Password!", timeout: 5000 });
            return;
        }
        this.loggedIn = true;
        commons_component_1.Commons.setCookie("loggedin", "true");
        window.location.reload();
        return false;
    };
    HomeComponent.prototype.mapStats = function (data) {
        var _this_ = this;
        //check hadoop and spark status
        if (data != undefined) {
            _this_.stats.spark.status = data.services.spark.status;
            _this_.stats.hadoop.status = data.services.hadoop.status;
            console.log(data);
        }
    };
    HomeComponent.prototype.getProjectStatus = function (name, cb) {
        var _this_ = this;
        this.http.post('/api/projects/status', { name: name }, this.headers).map(function (response) { return response.json(); })
            .subscribe(function (p) {
            cb(p.data.running);
        }, function (e) {
            commons_component_1.Commons.loaderDone(e);
        }, function (s) { console.log(s); });
    };
    HomeComponent.prototype.getRunStatus = function (name) {
        this.projectStatus[name] = false;
        var _this_ = this;
        this.getProjectStatus(name, function (running) {
            _this_.projectStatus[name] = running;
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/home/home.component.html',
            providers: [http_1.HTTP_PROVIDERS, commons_component_1.Commons],
            pipes: [commons_component_1.FilterPipe, commons_component_1.FilterProjectsPipe]
        }), 
        __metadata('design:paramtypes', [http_1.Http, commons_component_1.Commons])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map