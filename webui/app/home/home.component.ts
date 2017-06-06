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

import { Component, ViewChildren } from '@angular/core';
import {Commons, FilterPipe, FilterProjectsPipe} from './commons.component';
import {HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from "@angular/http";
@Component({
    templateUrl: 'app/home/home.component.html',
    providers: [HTTP_PROVIDERS, Commons],
    pipes: [FilterPipe, FilterProjectsPipe]
})

export class HomeComponent {

    loggedIn = false;
    user = { email: "arun.sharma@upr.edu", username: "arun", password: "arun" };
    fUser = {
        email: "",
        password: ""
    };

    headers = new Headers({ "Content-Type": "application/json" });

    title = "Stream Analyzer";
    reports = [];
    filterReports = "";
    stats = {
        spark: {
            status: false;
        },
        hadoop: {
            status: false;
        }
    };

    projectStatus = {};

    private flag = false;




    constructor(public http: Http, public commons: Commons) {
        var _this_ = this;
        if (Commons.getCookie("loggedin") == "true") {
            console.log(Commons.getCookie("loggedin"));
            console.log("Loggedin.");
            this.loggedIn = true;
        } 
        console.log(document.cookie);
        if (this.loggedIn) this.init();

        
    }

    public init() {
        var _this_ = this;
        //load status
        _this_.getStatus();

    }

    private getStatus() {
        var _this_ = this;
        _this_.commons.getStatus(function(data) { _this_.mapStats(data); });
        _this_.initReports();
    }

    public initReports() {
        Commons.loaderShow();
        this.reports = [];
        var action;
        this.http.get('/api/projects', this.headers).map(res => res.json()).subscribe(
            d => {
                Commons.loaderDone("");
                action = Commons.toast({ content: "Loaded Reports.", timeout: 1000 });
                for (var i = 0; i < d.length; i++) {
                    this.reports.push(d[i]);
                    this.getRunStatus(d[i].driverId);
                }
            }, e => {
                Commons.loaderDone("");
                console.log("");
            }, s => {
                Commons.loaderDone("");
                console.log("Fetched Projects!");
            }
        );
    }

    public login() {
        if (this.fUser.email != this.user.email || this.fUser.password != this.user.password) {
            Commons.toast({ content: "Invalid Username/Password!", timeout: 5000 });
            return;
        }
        this.loggedIn = true;
        Commons.setCookie("loggedin", "true");
        window.location.reload();
        return false;
    }


    public mapStats(data) {
        var _this_ = this;

        //check hadoop and spark status
        if (data != undefined) {
            _this_.stats.spark.status = data.services.spark.status;
            _this_.stats.hadoop.status = data.services.hadoop.status;
            console.log(data);
        }
    }

    public getProjectStatus(name, cb) {
        var _this_ = this;
        this.http.post('/api/projects/status', { name: name }, this.headers).map(response => response.json())
            .subscribe(p => {
                cb(p.data.running);
            }, e => {
                Commons.loaderDone(e);
            }, s => { console.log(s); });
    }

    public getRunStatus(name) {
        this.projectStatus[name] = false;
        var _this_ = this;
        this.getProjectStatus(name, function(running) {
            _this_.projectStatus[name] = running;
        });
    }



}