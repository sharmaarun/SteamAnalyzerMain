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


import {Component} from '@angular/core';
import {HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {ActivatedRoute} from '@angular/router';
import {Commons, STAGE_TYPES, FilterPluginsPipe, MouseManager} from '../home/commons.component';

@Component({
    templateUrl: 'app/project/create-project.component.html',
    providers: [HTTP_PROVIDERS],
    pipes: [FilterPluginsPipe]
})

export class CreateProjectPage {

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.projectName = params['name']; // (+) converts string 'id' to a number
            this.preloadProject = true;
            // In a real app: dispatch action to load the details here.
        });
    }
    projectName = "";
    preloadProject = false;
    title = "Create Project";
    saLinker;
    saPixi;
    renderer;
    stage;
    _zoomLevel = 1;
    previousZoom = 1;
    bgColor;

    static __LOAD_ONCE_EDITOR = true;



    //objects
    plugins = [];
    selectedNode;
    topology = { name: 'project-' + Commons.getUUID(), displayName: "", stages: [], connections: [] };
    topologyCanvas = [];
    relevantNodeProps = [
        "id",
        "name",
        "plugin",
        "type",
        "x",
        "y"

    ];
    idCounter = 0;


    conIdCounter = 0;
    connections = [];
    _tmpConnection;
    _selectedHole;

    public suggestSchemaPropList = [], suggestSchemaArgs = [];

    //event flags
    dragMode = false;
    dragging = false;
    connectMode = false;

    public _this_;
    public headers = new Headers({ 'Content-Type': 'application/json' });
    http;

    public constructor(public _http: Http, public route: ActivatedRoute) {
        this._this_ = this;
        var _this_ = this;
        this.http = this._http;

        //start
        //1. load plugins
        this.loadPlugins();

        //setup topology
        setTimeout(function() {
            _this_.saSetup();
            CreateProjectPage.__LOAD_ONCE_EDITOR = false;
            $("#componentsBox .divider").mousedown(function(e) {
                _this_.startResize(e);
            });
            $("#componentsBox .divider").mouseup(function(e) {
                $("body").off('mousemove');
            });

        }, 1000);



    }

    //load plugins
    public loadPlugins() {
        var _this_ = this;
        this._http.get('api/plugins', this.headers).map(response => response.json())
            .subscribe(p => { _this_.plugins = p; }, e => { console.log(e); }, s => { console.log(s); });
    }



    public saInit() {


    }


    public startResize(e) {
        //text selection fix
        if (document.selection) {
            document.selection.empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        $("body").mousemove(function(ev) {
            var l = parseInt($("body").width()) - ev.pageX - 3;
            $("#componentsBox").css("right", l + "px");
            var r = parseInt(ev.pageX + 3);
            $("#drawBox").css("left", r + "px");
        });




    }

    public showStage() {
//        console.log(this.stage);
    }

    public saSetup() {
        //if (!CreateProjectPage.__LOAD_ONCE_EDITOR) return false;
        var w = $("#drawBox").width();
        var h = $("#drawBox").height();

        // adding new canvas node editor - linker js
        this.saLinker = $("#drawBox").linker();


        //load the project
        if (this.preloadProject) {
            this.reload();
        }

    }

    public suggestSchemaProps(val) {
        var _this_ = this;
        if (val == undefined) return;
        val = val.split(",")[val.split(",").length - 1].trim();
        var args = Commons.clone(_this_.suggestSchemaPropList);
        var tmpArr = [];
        for(let a of Object.keys(args)) {
            var arr = args[a].values==undefined?[]:args[a].values;
            for(let it of arr){
                if(it.indexOf(val)!==-1) {
                    tmpArr.push({from:args[a].stage,value:it});
                }
            }
//            tmpArr = tmpArr.concat(arr);
        }
        _this_.suggestSchemaArgs = tmpArr;

    }

    public zoom(steps) {
        if (steps > 10) steps = 10;
        if (steps < -10) steps = -10;
        var czoom = parseFloat($('.linker_board').css("zoom"));
        $('.linker_board').animate({ zoom: czoom + steps / 100 }, 400);
        this.previousZoom = parseFloat($(".linker_board").css("zoom"));
    }

    public resetZoom() {
        if (parseFloat($(".linker_board").css("zoom")) != 1.0) {
            $(".linker_board").css("zoom", 1);
        }
    }

    public setZoom(val) {
        $(".linker_board").css("zoom", val);
    }


    /* methods related to canvas area*/

    //Adds plugin as component to the canvas area
    public addObject(plug) {
        var plugin = Commons.clone(plug);
//        console.log(plugin);
        //increment the id counter
        this.idCounter += 1;
        //1. create node object
        let n = this.addStage({ plugin: plugin, name: plugin.name, type: Commons.getEnumFromString(STAGE_TYPES, plugin.type), x: 150 });
        //2. add node object to topology
        //        this.addObjectToTopology(n);

    }

    public addStage(stage) {

        //1. create linkerjs node 
        var n = this.createNode(stage);

        this.addObjectToTopology(n);
        return n;


    }

    //create linkerjs node based on
    //options :
    //{type, x location, y location}
    public createNode(stage) {
        var _this_ = this;
//        console.log("adding node");
//        console.log(stage);
        let o = {
            id: this.idCounter,
            type: STAGE_TYPES.UNDEFINED_STAGE,
            name: "UNDEFINED",
            x: $(".linker_container").scrollLeft() + parseInt(Math.random() * 100),
            y: $(".linker_container").scrollTop() + parseInt(Math.random() * 100)
        };
        let node = {};

        o = Commons.extend(o, stage);

        //validate the params
        if (!this.validateNode(o)) {
            console.log("Validation failed for new node");
            return {};
        }
        //create node
        node = this.saLinker.node(o);

        //create connectors
        let connectorIn, connectorOut;

        //based on type, create the connectors

        for (let pi of o.plugin.inputs == undefined ? [] : o.plugin.inputs) {
            connectorIn = node.input(pi.id, pi.name);
        }

        for (let po of o.plugin.outputs == undefined ? [] : o.plugin.outputs) {
            connectorOut = node.output(po.id, po.name);
            connectorOut.beforeRemove = function(index) {
//                console.log(this);

                _this_.updateConnections(this.node);
            }
            connectorOut.onConnect = function(input) {
//                input.node.plugin.schema = Commons.clone(o.plugin.schema);
                //                console.log(input);
            }
        }

        //add the connections to connections array
        this.connections.push({
            id: node.id,
            in: connectorIn,
            out: connectorOut
        });

        //also push the schema to global schema properties suggetion list
        if(o.plugin.schema!=undefined && o.plugin.schema.length>0)
        _this_.suggestSchemaPropList.push({ stage: o.name, values: o.plugin.schema});




        //event handlers
        this.attachEvents(o, node);

//        console.log(node);
        console.log("Created new node : " + o.name);
        return node;
    }

    private addObjectToTopology(obj) {
        var _this_ = this;
        _this_.topologyCanvas.push(obj);
//        console.log(_this_.topologyCanvas);
    }

    private removeObjectFromTopology(obj) {
        var _this_ = this;
        for (var i = 0; i < _this_.topologyCanvas.length; i++) {
            let stage = _this_.topologyCanvas[i];

            if (stage.id == obj.id) {
//                console.log(stage.id + " / " + obj.id);
                _this_.topologyCanvas.splice(i, 1);
                break;
            }
        }
    }

    public setSchema(node) {
        if (node == undefined) return;


    }

    /*
     * Updates the connection endpoints related to this node/obj
     */
    private updateConnections(s) {
        //find all the outgoing connections
        if (s.hasOwnProperty("pathsOut")) {
            let p = Object.keys(s.pathsOut)[0];

            if (s.pathsOut[p].length <= 0) return;

            for (var ii = 0; ii < s.pathsOut[p].length; ii++) {
                var to = {
                    id: s.pathsOut[p][ii][2]["id"],
                    name: s.pathsOut[p][ii][2]["name"],
                    node: {
                        id: s.pathsOut[p][ii][2]["node"]["id"],
                        name: s.pathsOut[p][ii][2]["node"]["name"],
                    }
                }
                //search for to-endpoint id in all stages
                let found = false;
                let n = {};
//                console.log(to);
                if (to.node.id != undefined && to.node.id != "" && to.node.id != null) {
                    for (let ss of this.topologyCanvas) {
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
                        //                    var arr = ss.pathsIn[Object.keys(ss.pathsIn)[0]];

                    }
                } else {
                    console.log("no connection found!");
                }
            }

        }
    }

    /*
     * get type of stage from string
     */
    public getStageType(val) {
        if (val)
     }


    /*
     *Attach events to nodes
     *events: drag, remove and settings 
     */
    private attachEvents(o, node) {
        let _this_ = this;

        //drag event
        node.onDrag = function(x, y) {
            this.x = x;
            this.y = y;
        };

        //settings event
        node.onSetting = function() {
            _this_.showProperties(this);
        }

        // remove event
        node.onRemove = function() {
            _this_.updateConnections(this);
//            console.log(_this_.topologyCanvas);
            _this_.removeObjectFromTopology(this);
        }
    }

    private updateIdCounter() {
        this.idCounter += 1;
    }

    private validateNode(options) {
        let invalids = 0;
        //check for existing id
        if (options.id != undefined) {
            if (options.id < this.idCounter) {
                invalids += 1;
            }
        }

        return invalids > 0 ? false : true;

    }



    /*
     * Update/Edit properties of each stage
     * 
     */

    public showProperties(node) {
        let _this_ = this;
        _this_.selectedNode = node;
//        console.log(_this_.selectedNode);
        $("#propertiesEditor").modal("show");
        _this_.suggestSchemaArgs = [];
    }


    public stripUnwantedNodeProperties() {

        let stages = [];
        for (let s of this.topologyCanvas) {
            var ns = {
                pathsIn: {},
                pathsOut: {},
                inputs: [],
                outputs: []
            };
            for (let prop of this.relevantNodeProps) {
                ns[prop] = s[prop];
            }
            if (s.hasOwnProperty("pathsIn")) {
                ns.pathsIn = { p: {} };
                for (let p of Object.keys(s.pathsIn)) {
                    if (s.pathsIn[p].length <= 0) break;
                    var from = {
                        id: s.pathsIn[p][0][1]["id"],
                        name: s.pathsIn[p][0][1]["name"],
                        node: {
                            id: s.pathsIn[p][0][1]["node"]["id"],
                            name: s.pathsIn[p][0][1]["node"]["name"],
                        }
                    }
                    var to = {
                        id: s.pathsIn[p][0][2]["id"],
                        name: s.pathsIn[p][0][2]["name"],
                        node: {
                            id: s.pathsIn[p][0][2]["node"]["id"],
                            name: s.pathsIn[p][0][2]["node"]["name"],
                        }
                    }
                    ns.pathsIn[p] = { from: from, to: to };


                }
            }
            if (s.hasOwnProperty("pathsOut")) {
                for (let p of Object.keys(s.pathsOut)) {
                    if (s.pathsOut[p].length <= 0) break;
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
                        }
                        var to = {
                            id: s.pathsOut[p][nsi][2]["id"],
                            name: s.pathsOut[p][nsi][2]["name"],
                            node: {
                                id: s.pathsOut[p][nsi][2]["node"]["id"],
                                name: s.pathsOut[p][nsi][2]["node"]["name"],
                            }
                        }

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
                    }
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
                    }
                }
            }
            stages.push(ns);
        }

        //cyclic structure fix
        //for key pathsIn

        return stages;
    }

    public preloadStages(topology) {
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
            if (outs == undefined) continue;
            for (let path of outs) {

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
                if (conn1 == undefined || conn2 == undefined) continue;
//                console.log(conn1);
//                console.log(conn2);
//                conn2.node.plugin.schema = Commons.clone(conn1.node.plugin.schema);
                conn1.connect(conn2);

            }


        }
    }


    public save() {
        Commons.loaderShow();
        //first strip unwanted data from topology
        var tmp = Commons.clone(this.topology);
        tmp.stages = this.stripUnwantedNodeProperties();
        this.http.post('api/projects/save', { project: tmp }, this.headers).map(response => response.json())
            .subscribe(d => {
                Commons.loaderDone();
            }, e => { console.log(e); }, s => { console.log(s); });


    }

    public reload() {

        //get the project json
        this.http.post('/api/projects/json', { name: this.projectName }, this.headers).map(response => response.json())
            .subscribe(p => {
//                console.log(p);
                this.topology = p;
                this.topology.name = this.projectName;
                this.preloadProject = true;
                this.preloadStages(p);
                //this.connections.points = this.topology.connections;
                this.preloadProject = false;
            }, e => { console.log(e); }, s => { console.log(s); });


    }

    public compile() {
        Commons.loaderShow();
        this.http.post('/api/projects/compile', { name: this.projectName }, this.headers).map(response => response.json())
            .subscribe(p => {
                if (p.output !== undefined && p.output !== null && p.output !== "") {
                    Commons.loaderDone(p.output);
                } else
                    if (p.error !== undefined && p.error !== null && p.error !== "") {
                        Commons.loaderDone(p.error);
                    } else {
                        Commons.loaderDone(p.msg);
                    }


            }, e => {
                Commons.loaderDone(e);
            }, s => { console.log(s); });

    }

    public run() {
        Commons.toast({ content: "Can not run right now. Execution engine seems to be not responding.<br/> Try again later!", timeout: 5000, htmlAllowed: true });
    }

    private findItem(arr, attr, val) {
        var attrs = attr.split('.');
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            for (var j = 0; j < attrs.length; j++) {
                if (obj == undefined) break;
                obj = obj[attrs[j]];
                if (j == attrs.length - 1 && obj == val) { return arr[i]; }
            }
        }

    }
    private findItemIndex(arr, attr, val) {
        var attrs = attr.split('.');
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            for (var j = 0; j < attrs.length; j++) {
                if (obj == undefined) break;
                obj = obj[attrs[j]];
                if (j == attrs.length - 1 && obj == val) { return i; }
            }
        }

    }

}