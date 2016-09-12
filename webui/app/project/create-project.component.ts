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

 @Component({
     templateUrl: 'app/project/create-project.component.html'
 })

 export class CreateProjectPage {
     title = "Create Project"
     saPixi;
     renderer;
     stage;
     _zoomLevel=1;
     bgColor;



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

    //objects
    connections=[];
    _tmpConnection;
    _selectedHole;
    //event flags
    dragMode = false;
    dragging = false;
    connectMode = false;
    
    public _this_;

    public constructor() {
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
        .add(this.saControlsImages)
        .add(this.saToolSprites)
        .load(this.saInit);


        var _this_ = this;
        setTimeout(function() {
            _this_.saSetup();

        }, 1000);
    }

    public saInit() {
        var _this_ = this;
        
    }
    public saSetup() {
        //once all tool images loaded, start setup
        this.saTools.push({_id:0});
        this.saTools[0].saImage = this.saToolSprites[0];
        this.saTools[0].name = 'Panel';
        this.saTools[0].resizable = true;
        this.saTools[0].size = {w:200,h:250};
        this.saTools[0].size = {w:200,h:250};
        this.saTools[0].properties = [
        {name:'Type', type:'text',defaultValue: 'KEYWORD_SEARCH', object:name, nv:''},
        {name:'Keyword', type:'text',defaultValue: '', object:name, nv:''},
        ];
        
        this.saTools.push({_id:1});
        this.saTools[1].saImage = this.saToolsImages[1];
        this.saTools[1].name = 'StreamPoint';
        this.saTools[1].resizable = false;
        this.saTools[1].size = {w:100,h:100};

        this.saTools.push({_id:2});
        this.saTools[2].saImage = this.saToolsImages[2];
        this.saTools[2].name = 'DataBase';
        this.saTools[2].resizable = false;
        this.saTools[2].size = {w:100,h:100};
        
        
        var w = $("#drawBox").width();
        var h = $("#drawBox").height();
        this.renderer = this.saPixi.autoDetectRenderer(w, h, { antialias: true, transparent: false, resolution: 1 });
        document.getElementById("drawBox").appendChild(this.renderer.view);
        $("#drawBox").bind('mousewheel',this.stageZoom);
        // this.saPixi.DOM.Setup(this.renderer,true);
        this.stage = new this.saPixi.Container();


        this.connections = new this.saPixi.Graphics();
        this.connections.points=[];
        // this.connections.points.push({x1:0,y1:0,x2:100,y2:100});
        // this.connections.points.push({x:100,y:100});
        // this.connections.push(gfx);

        this.stage.addChild(this.connections);
        this.stage.mouseup = this.stageMouseUp;
        this.stage.mousemove = this.stageMouseMove;
        this.saRender();


    }

    private stageZoom(e,d) {
        console.log(e);
        this._zoomLevel+=(e.originalEvent.wheelDelta/100);
        return false;
    }

    private stageMouseUp(d) {
        if(this.connectMode) {
            this.connectMode=false;
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
        obj.anchor.x=0.5;
        obj.anchor.y=0.5;
        return obj;
    }

    public getSpriteResizable(path,_w,_h) {
        var parent = new this.saPixi.Container();
        parent.width=_w;
        parent.height=_h;
        parent.tl = new this.saPixi.Sprite.fromFrame("tl");
        parent.tm = new this.saPixi.Sprite.fromFrame("tm");
        parent.tr = new this.saPixi.Sprite.fromFrame("tr");
        parent.ml = new this.saPixi.Sprite.fromFrame("ml");
        parent.mm = new this.saPixi.Sprite.fromFrame("mm");
        parent.mr = new this.saPixi.Sprite.fromFrame("mr");
        parent.bl = new this.saPixi.Sprite.fromFrame("bl");
        parent.bm = new this.saPixi.Sprite.fromFrame("bm");
        parent.br = new this.saPixi.Sprite.fromFrame("br");
        parent.tl.anchor.x=parent.tm.anchor.x=parent.tr.anchor.x=parent.ml.anchor.x=parent.mm.anchor.x=parent.mr.anchor.x=parent.bl.anchor.x=parent.bm.anchor.x=parent.br.anchor.x=0.5;
        parent.tl.anchor.y=parent.tm.anchor.y=parent.tr.anchor.y=parent.ml.anchor.y=parent.mm.anchor.y=parent.mr.anchor.y=parent.bl.anchor.y=parent.bm.anchor.y=parent.br.anchor.y=0.5;
        // parent.pivot.x=0.5;
        // parent.pivot.y=0.5;
        parent.addChild(parent.tl);parent.addChild(parent.tm);parent.addChild(parent.tr);
        parent.addChild(parent.ml);parent.addChild(parent.mm);parent.addChild(parent.mr);
        parent.addChild(parent.bl);parent.addChild(parent.bm);parent.addChild(parent.br);
        // console.log(tl.height);
        // 
        // tl.x=0;tl.y=0;
        // ml.x=0;
        parent.tl.x=parent.ml.x=parent.bl.x=-(_w/2) + (parent.tl.width/2);
        parent.tl.y=parent.tm.y=parent.tr.y=-(_h/2) + (parent.tl.height/2);
        parent.ml.y=parent.mm.y=parent.mr.y=0;
        parent.bl.y=parent.bm.y=parent.br.y=(_h/2) - (parent.bl.height/2);
        parent.tm.x=parent.mm.x=parent.bm.x=0;
        parent.tr.x=parent.mr.x=parent.br.x=(_w/2) - (parent.tr.width/2);

        parent.ml.height = parent.mm.height= parent.mr.height = _h - (parent.ml.height*2);
        parent.tm.width = parent.mm.width = parent.bm.width = _w - (parent.tl.width*2);
        parent._resizable=true;
        return parent;
    }
    
    public saUpdate() {
        //update connection curves
        this.connections.clear();
        for(let p of this.connections.points) {
            // p.clear();
            this.connections.lineStyle(4,0x000000,1);
            var ex = p.e.worldTransform.tx, ey=p.e.worldTransform.ty;
            var sx = p.s.worldTransform.tx, sy = p.s.worldTransform.ty;
            this.connections.moveTo(sx,sy);
            this.connections.bezierCurveTo(sx+50,sy+50,ex-50,ey,ex,ey);
        }

        if(this._tmpConnection!=undefined) {
            this.connections.lineStyle(4,0xCCCCCC,0.5);
            var ex = this._tmpConnection.e.worldTransform.tx, ey=this._tmpConnection.e.worldTransform.ty;
            var sx = this._tmpConnection.s.worldTransform.tx, sy = this._tmpConnection.s.worldTransform.ty;
            this.connections.moveTo(sx,sy);
            this.connections.bezierCurveTo(sx+50,sy+50,ex-50,ey,ex,ey);
        }



        //logic
        //zoom logic
        this.stage.scale.x=this.stage.scale.y=this._zoomLevel;

        //connection point logic
        if(this.connectMode) {
            if(this._tmpConnection!=undefined) {
                this._tmpConnection.e.worldTransform.tx = this.renderer.plugins.interaction.mouse.global.x;
                this._tmpConnection.e.worldTransform.ty = this.renderer.plugins.interaction.mouse.global.y;
            } else {
                this._tmpConnection = {s:this._selectedHole,e:{worldTransform:{tx:0,ty:0}}};
                // console.log(this._selectedHole.worldTransform);
            }
        }

    }
    
    

    public saRender() {
        var _this_ = this;
        requestAnimationFrame(function(){_this_.saRender();});
        //update logic
        this.saUpdate();
        this.renderer.backgroundColor = this.bgColor;
        this.renderer.render(this.stage);
    }
    
    public addConnection(source,target) {

    }


    public addObject(oobj) {
        // console.log(oobj);
        var obj = oobj.resizable?this.getSpriteResizable(oobj.saImage,oobj.size.w,oobj.size.h):this.getSprite(oobj.saImage);
        obj.toolName = oobj.name;
        //initialize visible/private properties
        this.initializeProperties(obj,oobj);
        //initialize controls
        this.initializeControls(obj,oobj);

        //setup event handler
        var _this_ =this;
        obj.mousedown = obj.touchstart = function(data){
            _this_.onSelect(data);
        };
        obj.mousemove = function(data){
            _this_.onClickDrag(data,_this_);
        };;
        obj.mouseup = function(data){
            _this_.onMouseUp(data,_this_);
        };;
        
        // var inp = new _this_.saPixi.DOM.Sprite('<input type="text" placeholder="Name">',{x:10,y:10});
        // this.stage.addChild(inp);
        this.stage.addChild(obj);

    }

    private showPropertiesEditor(obj) {
        this.saSelectedObject = obj;
        $("#propertiesEditor").modal("show");
    }

    private initializeControls(obj,oobj) {
        //remove control
        var remove = this.getSprite("app/images/cross.png");
        remove.x = (obj.width/2);
        remove.y = -(obj.height/2)+10;
        remove.interactive=true;
        // console.log(remove);
        var _this_ = this;
        remove.mousedown = function(d){
            _this_.stage.removeChild(obj);
            var p;
            for(var i=0;i<_this_.connections.points.length;i++) {
                p = _this_.connections.points[i];
                if(p.s.parent._id==obj._id || p.e.parent._id==obj._id) {
                    _this_.connections.points.splice(i,1);
                    i--;
                }
            }
            setTimeout(function(){
            obj.destroy({children:true});    
            },1000);
            
            // delete this;
            d.stopPropagation();
        };
        obj.addChild(remove);

        //edit control
        var edit = this.getSprite("app/images/edit.png");
        edit.x = (obj.width/2) - 20;
        edit.y = -(obj.height/2) + 10;
        edit.interactive=true;
        // console.log(remove);
        
        edit.mousedown = function(d){
            _this_.showPropertiesEditor(obj);
            d.stopPropagation();
        };
        obj.addChild(edit);

        //initialize connection points
        if(obj.toolName=='DataBase') {
            _this_.addConnectionHoles(obj,false,false,true,false);
        } else {
            _this_.addConnectionHoles(obj,false,true,false,true);
        }
        
    }

    private addConnectionHoles(obj,top,right,bottom,left) {
        var _this_ = this;
        if(left){
            //hole-l control
            var lhole = this.getSprite("app/images/hole.png");
            lhole.anchor.x=0.5;
            lhole.anchor.y=0.5;
            lhole.x =  -(obj.width/2);
            lhole.y = 0;
            lhole.interactive=true;
            lhole.mouseup = function(d){
                _this_.chMouseUp(d,lhole);
            };
            lhole.mousedown = function(d) {
                _this_.chMouseDown(d,lhole);
            }
            obj.addChild(lhole);
        }
        if(right){
            //hole-r control
            var rhole = this.getSprite("app/images/hole.png");
            rhole.anchor.x=0.5;
            rhole.anchor.y=0.5;
            rhole.x =  (obj.width/2);
            rhole.y = 0;
            rhole.interactive=true;
            rhole.mouseup = function(d){
                _this_.chMouseUp(d,rhole);
            };
            rhole.mousedown = function(d) {
                _this_.chMouseDown(d,rhole);
            }
            obj.addChild(rhole);
        } if(bottom) {
            //hole-r control
            var bhole = this.getSprite("app/images/hole.png");
            bhole.anchor.x=0.5;
            bhole.anchor.y=0.5;
            bhole.x =  0;
            bhole.y = obj.height/2;
            bhole.interactive=true;
            bhole.mouseup = function(d){
                _this_.chMouseUp(d,bhole);
            };
            bhole.mousedown = function(d) {
                _this_.chMouseDown(d,bhole);
            }
            obj.addChild(bhole);
        }
        if(top) {
            //hole-r control
            var bhole = this.getSprite("app/images/hole.png");
            bhole.anchor.x=0.5;
            bhole.anchor.y=0.5;
            bhole.x =  0;
            bhole.y = -obj.height/2;
            bhole.interactive=true;
            bhole.mouseup = function(d){
                _this_.chMouseUp(d,bhole);
            };
            bhole.mousedown = function(d) {
                _this_.chMouseDown(d,bhole);
            }
            obj.addChild(bhole);
        }
    }

    private chMouseUp(d,obj) {
        var _this_ = this;
        if(_this_.connectMode){
                if(obj.parent._id==_this_._selectedHole.parent._id) {
                    console.log("same");
                } else {
                    _this_._tmpConnection.e=obj;
                    _this_.connections.points.push(_this_._tmpConnection);
                    _this_._tmpConnection = undefined;
                    _this_.connectMode=false;
                }
            } else {
                _this_.connectMode=true;
                _this_._selectedHole = obj;
            }
            d.stopPropagation();
    }

    private chMouseDown(d,obj) {
        d.stopPropagation();
    }

    private initializeProperties(obj,oobj) {
        //subcomponent propeties
        //set default properties
        // obj.anchor.x = 0.5;
        // obj.anchor.y = 0.5;
        obj.properties=oobj.properties==undefined?[]:oobj.properties;
        obj.position.x = 200 * Math.random();
        obj.position.y = 200;
        obj.interactive = true;
        obj._id = new Date().getMilliseconds();
        //visible properties
        

        var _elementNum=2;
        for(var k of obj.properties) {
            var kn = new this.saPixi.Text(k.name+": ",{fontFamily : 'Arial', fontSize: 12, fill : 0xFFFFFF, align : 'left', wordWrap:true});

            kn.x=-(obj.width/2) + 20;
            kn.y=-(obj.height/2) + (20*_elementNum);

            var kv = new this.saPixi.Text(k.defaultValue,{fontFamily : 'Arial', fontSize: 12, fill : 0xFFFFFF, align : 'left', wordWrap:true});

            kv.x=-(obj.width/2) + 20 + kn.width+20;
            kv.y=-(obj.height/2) + (20*_elementNum);
            obj.addChild(kn);
            obj.addChild(kv);
            _elementNum+=1;

            k.object = kv;
            k.nv = kv.text;
        }

        //name
        var name = null;
        name = new this.saPixi.Text(obj.toolName,{fontFamily : 'Arial', fontSize: 12, fill : 0xFFFFFF, align : 'left', wordWrap:true});
        
            name.x=-(obj.width/2) + 20;
            name.y=-(obj.height/2) + 20;

        obj.properties.push({name:'Name', type:'text', object:name, nv:name.text});
        obj.addChild(name);
    }

    public updateProperties() {
        for(let inp of this.saSelectedObject.properties) {
            inp.object.text=inp.nv;
        }
    }

    public highlightSelected() {
        if(this.saSelectedObject!=undefined) {

        }
    }
    
    public onSelect(data){
        this.saSelectedObject = data.target;
        this.dragging = false;
        this.dragMode = true;
    }
    
    public onClickDrag(data,_this_) {
        if(_this_.dragMode) {
            _this_.saSelectedObject.transform.position._x = data.data.global.x;
            _this_.saSelectedObject.transform.position._y = data.data.global.y;
            _this_.dragging = true;
        }
    }
    
    public onMouseUp(data,_this_) {
        if(!_this_.dragging) {
            _this_.cross.visible=true;
        } else {
            _this_.dragging=false;

        }
        _this_.dragMode = false;
    }

}