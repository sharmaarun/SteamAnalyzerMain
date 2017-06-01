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
    CreateProjectPage.prototype.showStage = function () {
        console.log(this.stage);
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
        console.log(plugin);
        //increment the id counter
        this.idCounter += 1;
        //1. create node object
        var n = this.addStage({ plugin: plugin, name: plugin.name, type: commons_component_1.STAGE_TYPES.STREAM_STAGE, x: 150 });
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
        console.log("adding node");
        console.log(stage);
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
        }
        //add the connections to connections array
        this.connections.push({
            id: node.id,
            in: connectorIn,
            out: connectorOut
        });
        //event handlers
        this.attachEvents(o, node);
        console.log(node);
        console.log("Created new node with options : " + o);
        return node;
    };
    CreateProjectPage.prototype.addObjectToTopology = function (obj) {
        var _this_ = this;
        _this_.topologyCanvas.push(obj);
    };
    CreateProjectPage.prototype.removeObjectFromTopology = function (obj) {
        var _this_ = this;
        for (var i = 0; i < _this_.topologyCanvas.length; i++) {
            var stage = _this_.topologyCanvas[i];
            if (stage.id == obj.id) {
                console.log(stage.id + " / " + obj.id);
                _this_.topologyCanvas.splice(i, 1);
                break;
            }
        }
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
        console.log(_this_.selectedNode);
        $("#propertiesEditor").modal("show");
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
                    var from = {
                        id: s.pathsOut[p][0][1]["id"],
                        name: s.pathsOut[p][0][1]["name"],
                        node: {
                            id: s.pathsOut[p][0][1]["node"]["id"],
                            name: s.pathsOut[p][0][1]["node"]["name"],
                        }
                    };
                    var to = {
                        id: s.pathsOut[p][0][2]["id"],
                        name: s.pathsOut[p][0][2]["name"],
                        node: {
                            id: s.pathsOut[p][0][2]["node"]["id"],
                            name: s.pathsOut[p][0][2]["node"]["name"],
                        }
                    };
                    ns.pathsOut[p] = { from: from, to: to };
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
            var outs = s.pathsOut;
            var conn1, conn2;
            for (var _i = 0, _a = Object.keys(outs); _i < _a.length; _i++) {
                var k = _a[_i];
                var path = outs[k];
                console.log(path);
                if (path.length <= 0)
                    continue;
                for (var j = 0; j < this.connections.length; j++) {
                    var con = this.connections[j];
                    if (path.from.node.id == con.id) {
                        conn1 = con.out;
                    }
                    if (path.to.node.id == con.id) {
                        conn2 = con.in;
                    }
                }
            }
            console.log("Connecting : ");
            if (conn1 == undefined || conn2 == undefined)
                continue;
            //            console.log(conn1.name);
            //            console.log(conn2.name);
            conn1.connect(conn2);
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
            console.log(p);
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
            providers: [http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.ActivatedRoute])
    ], CreateProjectPage);
    return CreateProjectPage;
}());
exports.CreateProjectPage = CreateProjectPage;
//# sourceMappingURL=create-project.component.js.map