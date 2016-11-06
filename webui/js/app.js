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
        if (requestedURL !== undefined && requestedURL !== "") {
            this.router.navigate([requestedURL]);
        }
    }
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
var app_component_1 = require('./app.component');
var home_component_1 = require('./home/home.component');
var create_project_component_1 = require('./project/create-project.component');
var list_projects_component_1 = require('./project/list-projects.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_1.routing, http_1.HttpModule],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, create_project_component_1.CreateProjectPage, list_projects_component_1.ListProjectsPage],
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
var appRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    }, {
        path: 'editor',
        component: create_project_component_1.CreateProjectPage
    }, {
        path: 'projects',
        component: list_projects_component_1.ListProjectsPage
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
var HomeComponent = (function () {
    function HomeComponent() {
        this.title = "Stream Analyzer";
    }
    HomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/home/home.component.html'
        }), 
        __metadata('design:paramtypes', [])
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
var CreateProjectPage = (function () {
    function CreateProjectPage(_http) {
        this._http = _http;
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
        this.topology = { name: 'Untitiled' + new Date().getMilliseconds(), stages: [], connections: [] };
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
        this.http = _http;
        //load plugins
        _http.get('api/plugins', this.headers).map(function (response) { return response.json(); })
            .subscribe(function (p) { _this_.plugins = p; }, function (e) { console.log(e); }, function (s) { console.log(s); });
    }
    CreateProjectPage.prototype.saInit = function () {
        var _this_ = this;
        //get the project json
        this.http.get('api/project/json', this.headers).map(function (response) { return response.json(); })
            .subscribe(function (p) { _this_.topology = p; console.log(p); }, function (e) { console.log(e); }, function (s) { console.log(s); });
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
                this.saTools[i].size = { w: 200, h: 250 };
                this.saTools[i].size = { w: 200, h: 250 };
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
        for (var _i = 0, _a = this.connections.points; _i < _a.length; _i++) {
            var p = _a[_i];
            // p.clear();
            this.connections.lineStyle(4, 0x000000, 1);
            var ex = p.e.worldTransform.tx, ey = p.e.worldTransform.ty;
            var sx = p.s.worldTransform.tx, sy = p.s.worldTransform.ty;
            this.connections.moveTo(sx, sy);
            this.connections.bezierCurveTo(sx + 50, sy + 50, ex - 50, ey, ex, ey);
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
        var obj = oobj.resizable ? this.getSpriteResizable(oobj.saImage, oobj.size.w, oobj.size.h) : this.getSprite(oobj.saImage);
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
        console.log(obj);
        this.stage.addChild(obj);
        this.addObjToTopology(obj, oobj);
        console.log("topo : ");
        console.log(this.topology);
    };
    CreateProjectPage.prototype.addObjToTopology = function (obj, oobj) {
        var tobj = {
            "id": obj._id,
            "type": obj.type,
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
            for (var i = 0; i < _this_.connections.points.length; i++) {
                p = _this_.connections.points[i];
                if (p.s.parent._id == obj._id || p.e.parent._id == obj._id) {
                    _this_.connections.points.splice(i, 1);
                    i--;
                }
            }
            setTimeout(function () {
                obj.destroy({ children: true });
            }, 1000);
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
            var bhole = this.getSprite("app/images/hole.png");
            bhole.anchor.x = 0.5;
            bhole.anchor.y = 0.5;
            bhole.x = 0;
            bhole.y = -obj.height / 2;
            bhole.interactive = true;
            bhole.mouseup = function (d) {
                _this_.chMouseUp(d, bhole);
            };
            bhole.mousedown = function (d) {
                _this_.chMouseDown(d, bhole);
            };
            obj.addChild(bhole);
        }
    };
    CreateProjectPage.prototype.chMouseUp = function (d, obj) {
        var _this_ = this;
        if (_this_.connectMode) {
            if (obj.parent._id == _this_._selectedHole.parent._id) {
                console.log("same");
            }
            else {
                _this_._tmpConnection.e = obj;
                _this_.connections.points.push(_this_._tmpConnection);
                _this_._tmpConnection = undefined;
                _this_.connectMode = false;
            }
        }
        else {
            _this_.connectMode = true;
            _this_._selectedHole = obj;
        }
        d.stopPropagation();
    };
    CreateProjectPage.prototype.chMouseDown = function (d, obj) {
        d.stopPropagation();
    };
    CreateProjectPage.prototype.initializeProperties = function (obj, oobj) {
        //subcomponent propeties
        //set default properties
        // obj.anchor.x = 0.5;
        // obj.anchor.y = 0.5;
        obj.properties = oobj.properties == undefined ? [] : oobj.properties;
        obj.position.x = 200 * Math.random();
        obj.position.y = 200;
        obj.interactive = true;
        obj._id = new Date().getMilliseconds();
        obj.name = oobj.plugin.name;
        //visible properties
        var _elementNum = 2;
        for (var _i = 0, _a = obj.properties; _i < _a.length; _i++) {
            var k = _a[_i];
            var kn = new this.saPixi.Text(k.name + ": ", { fontFamily: 'Arial', fontSize: 12, fill: 0xFFFFFF, align: 'left', wordWrap: true });
            kn.x = -(obj.width / 2) + 20;
            kn.y = -(obj.height / 2) + (20 * _elementNum);
            var kv = new this.saPixi.Text(k.defaultValue, { fontFamily: 'Arial', fontSize: 12, fill: 0xFFFFFF, align: 'left', wordWrap: true });
            kv.x = -(obj.width / 2) + 20 + kn.width + 20;
            kv.y = -(obj.height / 2) + (20 * _elementNum);
            obj.addChild(kn);
            obj.addChild(kv);
            _elementNum += 1;
            k.object = kv;
            k.nv = kv.text;
        }
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
            inp.object.text = inp.nv;
            for (var _b = 0, _c = this.topology.stages; _b < _c.length; _b++) {
                var o = _c[_b];
                if (o.id == this.saSelectedObject._id) {
                    this.updateTopologyProperties(o, this.saSelectedObject);
                }
            }
        }
        console.log(this.topology);
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
        }
        _this_.dragMode = false;
    };
    CreateProjectPage.prototype.save = function () {
        this.http.post('api/projects/save', { project: this.topology }, this.headers).map(function (response) { return response.json(); })
            .subscribe(function (d) { console.log(d); }, function (e) { console.log(e); }, function (s) { console.log(s); });
    };
    CreateProjectPage.prototype.reload = function () {
    };
    CreateProjectPage.__LOAD_ONCE_EDITOR = true;
    CreateProjectPage = __decorate([
        core_1.Component({
            templateUrl: 'app/project/create-project.component.html',
            providers: [http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
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
//# sourceMappingURL=list-projects.component.js.map