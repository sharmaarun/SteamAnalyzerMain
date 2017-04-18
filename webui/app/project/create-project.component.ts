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
import {Commons} from '../home/commons.component';
@Component({
    templateUrl: 'app/project/create-project.component.html'
     providers: [HTTP_PROVIDERS]
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
    title = "Create Project"
    saPixi;
    renderer;
    stage;
    _zoomLevel = 1;
    bgColor;

    static __LOAD_ONCE_EDITOR = true;

    // tools
    public saToolsImages = [
        "app/images/panel.png",
        "app/images/stream_point.png",
        "app/images/db.png"
    ];
    public saControlsImages = [
        "app/images/cross.png",
        "app/images/edit.png",
        "app/images/hole.png"
    ];
    public saToolSprites = [
        "app/images/panel.json"
    ];
    public cross = {};
    public saTools = [];
    public saAllObjects = [];
    public saSelectedObject = {};
    public plugins = [];

    //objects

    topology = { name: 'Untitiled' + new Date().getMilliseconds(),displayName:"", stages: [], connections: [] };
    idCounter = 0;
    conIdCounter = 0;
    connections = [];
    _tmpConnection;
    _selectedHole;

    //event flags
    dragMode = false;
    dragging = false;
    connectMode = false;

    public _this_;
    public headers = new Headers({ 'Content-Type': 'application/json' });
    http;

    public constructor(public _http: Http, public route: ActivatedRoute) {
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
        setTimeout(function() {
            _this_.saSetup();
            CreateProjectPage.__LOAD_ONCE_EDITOR = false;
        }, 1000);

        var _this_ = this;
        this.http = this._http;
        //load plugins
        this._http.get('api/plugins', this.headers).map(response => response.json())
            .subscribe(p => { _this_.plugins = p; }, e => { console.log(e); }, s => { console.log(s); });


    }



    public saInit() {


    }

    public showStage() {
        console.log(this.stage);
    }

    public saSetup() {
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
                //                this.saTools[0].properties = [
                //                    { name: 'Type', type: 'text', defaultValue: 'KEYWORD_SEARCH', object: name, nv: '' },
                //                    { name: 'Keyword', type: 'text', defaultValue: '', object: name, nv: '' },
                //                ];
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


    }

    private stageZoom(e, d) {
        console.log(e);
        this._zoomLevel += (e.originalEvent.wheelDelta / 100);
        return false;
    }

    private stageMouseUp(d) {
        if (this.connectMode) {
            this.connectMode = false;
            this._tmpConnection = undefined;
        }
    }

    private stageMouseMove(d) {
        console.log("moving");

    }

    public getSprite(path) {
        var obj = new this.saPixi.Sprite(
            this.saPixi.loader.resources[path].texture
        );
        obj.anchor.x = 0.5;
        obj.anchor.y = 0.5;
        return obj;
    }

    public getSpriteResizable(path, _w, _h) {
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
        parent.addChild(parent.tl); parent.addChild(parent.tm); parent.addChild(parent.tr);
        parent.addChild(parent.ml); parent.addChild(parent.mm); parent.addChild(parent.mr);
        parent.addChild(parent.bl); parent.addChild(parent.bm); parent.addChild(parent.br);
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
    }



    public saUpdate() {
        //update connection curves
        this.connections.clear();
        if (this.connections.points) {
            for (let p of this.connections.points) {
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
            } else {
                this._tmpConnection = { s: this._selectedHole, e: { worldTransform: { tx: 0, ty: 0 } } };
                // console.log(this._selectedHole.worldTransform);
            }
        }

    }



    public saRender() {
        var _this_ = this;
        requestAnimationFrame(function() { _this_.saRender(); });
        //update logic
        this.saUpdate();
        this.renderer.backgroundColor = this.bgColor;
        this.renderer.render(this.stage);
    }

    public addConnection(source, target) {

    }


    public addObject(oobj) {
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
        obj.mousedown = obj.touchstart = function(data) {
            _this_.onSelect(data);
        };
        obj.mousemove = function(data) {
            _this_.onClickDrag(data, _this_);
        };;
        obj.mouseup = function(data) {
            _this_.onMouseUp(data, _this_);
        };;

        // var inp = new _this_.saPixi.DOM.Sprite('<input type="text" placeholder="Name">',{x:10,y:10});
        // this.stage.addChild(inp);

        this.stage.addChild(obj);
        console.log(oobj.tpItem + "<<");
        if(oobj.tpItem!=undefined)
        this.topology.stages[oobj.tpItem].stageChild = obj;
        console.log(obj);
        if (!this.preloadProject) { this.addObjToTopology(obj, oobj) };


    }

    private addObjToTopology(obj, oobj) {
        var tobj = {
            "id": obj._id,
            "type": oobj.plugin.type,
            "plugin": oobj.plugin.plugin
        }
        this.updateTopologyProperties(tobj, obj);
        this.topology.stages.push(tobj);
    }

    private showPropertiesEditor(obj) {
        this.saSelectedObject = obj;

        $("#propertiesEditor").modal("show");
    }

    private initializeControls(obj, oobj) {
        //remove control
        var remove = this.getSprite("app/images/cross.png");
        remove.x = (obj.width / 2);
        remove.y = -(obj.height / 2) + 10;
        remove.interactive = true;
        // console.log(remove);
        var _this_ = this;
        remove.mousedown = function(d) {
            _this_.stage.removeChild(obj);
            var p;
//            for (var i = 0; i < _this_.connections.points.length; i++) {
//                p = _this_.connections.points[i];
//                if (p.s.parent._id == obj._id || p.e.parent._id == obj._id) {
//                    _this_.connections.points.splice(i, 1);
//                    i--;
//                }
//            }
            var index1 = _this_.findItemIndex(_this_.connections.points,"s.parent._id",obj._id);
            var index2 = _this_.findItemIndex(_this_.connections.points,"e.parent._id",obj._id);
            
            if(index1!=undefined && index1!=null)_this_.connections.points.splice(index1, 1);
            if(index2!=undefined && index2!=null)_this_.connections.points.splice(index2, 1);
            
            setTimeout(function() {
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

        edit.mousedown = function(d) {
            _this_.showPropertiesEditor(obj);
            d.stopPropagation();
        };
        obj.addChild(edit);

        //initialize connection points
        if (oobj.plugin.type == 'DATABASE' || oobj.plugin.type == 'STREAM_STAGE') {
            _this_.addConnectionHoles(obj, false, false, true, false);
        } else {
            _this_.addConnectionHoles(obj, false, true, false, true);
        }

    }


    private addConnectionHoles(obj, top, right, bottom, left) {
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
            lhole.mouseup = function(d) {
                _this_.chMouseUp(d, lhole);
            };
            lhole.mousedown = function(d) {
                _this_.chMouseDown(d, lhole);
            }
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
            rhole.mouseup = function(d) {
                _this_.chMouseUp(d, rhole);
            };
            rhole.mousedown = function(d) {
                _this_.chMouseDown(d, rhole);
            }
            obj.addChild(rhole);
        } if (bottom) {
            //hole-r control
            var bhole = this.getSprite("app/images/hole.png");
            bhole.name = "bhole";
            bhole.anchor.x = 0.5;
            bhole.anchor.y = 0.5;
            bhole.x = 0;
            bhole.y = obj.height / 2;
            bhole.interactive = true;
            bhole.mouseup = function(d) {
                _this_.chMouseUp(d, bhole);
            };
            bhole.mousedown = function(d) {
                _this_.chMouseDown(d, bhole);
            }
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
            thole.mouseup = function(d) {
                _this_.chMouseUp(d, thole);
            };
            thole.mousedown = function(d) {
                _this_.chMouseDown(d, thole);
            }
            obj.addChild(thole);
        }
    }

    private chMouseUp(d, obj) {
        var _this_ = this;
        console.log(_this_.connectMode);
        if (_this_.connectMode) {
            if (obj.parent._id == _this_._selectedHole.parent._id) {
                console.log("Same parent! Not connecting.");
            } else {
                _this_._tmpConnection.e = obj;
                _this_.connections.points.push(_this_._tmpConnection);
                _this_.addConnectionToTopology(_this_._tmpConnection);


                _this_.connectMode = false;
                console.log("Connected.");
                _this_._tmpConnection =undefined;
            }
        } else {
            _this_.connectMode = true;
            _this_._selectedHole = obj;
        }
        d.stopPropagation();
    }

    private addConnectionToTopology(conn) {
        var _this_ = this;
        _this_.topology.connections.push({
            e: conn.e.parent._id,
            s: conn.s.parent._id,
            ehole: conn.e.name,
            shole: conn.s.name,
        });
    }

    private chMouseDown(d, obj) {
        d.stopPropagation();
    }

    private initializeProperties(obj, oobj) {
        //subcomponent propeties
        //set default properties
        // obj.anchor.x = 0.5;
        // obj.anchor.y = 0.5;
        oobj.pos = this.findItem(this.topology.stages,"id",obj._id);
        oobj.pos = obj.pos==undefined?undefined:oobj.pos.pos;
        obj.properties = oobj.properties == undefined ? [] : oobj.properties;
        obj.position.x = oobj.pos!=undefined?oobj.pos.x:200 * Math.random() + 30;
        obj.position.y = oobj.pos!=undefined?oobj.pos.y:200;
        
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
    }

    public updateProperties() {

        for (let inp of this.saSelectedObject.properties) {
            console.log(inp);
            inp.object={text:""};
            inp.object.text = inp.nv;
            for (let o of this.topology.stages) {
                if (o.id == this.saSelectedObject._id) {
                    this.updateTopologyProperties(o, this.saSelectedObject);
                }
            }
        }

    }

    public removeFromTopology(obj) {
        for (var i = 0; i < this.topology.stages.length; i++) {
            if (this.topology.stages[i].id == obj._id) {
                this.topology.stages.splice(i, 1);
                break;
            }
        }


    }
    
    

    public updateTopologyProperties(item, obj) {
        item.metadata = {};
        for (let p of obj.properties) {
            item.metadata[p.param] = p.nv;
        }
    }

    public highlightSelected() {
        if (this.saSelectedObject != undefined) {

        }
    }

    public onSelect(data) {
        this.saSelectedObject = data.target;
        this.dragging = false;
        this.dragMode = true;
    }

    public onClickDrag(data, _this_) {
        if (_this_.dragMode) {
            _this_.saSelectedObject.transform.position._x = data.data.global.x;
            _this_.saSelectedObject.transform.position._y = data.data.global.y;
            _this_.dragging = true;
        }
    }

    public onMouseUp(data, _this_) {
        if (!_this_.dragging) {
            _this_.cross.visible = true;
        } else {
            _this_.dragging = false;
            //update position of object in topology
            var stage = _this_.findItemIndex(_this_.topology.stages,"id",data.target._id);
            _this_.topology.stages[stage].pos = {x : data.target.transform.position._x, y: data.target.transform.position._y};
            
        }
        _this_.dragMode = false;
    }
    
    private trimTopology(tp) {
        for(var i=0;i<tp.stages.length;i++) {
            tp.stages[i].stageChild=undefined;
        }
    }
    public save() {
        Commons.loaderShow();
        //        this.topology.connections = this.connections.points;
        //fill up fixed props
        // remove all the unwanted properties before save
        this.trimTopology(this.topology);
        this.http.post('api/projects/save', { project: this.topology }, this.headers).map(response => response.json())
            .subscribe(d => {
                console.log(d);
                Commons.loaderDone();
            }, e => { console.log(e); }, s => { console.log(s); });


    }

    public updateDrawableProperties(item, o, cb) {

        for (var i = 0; i < o.properties.length; i++) {
            o.properties[i].nv = item.metadata[o.properties[i].param];
            o.properties.object={text:""};
        }

        cb(o);
    }

    private getTool(name) {
        for (var i = 0; i < this.saTools.length; i++) {
            if (name == this.saTools[i].plugin.name) {
                return this.saTools[i];
            }
        }
    }

    private drawTopology(tp) {
        var _this_ = this;
        for (var i = 0; i < tp.stages.length; i++) {
            var oobj = JSON.parse(JSON.stringify(this.getTool(tp.stages[i].plugin)));
            oobj.tpItem = i;
            if (oobj !== undefined && oobj !== null) {
                this.updateDrawableProperties(tp.stages[i], oobj, function(o) {
                    _this_.idCounter = tp.stages[i].id;
                    _this_.addObject(o);
                });


            }
        }
        //TODO: replace timeout
        setTimeout(function() {
            _this_.formatConnections(tp.connections);
        }, 1000);
    }

    private formatConnections(conn) {
        var _this_ = this;
        var s = {}, e = {};
        console.log(this.connections);
        for (let c of conn) {
            console.log("For conn : ");
            console.log(c);
            for (var i = 0; i < _this_.topology.stages.length; i++) {
                console.log("For stage : ");
                console.log(_this_.topology.stages[i].id);
                if (_this_.topology.stages[i].id == c.s) {
                    for (var j = 0; j < _this_.topology.stages[i].stageChild.children.length; j++) {
                        if (_this_.topology.stages[i].stageChild.children[j].name == c.shole) {
                            s = _this_.topology.stages[i].stageChild.children[j];
                        };
                    }
                }
                if (this.topology.stages[i].id == c.e) {
                    for (var j = 0; j < _this_.topology.stages[i].stageChild.children.length; j++) {
                        if (_this_.topology.stages[i].stageChild.children[j].name == c.ehole) {
                            e = _this_.topology.stages[i].stageChild.children[j];
                        };
                    }
                }
                
            }


            _this_.connections.points.push({
                s: s, e: e
            });
        }

    }

    public reload() {

        //get the project json
        this.http.post('/api/projects/json', { name: this.projectName }, this.headers).map(response => response.json())
            .subscribe(p => {
                console.log(p);
                this.topology = p;
                this.topology.name = this.projectName;
                this.preloadProject = true;
                //this.connections.points = this.topology.connections;
                this.drawTopology(this.topology);
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