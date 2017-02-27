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

    public projectName = "";
    public chartsRef={};
    public loadedCharts = false;
    headers = new Headers({ 'Content-Type': 'application/json' });

    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Main Project' }
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
    
    public lineChartType = "line"

    public constructor(public http: Http, public route: ActivatedRoute) {
        var _this_ = this;
        //load the plugins
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

        }, 1000);

    }

    private getUpdates() {
        //fetch projects 
        this.http.get('/api/reports', this.headers).map(res => res.json()).subscribe(
            d => {
                console.log(this.plugins);
                this.plugins = d;
                console.log(this.plugins);
            }, e => {
                console.log("Cound not fetch projects list!");
            }, s => {
                console.log("Fetched Projects!");
            }
        );
    }

    public updateFunction() {
        var _this_ = this;
        _this_.appendRandom(_this_.lineChartData[0].data);
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



}