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
var ng2_charts_1 = require('ng2-charts/ng2-charts');
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
        this.lineChartData = [
            { data: [0], label: 'Main Project' }
        ];
        this.lineChartLabels = ['0'];
        this.lineChartOptions = {
            animation: false,
            responsive: true
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartType = "line";
        this.oldCount = 0;
        this.lcc = 0;
        this.runOnce = true;
        var _this_ = this;
        //load the plugins
        setTimeout(function () {
            _this_.charts.forEach(function (cc) {
                _this_.chartsRef[cc.element.nativeElement.id] = cc;
            });
            _this_.loadedCharts = true;
            console.log(_this_.chartsRef);
        }, 500);
        setInterval(function () {
            if (_this_.loadedCharts)
                _this_.updateFunction();
        }, 1000);
    }
    ReportPage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.projectName = params['name']; // (+) converts string 'id' to a number
            // In a real app: dispatch action to load the details here.
        });
    };
    ReportPage.prototype.getUpdates = function () {
        //fetch projects 
        var _this_ = this;
        var nc = 0;
        this.http.get('/api/reports', this.headers).map(function (res) { return res.json(); }).subscribe(function (d) {
            d = JSON.parse(d);
            console.log(d);
            if (_this_.runOnce) {
                _this_.oldCount = d.data.count;
                _this_.runOnce = false;
            }
            else {
                if (_this_.oldCount != d.data.count) {
                    nc = d.data.count - _this_.oldCount;
                }
                else {
                    nc = 0;
                }
            }
            _this_.appendVal(_this_.lineChartData[0].data, nc);
            _this_.appendVal(_this_.lineChartLabels, d.data.date);
            _this_.lineChartData[0].label = d.data.stream_label;
            console.log(_this_.lineChartData);
            _this_.oldCount = d.data.count;
            console.log("nc : " + nc + " lcc: " + _this_.lcc + "count : " + d.data.count);
        }, function (e) {
            console.log("Cound not fetch projects list!");
        }, function (s) {
            console.log("Fetched Projects!");
        });
    };
    ReportPage.prototype.updateFunction = function () {
        var _this_ = this;
        _this_.getUpdates();
        //_this_.appendRandom(_this_.lineChartData[0].data);
        _this_.chartsRef.lineChart.ngOnChanges({});
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
    ReportPage.prototype.appendVal = function (arr, val) {
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
    };
    __decorate([
        core_1.ViewChildren(ng2_charts_1.BaseChartDirective), 
        __metadata('design:type', ng2_charts_1.BaseChartDirective)
    ], ReportPage.prototype, "charts", void 0);
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