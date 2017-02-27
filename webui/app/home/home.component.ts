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
import {BaseChartDirective} from 'ng2-charts/ng2-charts';
import {Commons, FilterPipe} from './commons.component';
import {HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from "@angular/http";
@Component({
    templateUrl: 'app/home/home.component.html',
    providers: [HTTP_PROVIDERS],
    pipes: [FilterPipe]
})

export class HomeComponent {
    @ViewChildren(BaseChartDirective) charts: BaseChartDirective;
    
    loggedIn = false;
    user = {email: "arun.sharma@upr.edu",username:"arun",password:"arun"};
    fUser = {
        email : "",
        password: ""
    };
    
    headers = new Headers({"Content-Type":"application/json"});

    title = "Stream Analyzer";
    resourceChart = {};
    reports = [];
    filterReports=  "";
    loadedCharts = false;
    chartsRef = {};
    public doughnutChartLabels: string[] = ['RAM (%/100)', 'DISK I/O (%/100)', 'CPU (%/100)'];
    public doughnutChartData: number[] = [30, 50, 99];
    public doughnutChartType: string = 'doughnut';
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Project 1' },
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Project 2' }
    ];
    public lineChartLabels: Array<any> = ['1', '2', '3', '4', '5', '6', '7'];
    public lineChartOptions: any = {
        animation: false,
        responsive: true
    };
    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';
    public lineChartLabelUpdate = this.lineChartLabels[6];
    
    private flag = false;




    constructor(public http:Http) {
        if (document.cookie == "loggedin=true") {
            this.loggedIn = true;
        }

        if (this.loggedIn) this.init();

    }

    public updateFunction() {
        var _this_ = this;
        _this_.appendRandom(_this_.lineChartData[0].data);
        _this_.appendRandom(_this_.lineChartData[1].data);
        _this_.chartsRef.lineChart.ngOnChanges({});
        
    }

    private appendRandom(arr) {
        var tmp = 0;
        for (var i = 0; i < arr.length; i++) {
            tmp = arr[i];
            if (i < arr.length-1) {
                arr[i] = arr[i + 1];
            }
        }
        arr[arr.length-1] = Math.random()*100;
    }

    public init() {
        var _this_ = this;
        this.initCharts();
        this.initReports();
        setTimeout(function() {
            _this_.charts.forEach(function(cc) {
                _this_.chartsRef[cc.element.nativeElement.id] = cc;
            });
            _this_.loadedCharts = true;
            console.log(_this_.chartsRef);

        }, 500);
        setInterval(function() {
            if (_this_.loadedCharts)
                _this_.updateFunction();

        }, 2000);


    }

    private initCharts() {
        this.resourceChart.type = "doughnut";
        this.resourceChart.data = {
            labels: [
                "RAM (%/100)",
                "DISK (%/100)",
                "CPU (%/100)"
            ],
            datasets: [
                {
                    data: [30, 50, 99],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
        };
    }
    
    public initReports() {
        Commons.loaderShow();
        var action;
        this.http.get('/api/projects', this.headers).map(res => res.json()).subscribe(
            d => {
                Commons.loaderDone("");
                action =Commons.toast({ content: "Loaded Reports.", timeout:1000});
                for(var i=0;i<d.length;i++) {
                    this.reports.push(d[i]);
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
            Commons.toast({content:"Invalid Username/Password!",timeout:5000});
            return;
        }
        this.loggedIn = true;
        document.cookie = "loggedin=true";
        window.location.reload();
        return false;
    }
}