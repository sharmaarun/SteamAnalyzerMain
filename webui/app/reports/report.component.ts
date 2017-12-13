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


import {Component, ViewChildren} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import {HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Commons} from '../home/commons.component';
import {ActivatedRoute} from '@angular/router';
@Component({
    templateUrl: 'app/reports/report.component.html'
     providers: [HTTP_PROVIDERS]
})

export class ReportPage {
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.projectName = params['name']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });
    }
    ngOnDestroy() {
    }

    public projectName = "";
    public projectJson = {};
    public chartsRef = {};
    public loadedCharts = false;
    headers = new Headers({ 'Content-Type': 'application/json' });

    public constructor(public http: Http, public route: ActivatedRoute, public sanitizer: DomSanitizationService) {
        var _this_ = this;
        if (this.projectName == undefined) {
            var uri = window.location.href.split["/"];
            this.projectName = uri[uri.length - 1];

        }
        setTimeout(function() {
            _this_.getProjectJson();
        }, 1000);
        
        

    }
    public loadUrl(uri) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(uri+"&rand=" + Math.round(Math.random() * 10000000);
    }

    private getProjectJson() {
        //fetch projects 
        var _this_ = this;
        console.log(_this_.projectName);
        this.http.post('/api/projects/json', { name: _this_.projectName }, this.headers).map(res => res.json()).subscribe(
            dd => {
                //add one chartline per report
                _this_.projectJson = dd;
                console.log(_this_.projectJson);
            }, e => {
                console.log("Cound not fetch projects list!");
            }, s => {
                console.log("Fetched Projects!");
            }
        );
    }

    private getUpdates() {
        //fetch projects 
        var _this_ = this;
        console.log(_this_.projectName);
        this.http.post('/api/reports', { project: _this_.projectName }, this.headers).map(res => res.json()).subscribe(
            dd => {
                if (dd != undefined && dd.length > 0) {
                    //add one chartline per report


                }
            }, e => {
                console.log("Cound not fetch projects list!");
            }, s => {
                console.log("Fetched Projects!");
            }
        );
    }


    private appendRandom(arr) {
        var tmp = 0;
        for (var i = 0; i < arr.length; i++) {
            tmp = arr[i];
            if (i < arr.length - 1) {
                arr[i] = arr[i + 1];
            }
        }
        arr[arr.length - 1] = Math.random() * 100;
    }

}