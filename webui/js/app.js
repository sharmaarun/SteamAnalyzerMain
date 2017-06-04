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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
        this.title = 'THS';
        this.loggedIn = false;
        if (requestedURL !== undefined && requestedURL !== "") {
            this.router.navigate([requestedURL]);
        }
        if (document.cookie.match("loggedin=true") != null) {
            this.loggedIn = true;
        }
    }
    AppComponent.prototype.logout = function () {
        document.cookie = "";
        window.location.reload();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app/app.component.html',
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map;
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
var platform_browser_1 = require('@angular/platform-browser');
var app_routing_1 = require('./app.routing');
var http_1 = require('@angular/http');
var ng2_charts_1 = require('ng2-charts/ng2-charts');
var app_component_1 = require('./app.component');
var home_component_1 = require('./home/home.component');
var create_project_component_1 = require('./project/create-project.component');
var list_projects_component_1 = require('./project/list-projects.component');
var list_plugins_component_1 = require('./plugins/list-plugins.component');
var report_component_1 = require('./reports/report.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_1.routing, http_1.HttpModule, ng2_charts_1.ChartsModule],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, create_project_component_1.CreateProjectPage, list_projects_component_1.ListProjectsPage, list_plugins_component_1.ListPluginsPage, report_component_1.ReportPage],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map;
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
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var create_project_component_1 = require('./project/create-project.component');
var list_projects_component_1 = require('./project/list-projects.component');
var password_reset_component_1 = require('./user/password-reset.component');
var register_page_component_1 = require('./user/register-page.component');
var list_plugins_component_1 = require('./plugins/list-plugins.component');
var report_component_1 = require('./reports/report.component');
var appRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    }, {
        path: 'editor',
        component: create_project_component_1.CreateProjectPage
    }, {
        path: 'editor/:name',
        component: create_project_component_1.CreateProjectPage
    }, {
        path: 'projects',
        component: list_projects_component_1.ListProjectsPage
    }, {
        path: 'resetpass',
        component: password_reset_component_1.PasswordResetPage
    }, {
        path: 'register',
        component: register_page_component_1.RegisterPage
    }, {
        path: 'plugins',
        component: list_plugins_component_1.ListPluginsPage
    }, {
        path: 'report/:name',
        component: report_component_1.ReportPage
    }, {
        path: '**',
        redirectTo: ''
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map;
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
var Commons = (function () {
    function Commons() {
    }
    Commons.getUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    Commons.loaderShow = function () {
        console.log("in loaershow");
        var loader = document.getElementById("loaderComponent");
        loader.style.display = "block";
        var ldt = document.getElementById("loaderDoneText");
        ldt.style.display = "none";
        var li = document.getElementById("loaderIcon");
        li.style.display = "block";
    };
    Commons.loaderDone = function (msg) {
        clearTimeout(Commons.loaderTimer);
        var ldt = document.getElementById("loaderDoneText");
        ldt.style.display = "block";
        var li = document.getElementById("loaderIcon");
        li.style.display = "none";
        if (msg !== undefined && msg !== "") {
            alert(msg);
        }
        Commons.loaderTimer = setTimeout(function () {
            var loader = document.getElementById("loaderComponent");
            loader.style.display = "none";
            var ldt = document.getElementById("loaderDoneText");
            ldt.style.display = "none";
            var li = document.getElementById("loaderIcon");
            li.style.display = "none";
        }, 3000);
    };
    Commons.loaderError = function (output) {
        alert(output);
    };
    Commons.toast = function (options) {
        var o = {
            content: "Ola!",
            timeout: 2000
        };
        if (options != undefined && options != null && options != "") {
            o = options;
        }
        $.snackbar(o);
    };
    Commons.prototype.containsProperty = function (obj, prop) {
        var props = Object.keys(obj);
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var p = props_1[_i];
            if (p == prop) {
                return true;
            }
        }
    };
    Commons.extend = function (o1, o2) {
        var out = o1;
        var k2 = Object.keys(o2);
        for (var _i = 0, k2_1 = k2; _i < k2_1.length; _i++) {
            var kj = k2_1[_i];
            out[kj] = o2[kj];
        }
        return out;
    };
    Commons.clone = function (obj) {
        return $.extend(true, {}, obj);
    };
    Commons.getEnumFromString = function (enu, str) {
        if (enu.hasOwnProperty(str))
            return enu[str];
        else
            return 0;
    };
    Commons.loaderTimer = -1;
    Commons = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Commons);
    return Commons;
}());
exports.Commons = Commons;
var FilterProjectsPipe = (function () {
    function FilterProjectsPipe() {
    }
    FilterProjectsPipe.prototype.transform = function (items, args) {
        if (!items)
            return [];
        if (args == "" || args == undefined || args == null)
            return items;
        return items.filter(function (it) { if (args == "" || args == undefined || args == null) {
            return true;
        }
        else {
            return it.displayName == undefined ? false : it.displayName.indexOf(args) !== -1;
        } });
    };
    FilterProjectsPipe = __decorate([
        core_1.Pipe({
            name: 'filterProjects'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FilterProjectsPipe);
    return FilterProjectsPipe;
}());
exports.FilterProjectsPipe = FilterProjectsPipe;
var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (items, args) {
        if (!items)
            return [];
        return items.filter(function (it) { if (args == "" || args == undefined || args == null) {
            return true;
        }
        else {
            return it.indexOf(args) !== -1;
        } });
    };
    FilterPipe = __decorate([
        core_1.Pipe({
            name: 'filter'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FilterPipe);
    return FilterPipe;
}());
exports.FilterPipe = FilterPipe;
var FilterPluginsPipe = (function () {
    function FilterPluginsPipe() {
    }
    FilterPluginsPipe.prototype.transform = function (items, args) {
        if (!items)
            return [];
        if (args == "" || args == undefined || args == null)
            return items;
        return items.filter(function (it) { if (args == "" || args == undefined || args == null) {
            return true;
        }
        else {
            return it.name == undefined ? false : it.name.indexOf(args) !== -1;
        } });
    };
    FilterPluginsPipe = __decorate([
        core_1.Pipe({
            name: 'filterPlugins'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FilterPluginsPipe);
    return FilterPluginsPipe;
}());
exports.FilterPluginsPipe = FilterPluginsPipe;
var FilterPropsPipe = (function () {
    function FilterPropsPipe() {
    }
    FilterPropsPipe.prototype.transform = function (items, args) {
        var prop = args[0], val = args[1];
        if (prop == undefined)
            return [];
        if (!items)
            return [];
        return items.filter(function (it) { if (args == "" || args == undefined || args == null) {
            return true;
        }
        else {
            return it[prop].indexOf(val) !== -1;
        } });
    };
    FilterPropsPipe = __decorate([
        core_1.Pipe({
            name: 'filterProps'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FilterPropsPipe);
    return FilterPropsPipe;
}());
exports.FilterPropsPipe = FilterPropsPipe;
(function (STAGE_TYPES) {
    STAGE_TYPES[STAGE_TYPES["UNDEFINED_STAGE"] = 0] = "UNDEFINED_STAGE";
    STAGE_TYPES[STAGE_TYPES["STREAM_STAGE"] = 1] = "STREAM_STAGE";
    STAGE_TYPES[STAGE_TYPES["PROCESS_STAGE"] = 2] = "PROCESS_STAGE";
    STAGE_TYPES[STAGE_TYPES["DATABASE_STAGE"] = 3] = "DATABASE_STAGE";
    STAGE_TYPES[STAGE_TYPES["REPORT_STAGE"] = 4] = "REPORT_STAGE";
})(exports.STAGE_TYPES || (exports.STAGE_TYPES = {}));
var STAGE_TYPES = exports.STAGE_TYPES;
var mouseDown = false, mouseUp = true;
//initialize mouse capture
document.body.onmousedown = function () {
    mouseDown = true;
    mouseUp = false;
};
document.body.onmouseup = function () {
    mouseDown = false;
    mouseUp = true;
};
//mouse class
var MouseManager = (function () {
    function MouseManager() {
    }
    MouseManager.isMouseDown = function () {
        return mouseDown;
    };
    MouseManager.isMouseUp = function () {
        return mouseUp;
    };
    return MouseManager;
}());
exports.MouseManager = MouseManager;
//# sourceMappingURL=commons.component.js.map;
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
var commons_component_1 = require('./commons.component');
var http_1 = require("@angular/http");
var HomeComponent = (function () {
    function HomeComponent(http) {
        this.http = http;
        this.loggedIn = false;
        this.user = { email: "arun.sharma@upr.edu", username: "arun", password: "arun" };
        this.fUser = {
            email: "",
            password: ""
        };
        this.headers = new http_1.Headers({ "Content-Type": "application/json" });
        this.title = "Stream Analyzer";
        this.resourceChart = {};
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
        this.loadedCharts = false;
        this.chartsRef = {};
        this.doughnutChartLabels = ['RAM (%/100)', 'DISK I/O (%/100)', 'CPU (%/100)'];
        this.doughnutChartData = [30, 50, 99];
        this.doughnutChartType = 'doughnut';
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Project 1' },
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Project 2' }
        ];
        this.lineChartLabels = ['1', '2', '3', '4', '5', '6', '7'];
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
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.lineChartLabelUpdate = this.lineChartLabels[6];
        this.flag = false;
        if (document.cookie.match("loggedin=true") != null) {
            console.log("Loggedin.");
            this.loggedIn = true;
        }
        console.log(document.cookie);
        if (this.loggedIn)
            this.init();
        //load status
        this.getStatus();
    }
    HomeComponent.prototype.updateFunction = function () {
        var _this_ = this;
        _this_.appendRandom(_this_.lineChartData[0].data);
        _this_.appendRandom(_this_.lineChartData[1].data);
        _this_.chartsRef.lineChart.ngOnChanges({});
    };
    HomeComponent.prototype.appendRandom = function (arr) {
        var tmp = 0;
        for (var i = 0; i < arr.length; i++) {
            tmp = arr[i];
            if (i < arr.length - 1) {
                arr[i] = arr[i + 1];
            }
        }
        arr[arr.length - 1] = Math.random() * 100;
    };
    HomeComponent.prototype.init = function () {
        var _this_ = this;
        //        this.initCharts();
        this.initReports();
        //        setTimeout(function() {
        //            _this_.charts.forEach(function(cc) {
        //                _this_.chartsRef[cc.element.nativeElement.id] = cc;
        //            });
        //            _this_.loadedCharts = true;
        //            console.log(_this_.chartsRef);
        //
        //        }, 500);
        //        setInterval(function() {
        //            if (_this_.loadedCharts)
        //                _this_.updateFunction();
        //
        //        }, 2000);
    };
    HomeComponent.prototype.initCharts = function () {
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
    };
    HomeComponent.prototype.initReports = function () {
        var _this = this;
        commons_component_1.Commons.loaderShow();
        var action;
        this.http.get('/api/projects', this.headers).map(function (res) { return res.json(); }).subscribe(function (d) {
            commons_component_1.Commons.loaderDone("");
            action = commons_component_1.Commons.toast({ content: "Loaded Reports.", timeout: 1000 });
            for (var i = 0; i < d.length; i++) {
                _this.reports.push(d[i]);
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
        document.cookie = "loggedin=true";
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
    HomeComponent.prototype.getStatus = function () {
        var _this_ = this;
        commons_component_1.Commons.loaderShow();
        var action;
        this.http.get('/api/dash/services/status', this.headers).map(function (res) { return res.json(); }).subscribe(function (d) {
            commons_component_1.Commons.loaderDone("");
            action = commons_component_1.Commons.toast({ content: "Loaded Status.", timeout: 1000 });
            _this_.mapStats(d.payload);
        }, function (e) {
            commons_component_1.Commons.loaderDone("");
            console.log("");
        }, function (s) {
            commons_component_1.Commons.loaderDone("");
            console.log("Fetched Projects!");
        });
    };
    __decorate([
        core_1.ViewChildren(ng2_charts_1.BaseChartDirective), 
        __metadata('design:type', ng2_charts_1.BaseChartDirective)
    ], HomeComponent.prototype, "charts", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/home/home.component.html',
            providers: [http_1.HTTP_PROVIDERS],
            pipes: [commons_component_1.FilterPipe, commons_component_1.FilterProjectsPipe]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map;
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
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_module_1 = require('./app.module');
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map;
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
/*
 * A common file to hold enums, constants etc
 */
(function (ComponentType) {
    ComponentType[ComponentType["PANEL"] = 1] = "PANEL";
    ComponentType[ComponentType["STREAMPOINT"] = 2] = "STREAMPOINT";
})(exports.ComponentType || (exports.ComponentType = {}));
var ComponentType = exports.ComponentType;
;
(function (ProcessType) {
    ProcessType[ProcessType["SEARCH"] = 1] = "SEARCH";
    ProcessType[ProcessType["SCRIPT"] = 2] = "SCRIPT";
})(exports.ProcessType || (exports.ProcessType = {}));
var ProcessType = exports.ProcessType;
//# sourceMappingURL=common.js.map;
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
/*
 * Parses the client end project diagrams into JSON format.This JSON
 * is later submitted to the backend compiler for compiling into a jar.
 */
var ClientParser = (function () {
    function ClientParser() {
    }
    return ClientParser;
}());
exports.ClientParser = ClientParser;
//# sourceMappingURL=parser.js.map;
"use strict";
var Process = (function () {
    function Process() {
        this._id = -1;
        this._name = "Untitled Process";
    }
    return Process;
}());
exports.Process = Process;
//# sourceMappingURL=process.js.map;
"use strict";
var common_1 = require('./common');
/*
 * Holds all the components of the project design [eg. panels, stream points etc]
 */
var Schema = (function () {
    function Schema() {
        this._schema = {
            stages: [],
            stream_points: [],
        };
        //initialize
        this._schema = {};
    }
    /*
     * Add objects to arrays [eg. _panel, _streampoints]
     */
    Schema.prototype.addObject = function (_o) {
        if (_o === undefined || _o._type === undefined) {
            return;
        }
        if (_o._type == common_1.ComponentType.PANEL) {
            this._schema.stages.push(_o);
        }
    };
    return Schema;
}());
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map;
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
var Stage = (function () {
    function Stage() {
    }
    return Stage;
}());
exports.Stage = Stage;
//# sourceMappingURL=stage.js.map;
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
//# sourceMappingURL=list-plugins.component.js.map;
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
var commons_component_1 = require('../home/commons.component');
var CreateProjectPage = (function () {
    function CreateProjectPage(_http, route) {
        this._http = _http;
        this.route = route;
        this.projectName = "";
        this.preloadProject = false;
        this.title = "Create Project";
        this._zoomLevel = 1;
        this.previousZoom = 1;
        //objects
        this.plugins = [];
        this.topology = { name: 'project-' + commons_component_1.Commons.getUUID(), displayName: "", stages: [], connections: [] };
        this.topologyCanvas = [];
        this.relevantNodeProps = [
            "id",
            "name",
            "plugin",
            "type",
            "x",
            "y"
        ];
        this.idCounter = 0;
        this.conIdCounter = 0;
        this.connections = [];
        this.suggestSchemaPropList = [];
        this.suggestSchemaArgs = [];
        //event flags
        this.dragMode = false;
        this.dragging = false;
        this.connectMode = false;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this._this_ = this;
        var _this_ = this;
        this.http = this._http;
        //start
        //1. load plugins
        this.loadPlugins();
        //setup topology
        setTimeout(function () {
            _this_.saSetup();
            CreateProjectPage.__LOAD_ONCE_EDITOR = false;
            $("#componentsBox .divider").mousedown(function (e) {
                _this_.startResize(e);
            });
            $("#componentsBox .divider").mouseup(function (e) {
                $("body").off('mousemove');
            });
        }, 1000);
    }
    CreateProjectPage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.projectName = params['name']; // (+) converts string 'id' to a number
            _this.preloadProject = true;
            // In a real app: dispatch action to load the details here.
        });
    };
    //load plugins
    CreateProjectPage.prototype.loadPlugins = function () {
        var _this_ = this;
        this._http.get('api/plugins', this.headers).map(function (response) { return response.json(); })
            .subscribe(function (p) { _this_.plugins = p; }, function (e) { console.log(e); }, function (s) { console.log(s); });
    };
    CreateProjectPage.prototype.saInit = function () {
    };
    CreateProjectPage.prototype.startResize = function (e) {
        //text selection fix
        if (document.selection) {
            document.selection.empty();
        }
        else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        $("body").mousemove(function (ev) {
            var l = parseInt($("body").width()) - ev.pageX - 3;
            $("#componentsBox").css("right", l + "px");
            var r = parseInt(ev.pageX + 3);
            $("#drawBox").css("left", r + "px");
        });
    };
    CreateProjectPage.prototype.showStage = function () {
        //        console.log(this.stage);
    };
    CreateProjectPage.prototype.saSetup = function () {
        //if (!CreateProjectPage.__LOAD_ONCE_EDITOR) return false;
        var w = $("#drawBox").width();
        var h = $("#drawBox").height();
        // adding new canvas node editor - linker js
        this.saLinker = $("#drawBox").linker();
        //load the project
        if (this.preloadProject) {
            this.reload();
        }
    };
    CreateProjectPage.prototype.suggestSchemaProps = function (val) {
        var _this_ = this;
        if (val == undefined)
            return;
        val = val.split(",")[val.split(",").length - 1].trim();
        var args = commons_component_1.Commons.clone(_this_.suggestSchemaPropList);
        var tmpArr = [];
        for (var _i = 0, _a = Object.keys(args); _i < _a.length; _i++) {
            var a = _a[_i];
            var arr = args[a].values == undefined ? [] : args[a].values;
            for (var _b = 0, arr_1 = arr; _b < arr_1.length; _b++) {
                var it_1 = arr_1[_b];
                if (it_1.indexOf(val) !== -1) {
                    tmpArr.push({ from: args[a].stage, value: it_1 });
                }
            }
        }
        _this_.suggestSchemaArgs = tmpArr;
    };
    CreateProjectPage.prototype.zoom = function (steps) {
        if (steps > 10)
            steps = 10;
        if (steps < -10)
            steps = -10;
        var czoom = parseFloat($('.linker_board').css("zoom"));
        $('.linker_board').animate({ zoom: czoom + steps / 100 }, 400);
        this.previousZoom = parseFloat($(".linker_board").css("zoom"));
    };
    CreateProjectPage.prototype.resetZoom = function () {
        if (parseFloat($(".linker_board").css("zoom")) != 1.0) {
            $(".linker_board").css("zoom", 1);
        }
    };
    CreateProjectPage.prototype.setZoom = function (val) {
        $(".linker_board").css("zoom", val);
    };
    /* methods related to canvas area*/
    //Adds plugin as component to the canvas area
    CreateProjectPage.prototype.addObject = function (plug) {
        var plugin = commons_component_1.Commons.clone(plug);
        //        console.log(plugin);
        //increment the id counter
        this.idCounter += 1;
        //1. create node object
        var n = this.addStage({ plugin: plugin, name: plugin.name, type: commons_component_1.Commons.getEnumFromString(commons_component_1.STAGE_TYPES, plugin.type), x: 150 });
        //2. add node object to topology
        //        this.addObjectToTopology(n);
    };
    CreateProjectPage.prototype.addStage = function (stage) {
        //1. create linkerjs node 
        var n = this.createNode(stage);
        this.addObjectToTopology(n);
        return n;
    };
    //create linkerjs node based on
    //options :
    //{type, x location, y location}
    CreateProjectPage.prototype.createNode = function (stage) {
        var _this_ = this;
        //        console.log("adding node");
        //        console.log(stage);
        var o = {
            id: this.idCounter,
            type: commons_component_1.STAGE_TYPES.UNDEFINED_STAGE,
            name: "UNDEFINED",
            x: $(".linker_container").scrollLeft() + parseInt(Math.random() * 100),
            y: $(".linker_container").scrollTop() + parseInt(Math.random() * 100)
        };
        var node = {};
        o = commons_component_1.Commons.extend(o, stage);
        //validate the params
        if (!this.validateNode(o)) {
            console.log("Validation failed for new node");
            return {};
        }
        //create node
        node = this.saLinker.node(o);
        //create connectors
        var connectorIn, connectorOut;
        //based on type, create the connectors
        for (var _i = 0, _a = o.plugin.inputs == undefined ? [] : o.plugin.inputs; _i < _a.length; _i++) {
            var pi = _a[_i];
            connectorIn = node.input(pi.id, pi.name);
        }
        for (var _b = 0, _c = o.plugin.outputs == undefined ? [] : o.plugin.outputs; _b < _c.length; _b++) {
            var po = _c[_b];
            connectorOut = node.output(po.id, po.name);
            connectorOut.beforeRemove = function (index) {
                //                console.log(this);
                _this_.updateConnections(this.node);
            };
            connectorOut.onConnect = function (input) {
                //                input.node.plugin.schema = Commons.clone(o.plugin.schema);
                //                console.log(input);
            };
        }
        //add the connections to connections array
        this.connections.push({
            id: node.id,
            in: connectorIn,
            out: connectorOut
        });
        //also push the schema to global schema properties suggetion list
        if (o.plugin.schema != undefined && o.plugin.schema.length > 0)
            _this_.suggestSchemaPropList.push({ stage: o.name, values: o.plugin.schema });
        //event handlers
        this.attachEvents(o, node);
        //        console.log(node);
        console.log("Created new node : " + o.name);
        return node;
    };
    CreateProjectPage.prototype.addObjectToTopology = function (obj) {
        var _this_ = this;
        _this_.topologyCanvas.push(obj);
        //        console.log(_this_.topologyCanvas);
    };
    CreateProjectPage.prototype.removeObjectFromTopology = function (obj) {
        var _this_ = this;
        for (var i = 0; i < _this_.topologyCanvas.length; i++) {
            var stage = _this_.topologyCanvas[i];
            if (stage.id == obj.id) {
                //                console.log(stage.id + " / " + obj.id);
                _this_.topologyCanvas.splice(i, 1);
                break;
            }
        }
    };
    CreateProjectPage.prototype.setSchema = function (node) {
        if (node == undefined)
            return;
    };
    /*
     * Updates the connection endpoints related to this node/obj
     */
    CreateProjectPage.prototype.updateConnections = function (s) {
        //find all the outgoing connections
        if (s.hasOwnProperty("pathsOut")) {
            var p = Object.keys(s.pathsOut)[0];
            if (s.pathsOut[p].length <= 0)
                return;
            for (var ii = 0; ii < s.pathsOut[p].length; ii++) {
                var to = {
                    id: s.pathsOut[p][ii][2]["id"],
                    name: s.pathsOut[p][ii][2]["name"],
                    node: {
                        id: s.pathsOut[p][ii][2]["node"]["id"],
                        name: s.pathsOut[p][ii][2]["node"]["name"],
                    }
                };
                //search for to-endpoint id in all stages
                var found = false;
                var n = {};
                //                console.log(to);
                if (to.node.id != undefined && to.node.id != "" && to.node.id != null) {
                    for (var _i = 0, _a = this.topologyCanvas; _i < _a.length; _i++) {
                        var ss = _a[_i];
                        if (ss.id == to.node.id) {
                            found = true;
                            n = ss;
                            break;
                        }
                    }
                    if (found) {
                        //                        console.log("found");
                        //                        console.log(ss);
                        //remove the schema
                        //                        ss.plugin.schema = [];
                        ss.pathsIn[Object.keys(ss.pathsIn)[0]] = [];
                    }
                }
                else {
                    console.log("no connection found!");
                }
            }
        }
    };
    /*
     * get type of stage from string
     */
    CreateProjectPage.prototype.getStageType = function (val) {
        if (val)
            ;
    };
    /*
     *Attach events to nodes
     *events: drag, remove and settings
     */
    CreateProjectPage.prototype.attachEvents = function (o, node) {
        var _this_ = this;
        //drag event
        node.onDrag = function (x, y) {
            this.x = x;
            this.y = y;
        };
        //settings event
        node.onSetting = function () {
            _this_.showProperties(this);
        };
        // remove event
        node.onRemove = function () {
            _this_.updateConnections(this);
            //            console.log(_this_.topologyCanvas);
            _this_.removeObjectFromTopology(this);
        };
    };
    CreateProjectPage.prototype.updateIdCounter = function () {
        this.idCounter += 1;
    };
    CreateProjectPage.prototype.validateNode = function (options) {
        var invalids = 0;
        //check for existing id
        if (options.id != undefined) {
            if (options.id < this.idCounter) {
                invalids += 1;
            }
        }
        return invalids > 0 ? false : true;
    };
    /*
     * Update/Edit properties of each stage
     *
     */
    CreateProjectPage.prototype.showProperties = function (node) {
        var _this_ = this;
        _this_.selectedNode = node;
        //        console.log(_this_.selectedNode);
        $("#propertiesEditor").modal("show");
        _this_.suggestSchemaArgs = [];
    };
    CreateProjectPage.prototype.stripUnwantedNodeProperties = function () {
        var stages = [];
        for (var _i = 0, _a = this.topologyCanvas; _i < _a.length; _i++) {
            var s = _a[_i];
            var ns = {
                pathsIn: {},
                pathsOut: {},
                inputs: [],
                outputs: []
            };
            for (var _b = 0, _c = this.relevantNodeProps; _b < _c.length; _b++) {
                var prop = _c[_b];
                ns[prop] = s[prop];
            }
            if (s.hasOwnProperty("pathsIn")) {
                ns.pathsIn = { p: {} };
                for (var _d = 0, _e = Object.keys(s.pathsIn); _d < _e.length; _d++) {
                    var p = _e[_d];
                    if (s.pathsIn[p].length <= 0)
                        break;
                    var from = {
                        id: s.pathsIn[p][0][1]["id"],
                        name: s.pathsIn[p][0][1]["name"],
                        node: {
                            id: s.pathsIn[p][0][1]["node"]["id"],
                            name: s.pathsIn[p][0][1]["node"]["name"],
                        }
                    };
                    var to = {
                        id: s.pathsIn[p][0][2]["id"],
                        name: s.pathsIn[p][0][2]["name"],
                        node: {
                            id: s.pathsIn[p][0][2]["node"]["id"],
                            name: s.pathsIn[p][0][2]["node"]["name"],
                        }
                    };
                    ns.pathsIn[p] = { from: from, to: to };
                }
            }
            if (s.hasOwnProperty("pathsOut")) {
                for (var _f = 0, _g = Object.keys(s.pathsOut); _f < _g.length; _f++) {
                    var p = _g[_f];
                    if (s.pathsOut[p].length <= 0)
                        break;
                    //                    console.log(s.pathsOut[p]);
                    ns.pathsOut[p] = [];
                    for (var nsi = 0; nsi < s.pathsOut[p].length; nsi++) {
                        //                        console.log(s.pathsOut[p][nsi]);
                        var from = {
                            id: s.pathsOut[p][nsi][1]["id"],
                            name: s.pathsOut[p][nsi][1]["name"],
                            node: {
                                id: s.pathsOut[p][nsi][1]["node"]["id"],
                                name: s.pathsOut[p][nsi][1]["node"]["name"],
                            }
                        };
                        var to = {
                            id: s.pathsOut[p][nsi][2]["id"],
                            name: s.pathsOut[p][nsi][2]["name"],
                            node: {
                                id: s.pathsOut[p][nsi][2]["node"]["id"],
                                name: s.pathsOut[p][nsi][2]["node"]["name"],
                            }
                        };
                        ns.pathsOut[p].push({ from: from, to: to });
                    }
                }
            }
            if (s.hasOwnProperty("outputs")) {
                ns.outputs = [];
                for (var j = 0; j < s.outputs.length; j++) {
                    var o = s.outputs[j];
                    ns.outputs[j] = {
                        id: o.id,
                        name: o.name,
                        node: {
                            id: o.node.id,
                            name: o.node.name
                        }
                    };
                }
            }
            if (s.hasOwnProperty("inputs")) {
                ns.inputs = [];
                for (var j = 0; j < s.inputs.length; j++) {
                    var o = s.inputs[j];
                    s.inputs[j] = {
                        id: o.id,
                        name: o.name,
                        node: {
                            id: o.node.id,
                            name: o.node.name
                        }
                    };
                }
            }
            stages.push(ns);
        }
        //cyclic structure fix
        //for key pathsIn
        return stages;
    };
    CreateProjectPage.prototype.preloadStages = function (topology) {
        //load all stages
        for (var i = 0; i < topology.stages.length; i++) {
            var s = topology.stages[i];
            this.addStage(s);
            //also update the idCounter to larget value
            if (s.id > this.idCounter) {
                this.idCounter = s.id;
            }
        }
        //one done, make the connections
        for (var i = 0; i < topology.stages.length; i++) {
            var s = topology.stages[i];
            var outs = s.pathsOut[Object.keys(s.pathsOut)[0]];
            //            console.log(outs);
            var conn1, conn2;
            if (outs == undefined)
                continue;
            for (var _i = 0, outs_1 = outs; _i < outs_1.length; _i++) {
                var path = outs_1[_i];
                //                console.log(path);
                //if (path.length <= 0) continue;
                for (var j = 0; j < this.connections.length; j++) {
                    var con = this.connections[j];
                    if (path.from.node.id == con.id) {
                        conn1 = con.out;
                    }
                    if (path.to.node.id == con.id) {
                        conn2 = con.in;
                    }
                }
                //                console.log("Connecting : ");
                if (conn1 == undefined || conn2 == undefined)
                    continue;
                //                console.log(conn1);
                //                console.log(conn2);
                //                conn2.node.plugin.schema = Commons.clone(conn1.node.plugin.schema);
                conn1.connect(conn2);
            }
        }
    };
    CreateProjectPage.prototype.save = function () {
        commons_component_1.Commons.loaderShow();
        //first strip unwanted data from topology
        var tmp = commons_component_1.Commons.clone(this.topology);
        tmp.stages = this.stripUnwantedNodeProperties();
        this.http.post('api/projects/save', { project: tmp }, this.headers).map(function (response) { return response.json(); })
            .subscribe(function (d) {
            commons_component_1.Commons.loaderDone();
        }, function (e) { console.log(e); }, function (s) { console.log(s); });
    };
    CreateProjectPage.prototype.reload = function () {
        var _this = this;
        //get the project json
        this.http.post('/api/projects/json', { name: this.projectName }, this.headers).map(function (response) { return response.json(); })
            .subscribe(function (p) {
            //                console.log(p);
            _this.topology = p;
            _this.topology.name = _this.projectName;
            _this.preloadProject = true;
            _this.preloadStages(p);
            //this.connections.points = this.topology.connections;
            _this.preloadProject = false;
        }, function (e) { console.log(e); }, function (s) { console.log(s); });
    };
    CreateProjectPage.prototype.compile = function () {
        commons_component_1.Commons.loaderShow();
        this.http.post('/api/projects/compile', { name: this.projectName }, this.headers).map(function (response) { return response.json(); })
            .subscribe(function (p) {
            if (p.output !== undefined && p.output !== null && p.output !== "") {
                commons_component_1.Commons.loaderDone(p.output);
            }
            else if (p.error !== undefined && p.error !== null && p.error !== "") {
                commons_component_1.Commons.loaderDone(p.error);
            }
            else {
                commons_component_1.Commons.loaderDone(p.msg);
            }
        }, function (e) {
            commons_component_1.Commons.loaderDone(e);
        }, function (s) { console.log(s); });
    };
    CreateProjectPage.prototype.run = function () {
        commons_component_1.Commons.toast({ content: "Can not run right now. Execution engine seems to be not responding.<br/> Try again later!", timeout: 5000, htmlAllowed: true });
    };
    CreateProjectPage.prototype.findItem = function (arr, attr, val) {
        var attrs = attr.split('.');
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            for (var j = 0; j < attrs.length; j++) {
                if (obj == undefined)
                    break;
                obj = obj[attrs[j]];
                if (j == attrs.length - 1 && obj == val) {
                    return arr[i];
                }
            }
        }
    };
    CreateProjectPage.prototype.findItemIndex = function (arr, attr, val) {
        var attrs = attr.split('.');
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            for (var j = 0; j < attrs.length; j++) {
                if (obj == undefined)
                    break;
                obj = obj[attrs[j]];
                if (j == attrs.length - 1 && obj == val) {
                    return i;
                }
            }
        }
    };
    CreateProjectPage.__LOAD_ONCE_EDITOR = true;
    CreateProjectPage = __decorate([
        core_1.Component({
            templateUrl: 'app/project/create-project.component.html',
            providers: [http_1.HTTP_PROVIDERS],
            pipes: [commons_component_1.FilterPluginsPipe]
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.ActivatedRoute])
    ], CreateProjectPage);
    return CreateProjectPage;
}());
exports.CreateProjectPage = CreateProjectPage;
//# sourceMappingURL=create-project.component.js.map;
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
    ListProjectsPage.prototype.deploy = function () {
        commons_component_1.Commons.toast({ "content": "Can not deploy right now. Try again later!", timeout: 5000 });
    };
    ListProjectsPage.prototype.archive = function () {
        commons_component_1.Commons.toast({ "content": "Can not archive right now. Try again later!", timeout: 5000 });
    };
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
//# sourceMappingURL=list-projects.component.js.map;
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
            { data: [0], label: '' }
        ];
        this.lineChartLabels = [''];
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
                backgroundColor: 'rgba(0,0,255,0.2)',
                borderColor: 'rgba(0,0,255,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(255,0,0,0.2)',
                borderColor: 'rgba(255,0,0,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartType = "line";
        this.oldCount = { default: 0 };
        this.lcc = [0];
        this.runOnce = { default: true };
        var _this_ = this;
        if (this.projectName == undefined) {
            var uri = window.location.href.split["/"];
            this.projectName = uri[uri.length - 1];
        }
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
        console.log(_this_.projectName);
        this.http.post('/api/reports', { project: _this_.projectName }, this.headers).map(function (res) { return res.json(); }).subscribe(function (dd) {
            if (dd != undefined && dd.length > 0) {
                //add one chartline per report
                if (_this_.lineChartData.length != dd.length) {
                    //mismatch found add more lines
                    var diff = dd.length - _this_.lineChartData.length;
                    console.log(diff);
                    //                        
                    for (var ii = 0; ii < diff; ii++) {
                        _this_.lineChartData.push({ data: [0], label: '' });
                        _this_.lineChartLabels.push("");
                        var d = JSON.parse(dd[ii]);
                        _this_.runOnce[d.report] = 0;
                        _this_.oldCount[d.report] = true;
                    }
                    return;
                }
                for (var i = 0; i < dd.length; i++) {
                    var d = JSON.parse(dd[i]);
                    console.log(d);
                    _this_.updateChartsData(i, d);
                }
            }
        }, function (e) {
            console.log("Cound not fetch projects list!");
        }, function (s) {
            console.log("Fetched Projects!");
        });
    };
    ReportPage.prototype.updateChartsData = function (i, d) {
        var nc = 0;
        var _this_ = this;
        if (_this_.runOnce[d.report]) {
            _this_.oldCount[d.report] = d.data.count;
            _this_.runOnce[d.report] = false;
        }
        else {
            if (_this_.oldCount[d.report] != d.data.count) {
                nc = d.data.count - _this_.oldCount[d.report];
            }
            else {
                nc = 0;
            }
        }
        _this_.appendVal(_this_.lineChartData[i].data, nc);
        if (i == 0)
            _this_.appendVal(_this_.lineChartLabels, d.data.date);
        _this_.lineChartData[i].label = d.data.stream_label;
        _this_.oldCount[i] = d.data.count;
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
//# sourceMappingURL=report.component.js.map;
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
var commons_component_1 = require('../home/commons.component');
var PasswordResetPage = (function () {
    function PasswordResetPage() {
        this.title = "Password Reset";
    }
    PasswordResetPage.prototype.resetPass = function () {
        commons_component_1.Commons.toast({ content: "Mail sent to the email id with reset instructions!", timeout: 5000 });
    };
    PasswordResetPage = __decorate([
        core_1.Component({
            templateUrl: 'app/user/password-reset.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], PasswordResetPage);
    return PasswordResetPage;
}());
exports.PasswordResetPage = PasswordResetPage;
//# sourceMappingURL=password-reset.component.js.map;
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
var router_1 = require('@angular/router');
var RegisterPage = (function () {
    function RegisterPage(router) {
        this.router = router;
        this.title = "Register";
    }
    RegisterPage.prototype.register = function () {
        this.router.navigate(['/']);
    };
    RegisterPage = __decorate([
        core_1.Component({
            templateUrl: 'app/user/register-page.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], RegisterPage);
    return RegisterPage;
}());
exports.RegisterPage = RegisterPage;
//# sourceMappingURL=register-page.component.js.map