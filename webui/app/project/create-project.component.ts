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
    bgColor;



    // tools
    public saToolsImages = [
        "app/images/panel.png",
        "app/images/cross.png",
        "app/images/stream_point.png"
    ];
    public cross = {};
    public saTools = [];
    public saAllObjects = [];
    public saSelectedObject = {};


    //event flags
    dragMode = false;
    dragging = false;
    
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
        this.saTools.push(this.getSprite(this.saToolsImages[0]));
        this.saTools[0].saImage = this.saToolsImages[0];
        this.saTools[0].name = 'Panel';
        
        this.saTools.push(this.getSprite(this.saToolsImages[2]));
        this.saTools[1].saImage = this.saToolsImages[2];
        this.saTools[1].name = 'StreamPoint';
        
        this.cross = this.getSprite("app/images/cross.png");
        this.cross.position.x = 200;
        this.cross.position.y=200;
        this.cross.visible=false;
        
        var w = $("#drawBox").width();
        var h = $("#drawBox").height();
        this.renderer = this.saPixi.autoDetectRenderer(w, h, { antialias: false, transparent: false, resolution: 1 });
        document.getElementById("drawBox").appendChild(this.renderer.view);
        this.stage = new this.saPixi.Container();


        this.saRender();


    }
    
    public getSprite(path) {
        return new this.saPixi.Sprite(
            this.saPixi.loader.resources[path].texture
        );
    }
    
    public saUpdate() {
        
    }
    
    

    public saRender() {
        var _this_ = this;
            requestAnimationFrame(function(){_this_.saRender();});
        //update logic
        this.saUpdate();
        this.renderer.backgroundColor = this.bgColor;
        this.renderer.render(this.stage);
    }


    public addObject(oobj) {
        console.log(oobj);
        var obj = this.getSprite(oobj.saImage);
        obj.anchor.x = 0.5;
        obj.anchor.y = 0.5;
        obj.position.x = 200 * Math.random();
        obj.position.y = 200;
        obj.interactive = true;
        //setup event handler
        var _this_ =this;
        obj.mousedown = obj.touchstart = function(data){
            _this_.onSelect(data,_this_);
        };
        obj.mousemove = function(data){
            _this_.onClickDrag(data,_this_);
        };;
        obj.mouseup = function(data){
            _this_.onMouseUp(data,_this_);
        };;
        
        
        this.stage.addChild(obj);
      
    }
    
    public onDelete(data) {
        console.log(data);
        data.stopPropagation();
    }
    
    public onSelect(data,_this_){
        //basic handlers
        //remove object 
        
        console.log(_this_);
        _this_.saSelectedObject = data.target;
        _this_.dragging = false;
        _this_.dragMode = true;
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