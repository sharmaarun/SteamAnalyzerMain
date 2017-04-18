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
        this.initCharts();
        this.initReports();
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
        }, 2000);
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
        // tools
        this.saToolsImages = [
            "app/images/panel.png",
            "app/images/stream_point.png",
            "app/images/db.png"
        ];
        this.saControlsImages = [
            "app/images/cross.png",
            "app/images/edit.png",
            "app/images/hole.png"
        ];
        this.saToolSprites = [
            "app/images/panel.json"
        ];
        this.cross = {};
        this.saTools = [];
        this.saAllObjects = [];
        this.saSelectedObject = {};
        this.plugins = [];
        //objects
        this.topology = { name: 'Untitiled' + new Date().getMilliseconds(), displayName: "", stages: [], connections: [] };
        this.idCounter = 0;
        this.conIdCounter = 0;
        this.connections = [];
        //event flags
        this.dragMode = false;
        this.dragging = false;
        this.connectMode = false;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this._this_ = this;
        this.saPixi = PIXI;
        this.bgColor = 0xFFFFFF;
        //load all the tools
        //        for (var i = 0; i < this.saToolsImages.length;         i++) {
        //            var obj = new this.saPixi.Sprite(this.saPixi.Texture.fromImage(this.saToolsImages[i].        image))
        //            this.saTools.push({'name':this.saToolsImages[i].name, tool:         obj});
        //        }
        //setup topology
        if (CreateProjectPage.__LOAD_ONCE_EDITOR) {
            this.saPixi.loader
                .add(this.saToolsImages)
                .add(this.saControlsImages)
                .add(this.saToolSprites)
                .load(this.saInit);
        }
        setTimeout(function () {
            _this_.saSetup();
            CreateProjectPage.__LOAD_ONCE_EDITOR = false;
        }, 1000);
        var _this_ = this;
        this.http = this._http;
        //load plugins
        this._http.get('api/plugins', this.headers).map(function (response) { return response.json(); })
            .subscribe(function (p) { _this_.plugins = p; }, function (e) { console.log(e); }, function (s) { console.log(s); });
    }
    CreateProjectPage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.projectName = params['name']; // (+) converts string 'id' to a number
            _this.preloadProject = true;
            // In a real app: dispatch action to load the details here.
        });
    };
    CreateProjectPage.prototype.saInit = function () {
    };
    CreateProjectPage.prototype.showStage = function () {
        console.log(this.stage);
    };
    CreateProjectPage.prototype.saSetup = function () {
        //once all tool images loaded, start setup
        //        this.saTools.push({ _id: 0 });
        //        this.saTools[0].saImage = this.saToolSprites[0];
        //        this.saTools[0].name = 'Panel';
        //        this.saTools[0].resizable = true;
        //        this.saTools[0].size = { w: 200, h: 250 };
        //        this.saTools[0].size = { w: 200, h: 250 };
        //        this.saTools[0].properties = [
        //            { name: 'Type', type: 'text', defaultValue: 'KEYWORD_SEARCH', object: name, nv: '' },
        //            { name: 'Keyword', type: 'text', defaultValue: '', object: name, nv: '' },
        //        ];
        //
        //        this.saTools.push({ _id: 1 });
        //        this.saTools[1].saImage = this.saToolsImages[1];
        //        this.saTools[1].name = 'StreamPoint';
        //        this.saTools[1].resizable = false;
        //        this.saTools[1].size = { w: 100, h: 100 };
        //
        //        this.saTools.push({ _id: 2 });
        //        this.saTools[2].saImage = this.saToolsImages[2];
        //        this.saTools[2].name = 'DataBase';
        //        this.saTools[2].resizable = false;
        //        this.saTools[2].size = { w: 100, h: 100 };
        //create plugins
        if (this.plugins.length) {
            for (var i = 0; i < this.plugins.length; i++) {
                var plug = this.plugins[i];
                this.saTools.push({ _id: i });
                this.saTools[i].plugin = plug;
                this.saTools[i].saImage = this.saToolSprites[0];
                this.saTools[i].name = plug.name;
                this.saTools[i].resizable = true;
                this.saTools[i].size = { w: 150, h: 150 };
                //                this.saTools[i].size = { w: 200, h: 250 };
                this.saTools[i].properties = [];
                for (var j = 0; j < plug.clientParams.length; j++) {
                    this.saTools[i].properties.push({
                        name: plug.clientParams[j].name,
                        type: plug.clientParams[j].type,
                        param: plug.clientParams[j].param,
                        object: name, nv: ''
                    });
                }
            }
        }
        var w = $("#drawBox").width();
        var h = $("#drawBox").height();
        this.renderer = this.saPixi.autoDetectRenderer(w, h, { antialias: true, transparent: false, resolution: 1 });
        document.getElementById("drawBox").appendChild(this.renderer.view);
        $("#drawBox").bind('mousewheel', this.stageZoom);
        // this.saPixi.DOM.Setup(this.renderer,true);
        this.stage = new this.saPixi.Container();
        this.connections = new this.saPixi.Graphics();
        this.connections.points = [];
        // this.connections.points.push({x1:0,y1:0,x2:100,y2:100});
        // this.connections.points.push({x:100,y:100});
        // this.connections.push(gfx);
        this.stage.addChild(this.connections);
        this.stage.mouseup = this.stageMouseUp;
        this.stage.mousemove = this.stageMouseMove;
        var _this_ = this;
        if (this.projectName !== undefined && this.projectName !== null) {
            this.reload();
        }
        this.saRender();
    };
    CreateProjectPage.prototype.stageZoom = function (e, d) {
        console.log(e);
        this._zoomLevel += (e.originalEvent.wheelDelta / 100);
        return false;
    };
    CreateProjectPage.prototype.stageMouseUp = function (d) {
        if (this.connectMode) {
            this.connectMode = false;
            this._tmpConnection = undefined;
        }
    };
    CreateProjectPage.prototype.stageMouseMove = function (d) {
        console.log("moving");
    };
    CreateProjectPage.prototype.getSprite = function (path) {
        var obj = new this.saPixi.Sprite(this.saPixi.loader.resources[path].texture);
        obj.anchor.x = 0.5;
        obj.anchor.y = 0.5;
        return obj;
    };
    CreateProjectPage.prototype.getSpriteResizable = function (path, _w, _h) {
        var parent = new this.saPixi.Container();
        parent.width = _w;
        parent.height = _h;
        parent.tl = new this.saPixi.Sprite.fromFrame("tl");
        parent.tm = new this.saPixi.Sprite.fromFrame("tm");
        parent.tr = new this.saPixi.Sprite.fromFrame("tr");
        parent.ml = new this.saPixi.Sprite.fromFrame("ml");
        parent.mm = new this.saPixi.Sprite.fromFrame("mm");
        parent.mr = new this.saPixi.Sprite.fromFrame("mr");
        parent.bl = new this.saPixi.Sprite.fromFrame("bl");
        parent.bm = new this.saPixi.Sprite.fromFrame("bm");
        parent.br = new this.saPixi.Sprite.fromFrame("br");
        parent.tl.anchor.x = parent.tm.anchor.x = parent.tr.anchor.x = parent.ml.anchor.x = parent.mm.anchor.x = parent.mr.anchor.x = parent.bl.anchor.x = parent.bm.anchor.x = parent.br.anchor.x = 0.5;
        parent.tl.anchor.y = parent.tm.anchor.y = parent.tr.anchor.y = parent.ml.anchor.y = parent.mm.anchor.y = parent.mr.anchor.y = parent.bl.anchor.y = parent.bm.anchor.y = parent.br.anchor.y = 0.5;
        // parent.pivot.x=0.5;
        // parent.pivot.y=0.5;
        parent.addChild(parent.tl);
        parent.addChild(parent.tm);
        parent.addChild(parent.tr);
        parent.addChild(parent.ml);
        parent.addChild(parent.mm);
        parent.addChild(parent.mr);
        parent.addChild(parent.bl);
        parent.addChild(parent.bm);
        parent.addChild(parent.br);
        // console.log(tl.height);
        // 
        // tl.x=0;tl.y=0;
        // ml.x=0;
        parent.tl.x = parent.ml.x = parent.bl.x = -(_w / 2) + (parent.tl.width / 2);
        parent.tl.y = parent.tm.y = parent.tr.y = -(_h / 2) + (parent.tl.height / 2);
        parent.ml.y = parent.mm.y = parent.mr.y = 0;
        parent.bl.y = parent.bm.y = parent.br.y = (_h / 2) - (parent.bl.height / 2);
        parent.tm.x = parent.mm.x = parent.bm.x = 0;
        parent.tr.x = parent.mr.x = parent.br.x = (_w / 2) - (parent.tr.width / 2);
        parent.ml.height = parent.mm.height = parent.mr.height = _h - (parent.ml.height * 2);
        parent.tm.width = parent.mm.width = parent.bm.width = _w - (parent.tl.width * 2);
        parent._resizable = true;
        return parent;
    };
    CreateProjectPage.prototype.saUpdate = function () {
        //update connection curves
        this.connections.clear();
        if (this.connections.points) {
            for (var _i = 0, _a = this.connections.points; _i < _a.length; _i++) {
                var p = _a[_i];
                // p.clear();
                this.connections.lineStyle(4, 0x000000, 1);
                var ex = p.e.worldTransform.tx, ey = p.e.worldTransform.ty;
                var sx = p.s.worldTransform.tx, sy = p.s.worldTransform.ty;
                this.connections.moveTo(sx, sy);
                this.connections.bezierCurveTo(sx + 50, sy + 50, ex - 50, ey, ex, ey);
            }
        }
        if (this._tmpConnection != undefined) {
            this.connections.lineStyle(4, 0xCCCCCC, 0.5);
            var ex = this._tmpConnection.e.worldTransform.tx, ey = this._tmpConnection.e.worldTransform.ty;
            var sx = this._tmpConnection.s.worldTransform.tx, sy = this._tmpConnection.s.worldTransform.ty;
            this.connections.moveTo(sx, sy);
            this.connections.bezierCurveTo(sx + 50, sy + 50, ex - 50, ey, ex, ey);
        }
        //logic
        //zoom logic
        this.stage.scale.x = this.stage.scale.y = this._zoomLevel;
        //connection point logic
        if (this.connectMode) {
            if (this._tmpConnection != undefined) {
                this._tmpConnection.e.worldTransform.tx = this.renderer.plugins.interaction.mouse.global.x;
                this._tmpConnection.e.worldTransform.ty = this.renderer.plugins.interaction.mouse.global.y;
            }
            else {
                this._tmpConnection = { s: this._selectedHole, e: { worldTransform: { tx: 0, ty: 0 } } };
            }
        }
    };
    CreateProjectPage.prototype.saRender = function () {
        var _this_ = this;
        requestAnimationFrame(function () { _this_.saRender(); });
        //update logic
        this.saUpdate();
        this.renderer.backgroundColor = this.bgColor;
        this.renderer.render(this.stage);
    };
    CreateProjectPage.prototype.addConnection = function (source, target) {
    };
    CreateProjectPage.prototype.addObject = function (oobj) {
        // console.log(oobj);
        console.log("Adding Object : " + this.idCounter);
        var obj = oobj.resizable ? this.getSpriteResizable(oobj.saImage, oobj.size.w, oobj.size.h) : this.getSprite(oobj.saImage);
        obj._id = this.idCounter;
        this.idCounter += 1;
        //initialize visible/private properties
        this.initializeProperties(obj, oobj);
        //initialize controls
        this.initializeControls(obj, oobj);
        //setup event handler
        var _this_ = this;
        obj.mousedown = obj.touchstart = function (data) {
            _this_.onSelect(data);
        };
        obj.mousemove = function (data) {
            _this_.onClickDrag(data, _this_);
        };
        ;
        obj.mouseup = function (data) {
            _this_.onMouseUp(data, _this_);
        };
        ;
        // var inp = new _this_.saPixi.DOM.Sprite('<input type="text" placeholder="Name">',{x:10,y:10});
        // this.stage.addChild(inp);
        this.stage.addChild(obj);
        console.log(oobj.tpItem + "<<");
        if (oobj.tpItem != undefined)
            this.topology.stages[oobj.tpItem].stageChild = obj;
        console.log(obj);
        if (!this.preloadProject) {
            this.addObjToTopology(obj, oobj);
        }
        ;
    };
    CreateProjectPage.prototype.addObjToTopology = function (obj, oobj) {
        var tobj = {
            "id": obj._id,
            "type": oobj.plugin.type,
            "plugin": oobj.plugin.plugin
        };
        this.updateTopologyProperties(tobj, obj);
        this.topology.stages.push(tobj);
    };
    CreateProjectPage.prototype.showPropertiesEditor = function (obj) {
        this.saSelectedObject = obj;
        $("#propertiesEditor").modal("show");
    };
    CreateProjectPage.prototype.initializeControls = function (obj, oobj) {
        //remove control
        var remove = this.getSprite("app/images/cross.png");
        remove.x = (obj.width / 2);
        remove.y = -(obj.height / 2) + 10;
        remove.interactive = true;
        // console.log(remove);
        var _this_ = this;
        remove.mousedown = function (d) {
            _this_.stage.removeChild(obj);
            var p;
            //            for (var i = 0; i < _this_.connections.points.length; i++) {
            //                p = _this_.connections.points[i];
            //                if (p.s.parent._id == obj._id || p.e.parent._id == obj._id) {
            //                    _this_.connections.points.splice(i, 1);
            //                    i--;
            //                }
            //            }
            var index1 = _this_.findItemIndex(_this_.connections.points, "s.parent._id", obj._id);
            var index2 = _this_.findItemIndex(_this_.connections.points, "e.parent._id", obj._id);
            if (index1 != undefined && index1 != null)
                _this_.connections.points.splice(index1, 1);
            if (index2 != undefined && index2 != null)
                _this_.connections.points.splice(index2, 1);
            setTimeout(function () {
                _this_.removeFromTopology(obj);
                obj.destroy({ children: true });
            }, 100);
            // delete this;
            d.stopPropagation();
        };
        obj.addChild(remove);
        //edit control
        var edit = this.getSprite("app/images/edit.png");
        edit.x = (obj.width / 2) - 20;
        edit.y = -(obj.height / 2) + 10;
        edit.interactive = true;
        // console.log(remove);
        edit.mousedown = function (d) {
            _this_.showPropertiesEditor(obj);
            d.stopPropagation();
        };
        obj.addChild(edit);
        //initialize connection points
        if (oobj.plugin.type == 'DATABASE' || oobj.plugin.type == 'STREAM_STAGE') {
            _this_.addConnectionHoles(obj, false, false, true, false);
        }
        else {
            _this_.addConnectionHoles(obj, false, true, false, true);
        }
    };
    CreateProjectPage.prototype.addConnectionHoles = function (obj, top, right, bottom, left) {
        var _this_ = this;
        if (left) {
            //hole-l control
            var lhole = this.getSprite("app/images/hole.png");
            lhole.name = "lhole";
            lhole.anchor.x = 0.5;
            lhole.anchor.y = 0.5;
            lhole.x = -(obj.width / 2);
            lhole.y = 0;
            lhole.interactive = true;
            lhole.mouseup = function (d) {
                _this_.chMouseUp(d, lhole);
            };
            lhole.mousedown = function (d) {
                _this_.chMouseDown(d, lhole);
            };
            obj.addChild(lhole);
        }
        if (right) {
            //hole-r control
            var rhole = this.getSprite("app/images/hole.png");
            rhole.name = "rhole";
            rhole.anchor.x = 0.5;
            rhole.anchor.y = 0.5;
            rhole.x = (obj.width / 2);
            rhole.y = 0;
            rhole.interactive = true;
            rhole.mouseup = function (d) {
                _this_.chMouseUp(d, rhole);
            };
            rhole.mousedown = function (d) {
                _this_.chMouseDown(d, rhole);
            };
            obj.addChild(rhole);
        }
        if (bottom) {
            //hole-r control
            var bhole = this.getSprite("app/images/hole.png");
            bhole.name = "bhole";
            bhole.anchor.x = 0.5;
            bhole.anchor.y = 0.5;
            bhole.x = 0;
            bhole.y = obj.height / 2;
            bhole.interactive = true;
            bhole.mouseup = function (d) {
                _this_.chMouseUp(d, bhole);
            };
            bhole.mousedown = function (d) {
                _this_.chMouseDown(d, bhole);
            };
            obj.addChild(bhole);
        }
        if (top) {
            //hole-r control
            var thole = this.getSprite("app/images/hole.png");
            thole.name = "thole";
            thole.anchor.x = 0.5;
            thole.anchor.y = 0.5;
            thole.x = 0;
            thole.y = -obj.height / 2;
            thole.interactive = true;
            thole.mouseup = function (d) {
                _this_.chMouseUp(d, thole);
            };
            thole.mousedown = function (d) {
                _this_.chMouseDown(d, thole);
            };
            obj.addChild(thole);
        }
    };
    CreateProjectPage.prototype.chMouseUp = function (d, obj) {
        var _this_ = this;
        console.log(_this_.connectMode);
        if (_this_.connectMode) {
            if (obj.parent._id == _this_._selectedHole.parent._id) {
                console.log("Same parent! Not connecting.");
            }
            else {
                _this_._tmpConnection.e = obj;
                _this_.connections.points.push(_this_._tmpConnection);
                _this_.addConnectionToTopology(_this_._tmpConnection);
                _this_.connectMode = false;
                console.log("Connected.");
                _this_._tmpConnection = undefined;
            }
        }
        else {
            _this_.connectMode = true;
            _this_._selectedHole = obj;
        }
        d.stopPropagation();
    };
    CreateProjectPage.prototype.addConnectionToTopology = function (conn) {
        var _this_ = this;
        _this_.topology.connections.push({
            e: conn.e.parent._id,
            s: conn.s.parent._id,
            ehole: conn.e.name,
            shole: conn.s.name,
        });
    };
    CreateProjectPage.prototype.chMouseDown = function (d, obj) {
        d.stopPropagation();
    };
    CreateProjectPage.prototype.initializeProperties = function (obj, oobj) {
        //subcomponent propeties
        //set default properties
        // obj.anchor.x = 0.5;
        // obj.anchor.y = 0.5;
        oobj.pos = this.findItem(this.topology.stages, "id", obj._id);
        oobj.pos = obj.pos == undefined ? undefined : oobj.pos.pos;
        obj.properties = oobj.properties == undefined ? [] : oobj.properties;
        obj.position.x = oobj.pos != undefined ? oobj.pos.x : 200 * Math.random() + 30;
        obj.position.y = oobj.pos != undefined ? oobj.pos.y : 200;
        obj.interactive = true;
        obj.name = oobj.plugin.name;
        //visible properties
        //        var _elementNum = 2;
        //        for (var k of obj.properties) {
        //            var kn = new this.saPixi.Text(k.name + ": ", { fontFamily: 'Arial', fontSize: 12, fill: 0xFFFFFF, align: 'left', wordWrap: true });
        //
        //            kn.x = -(obj.width / 2) + 20;
        //            kn.y = -(obj.height / 2) + (20 * _elementNum);
        //            var kv = new this.saPixi.Text( k.defaultValue, { fontFamily: 'Arial', fontSize: 12, fill: 0xFFFFFF, align: 'left', wordWrap: true });
        //            if (this.projectName == "" || this.projectName == undefined || this.projectName == null) {
        //                 kv.text = k.defaultValue;
        //            }
        //            else{
        //                kv.text = k.nv;
        //            }
        //            kv.x = -(obj.width / 2) + 20 + kn.width + 20;
        //            kv.y = -(obj.height / 2) + (20 * _elementNum);
        //            obj.addChild(kn);
        //            obj.addChild(kv);
        //            _elementNum += 1;
        //
        //            k.object = kv;
        //            k.nv = kv.text;
        //        }
        //name
        var name = null;
        name = new this.saPixi.Text(obj.name, { fontFamily: 'Arial', fontSize: 12, fill: 0xFFFFFF, align: 'left', wordWrap: true });
        name.x = -(obj.width / 2) + 20;
        name.y = -(obj.height / 2) + 20;
        //obj.properties.push({ name: 'Name', type: 'text', object: name, nv: name.text });
        obj.addChild(name);
    };
    CreateProjectPage.prototype.updateProperties = function () {
        for (var _i = 0, _a = this.saSelectedObject.properties; _i < _a.length; _i++) {
            var inp = _a[_i];
            console.log(inp);
            inp.object = { text: "" };
            inp.object.text = inp.nv;
            for (var _b = 0, _c = this.topology.stages; _b < _c.length; _b++) {
                var o = _c[_b];
                if (o.id == this.saSelectedObject._id) {
                    this.updateTopologyProperties(o, this.saSelectedObject);
                }
            }
        }
    };
    CreateProjectPage.prototype.removeFromTopology = function (obj) {
        for (var i = 0; i < this.topology.stages.length; i++) {
            if (this.topology.stages[i].id == obj._id) {
                this.topology.stages.splice(i, 1);
                break;
            }
        }
    };
    CreateProjectPage.prototype.updateTopologyProperties = function (item, obj) {
        item.metadata = {};
        for (var _i = 0, _a = obj.properties; _i < _a.length; _i++) {
            var p = _a[_i];
            item.metadata[p.param] = p.nv;
        }
    };
    CreateProjectPage.prototype.highlightSelected = function () {
        if (this.saSelectedObject != undefined) {
        }
    };
    CreateProjectPage.prototype.onSelect = function (data) {
        this.saSelectedObject = data.target;
        this.dragging = false;
        this.dragMode = true;
    };
    CreateProjectPage.prototype.onClickDrag = function (data, _this_) {
        if (_this_.dragMode) {
            _this_.saSelectedObject.transform.position._x = data.data.global.x;
            _this_.saSelectedObject.transform.position._y = data.data.global.y;
            _this_.dragging = true;
        }
    };
    CreateProjectPage.prototype.onMouseUp = function (data, _this_) {
        if (!_this_.dragging) {
            _this_.cross.visible = true;
        }
        else {
            _this_.dragging = false;
            //update position of object in topology
            var stage = _this_.findItemIndex(_this_.topology.stages, "id", data.target._id);
            _this_.topology.stages[stage].pos = { x: data.target.transform.position._x, y: data.target.transform.position._y };
        }
        _this_.dragMode = false;
    };
    CreateProjectPage.prototype.trimTopology = function (tp) {
        for (var i = 0; i < tp.stages.length; i++) {
            tp.stages[i].stageChild = undefined;
        }
    };
    CreateProjectPage.prototype.save = function () {
        commons_component_1.Commons.loaderShow();
        //        this.topology.connections = this.connections.points;
        //fill up fixed props
        // remove all the unwanted properties before save
        this.trimTopology(this.topology);
        this.http.post('api/projects/save', { project: this.topology }, this.headers).map(function (response) { return response.json(); })
            .subscribe(function (d) {
            console.log(d);
            commons_component_1.Commons.loaderDone();
        }, function (e) { console.log(e); }, function (s) { console.log(s); });
    };
    CreateProjectPage.prototype.updateDrawableProperties = function (item, o, cb) {
        for (var i = 0; i < o.properties.length; i++) {
            o.properties[i].nv = item.metadata[o.properties[i].param];
            o.properties.object = { text: "" };
        }
        cb(o);
    };
    CreateProjectPage.prototype.getTool = function (name) {
        for (var i = 0; i < this.saTools.length; i++) {
            if (name == this.saTools[i].plugin.name) {
                return this.saTools[i];
            }
        }
    };
    CreateProjectPage.prototype.drawTopology = function (tp) {
        var _this_ = this;
        for (var i = 0; i < tp.stages.length; i++) {
            var oobj = JSON.parse(JSON.stringify(this.getTool(tp.stages[i].plugin)));
            oobj.tpItem = i;
            if (oobj !== undefined && oobj !== null) {
                this.updateDrawableProperties(tp.stages[i], oobj, function (o) {
                    _this_.idCounter = tp.stages[i].id;
                    _this_.addObject(o);
                });
            }
        }
        //TODO: replace timeout
        setTimeout(function () {
            _this_.formatConnections(tp.connections);
        }, 1000);
    };
    CreateProjectPage.prototype.formatConnections = function (conn) {
        var _this_ = this;
        var s = {}, e = {};
        console.log(this.connections);
        for (var _i = 0, conn_1 = conn; _i < conn_1.length; _i++) {
            var c = conn_1[_i];
            console.log("For conn : ");
            console.log(c);
            for (var i = 0; i < _this_.topology.stages.length; i++) {
                console.log("For stage : ");
                console.log(_this_.topology.stages[i].id);
                if (_this_.topology.stages[i].id == c.s) {
                    for (var j = 0; j < _this_.topology.stages[i].stageChild.children.length; j++) {
                        if (_this_.topology.stages[i].stageChild.children[j].name == c.shole) {
                            s = _this_.topology.stages[i].stageChild.children[j];
                        }
                        ;
                    }
                }
                if (this.topology.stages[i].id == c.e) {
                    for (var j = 0; j < _this_.topology.stages[i].stageChild.children.length; j++) {
                        if (_this_.topology.stages[i].stageChild.children[j].name == c.ehole) {
                            e = _this_.topology.stages[i].stageChild.children[j];
                        }
                        ;
                    }
                }
            }
            _this_.connections.points.push({
                s: s, e: e
            });
        }
    };
    CreateProjectPage.prototype.reload = function () {
        var _this = this;
        //get the project json
        this.http.post('/api/projects/json', { name: this.projectName }, this.headers).map(function (response) { return response.json(); })
            .subscribe(function (p) {
            console.log(p);
            _this.topology = p;
            _this.topology.name = _this.projectName;
            _this.preloadProject = true;
            //this.connections.points = this.topology.connections;
            _this.drawTopology(_this.topology);
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
            providers: [http_1.HTTP_PROVIDERS]
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