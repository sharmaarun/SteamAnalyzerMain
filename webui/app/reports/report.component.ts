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
import {BaseChartDirective} from 'ng2-charts/ng2-charts';
import {HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Commons} from '../home/commons.component';
import {ActivatedRoute} from '@angular/router';
@Component({
    templateUrl: 'app/reports/report.component.html'
     providers: [HTTP_PROVIDERS]
})

export class ReportPage {
    @ViewChildren(BaseChartDirective) charts: BaseChartDirective;
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.projectName = params['name']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });
    }
    ngOnDestroy() {
        clearInterval(this.intervalCounter);
    }

    public projectName = "";
    public chartsRef = {};
    public loadedCharts = false;
    headers = new Headers({ 'Content-Type': 'application/json' });

    public lineChartData: Array<any> = [
        { data: [0], label: '' }
    ];
    public lineChartLabels: Array<any> = [''];
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
        { // blue
            backgroundColor: 'rgba(0,0,255,0.2)',
            borderColor: 'rgba(0,0,255,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // red
            backgroundColor: 'rgba(255,0,0,0.2)',
            borderColor: 'rgba(255,0,0,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];

    public lineChartType = "line";
    public oldCount = [0];
    public lcc = [0];
    public runOnce = [true];
    public reportChartMap = {};
    intervalCounter = -1;
    public constructor(public http: Http, public route: ActivatedRoute) {
        var _this_ = this;
        if (this.projectName == undefined) {
            var uri = window.location.href.split["/"];
            this.projectName = uri[uri.length - 1];
        }
        //load the plugins
        setTimeout(function() {
            _this_.charts.forEach(function(cc) {
                _this_.chartsRef[cc.element.nativeElement.id] = cc;
            });
            _this_.loadedCharts = true;
            console.log(_this_.chartsRef);

        }, 500);
        this.intervalCounter = setInterval(function() {
            if (_this_.loadedCharts)
                _this_.updateFunction();

        }, 1000);

    }

    private getUpdates() {
        //fetch projects 
        var _this_ = this;
        console.log(_this_.projectName);
        this.http.post('/api/reports', { project: _this_.projectName }, this.headers).map(res => res.json()).subscribe(
            dd => {
                if (dd != undefined && dd.length > 0) {
                    //add one chartline per report

                    if (_this_.lineChartData.length != dd.length) {
                        //mismatch found add more lines

                        for (var ii = 0; ii < dd.length; ii++) {
                            if (ii > 0) _this_.lineChartData.push({ data: [0], label: '' });
                            var d = JSON.parse(dd[ii]);
                            _this_.reportChartMap[d.report] = ii;
                            _this_.runOnce[ii] = true;
                            _this_.oldCount[ii] = 0;
                        }

                    } else if(_this_.runOnce[0]){
                        var d = JSON.parse(dd[0]);
                        _this_.reportChartMap[d.report] = 0;
                        _this_.runOnce[0] = true;
                        _this_.oldCount[0] = 0;
                    }

                    for (var i = 0; i < dd.length; i++) {
                        console.log(dd[i]);
                        var d = JSON.parse(dd[i]);
                        console.log(d);
                        _this_.updateChartsData(_this_, d);

                    }
                }
            }, e => {
                console.log("Cound not fetch projects list!");
            }, s => {
                console.log("Fetched Projects!");
            }
        );
    }

    public updateChartsData(_this_, d) {
        var _this_ = _this_;
        var nc = 0;
        var i = _this_.reportChartMap[d.report];
        console.log("updating for : " + d.report + " [" + i + "]");
        console.log(_this_.runOnce[i] + " and " + _this_.oldCount[i]);
        if (_this_.runOnce[i]) {
            console.log("running Once");
            _this_.oldCount[i] = d.data.count;
            _this_.runOnce[i] = false;
        } else {
            console.log("again ...");
            if (_this_.oldCount[i] != d.data.count) {

                nc = d.data.count - _this_.oldCount[i];
            } else {
                nc = 0;

            }
        }
        console.log(nc);
        _this_.appendVal(_this_.lineChartData[i].data, nc);
        if (i == 0) _this_.appendVal(_this_.lineChartLabels, d.data.date);
        _this_.lineChartData[i].label = d.data.stream_label;
        _this_.oldCount[i] = d.data.count;
    }

    public updateFunction() {
        var _this_ = this;
        _this_.getUpdates();
        //_this_.appendRandom(_this_.lineChartData[0].data);
        _this_.chartsRef.lineChart.ngOnChanges({});

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

    private appendVal(arr, val) {
        //        var tmp = 0;
        //        console.log(arr.length);
        //        for (var i = 0; i < arr.length; i++) {
        //            tmp = arr[i];
        //            if (i < arr.length - 1) {
        //                arr[i] = arr[i + 1];
        //            }
        //        }
        //        arr[arr.length - 1] = val;
        arr.push(val);
    }



}