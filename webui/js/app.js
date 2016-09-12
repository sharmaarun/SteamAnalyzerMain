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
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'THS';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: '<router-outlet></router-outlet>'
        }), 
        __metadata('design:paramtypes', [])
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
var app_component_1 = require('./app.component');
var home_component_1 = require('./home/home.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_1.routing],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent],
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
var appRoutes = [
    {
        path: 'home',
        component: home_component_1.HomeComponent
    }, {
        path: 'project/create',
        component: create_project_component_1.CreateProjectPage
    }, {
        path: '',
        component: home_component_1.HomeComponent
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
var CreateProjectPage = (function () {
    function CreateProjectPage() {
        this.title = "Create Project";
        // tools
        this.saToolsImages = [
            "app/images/panel.png",
            "app/images/cross.png",
            "app/images/stream_point.png"
        ];
        this.cross = {};
        this.saTools = [];
        this.saAllObjects = [];
        this.saSelectedObject = {};
        //event flags
        this.dragMode = false;
        this.dragging = false;
        this._this_ = this;
        this.saPixi = PIXI;
        this.bgColor = 0xFFFFFF;
        //load all th        e tools
        //        for (var i = 0; i < this.saToolsImages.length;         i++) {
        //            var obj = new this.saPixi.Sprite(this.saPixi.Texture.fromImage(this.saToolsImages[i].        image))
        //            this.saTools.push({'name':this.saToolsImages[i].name, tool:         obj});
        //        }
        this.saPixi.loader
            .add(this.saToolsImages)
            .load(this.saInit);
        var _this_ = this;
        setTimeout(function () {
            _this_.saSetup();
        }, 1000);
    }
    CreateProjectPage.prototype.saInit = function () {
        var _this_ = this;
    };
    CreateProjectPage.prototype.saSetup = function () {
        //once all tool images loaded, start setup
        this.saTools.push(this.getSprite(this.saToolsImages[0]));
        this.saTools[0].saImage = this.saToolsImages[0];
        this.saTools[0].name = 'Panel';
        this.saTools.push(this.getSprite(this.saToolsImages[2]));
        this.saTools[1].saImage = this.saToolsImages[2];
        this.saTools[1].name = 'StreamPoint';
        this.cross = this.getSprite("app/images/cross.png");
        this.cross.position.x = 200;
        this.cross.position.y = 200;
        this.cross.visible = false;
        var w = $("#drawBox").width();
        var h = $("#drawBox").height();
        this.renderer = this.saPixi.autoDetectRenderer(w, h, { antialias: false, transparent: false, resolution: 1 });
        document.getElementById("drawBox").appendChild(this.renderer.view);
        // this.saPixi.DOM.Setup(this.renderer,true);
        this.stage = new this.saPixi.Container();
        this.saRender();
    };
    CreateProjectPage.prototype.getSprite = function (path) {
        return new this.saPixi.Sprite(this.saPixi.loader.resources[path].texture);
    };
    CreateProjectPage.prototype.saUpdate = function () {
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
        console.log(oobj);
        var obj = this.getSprite(oobj.saImage);
        this.initializeProperties(obj);
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
        var inp = new _this_.saPixi.DOM.Sprite('<input type="text" placeholder="Name">', { x: 10, y: 10 });
        this.stage.addChild(inp);
        this.stage.addChild(obj);
    };
    CreateProjectPage.prototype.initializeProperties = function (obj) {
        //set default properties
        obj.anchor.x = 0.5;
        obj.anchor.y = 0.5;
        obj.position.x = 200 * Math.random();
        obj.position.y = 200;
        obj.interactive = true;
        //visible properties
        var name = new this.saPixi.Text('Process', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
        name.x = 20;
        name.y = 20;
        obj.addChild(name);
    };
    CreateProjectPage.prototype.onDelete = function (data) {
        console.log(data);
        data.stopPropagation();
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
    CreateProjectPage = __decorate([
        core_1.Component({
            templateUrl: 'app/project/create-project.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], CreateProjectPage);
    return CreateProjectPage;
}());
exports.CreateProjectPage = CreateProjectPage;
//# sourceMappingURL=create-project.component.js.map