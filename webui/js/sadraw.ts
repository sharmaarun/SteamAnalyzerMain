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
 
// export class saVertex {
//     position = {x:0,y:0}
//     public constructor(x,y) {
//         this.position.x = x;
//         this.position.y = y;
//     }
// }
// 
// export class saShape {
//     position = {x:0,y:0};
//     vertices:saVertex[];
//     
//     public addVertex(x,y) {
//         this.vertices.push(new saVertex(x,y));
//     }
//     
//     public assignVertices(vertices) {
//         this.vertices = vertices;
//     }
//     
//     public render() {
//          let v:saVertex[];
//          v = this.vertices;
//         for (var i = 0; i < this.vertices.length;i++) {
//             let x1 = v[i].position.x, x2=v[i<v.length-1?i+1:0].position.x;
//             let y1 = v[i].position.y, y2=v[i<v.length-1?i+1:0].position.y;
//             line(x1,y1,x2,y2);
//         }
//     }
// }

// 2D Object
//
//export class saObject2D {
//    position = {x:0,y:0};
//    shapes:saShape[];
//    public constructor() {
//        
//    }
//    public assignShape(shape) {
//        this.shapes.push(shape);
//    }
//    
//    public render() {
//        for (var i = 0; i < this.shapes.length;i++) {
//            this.shapes[i].render();
//        }
//    }
//}
//
//export class Scene {
//    objects:saObject2D[];
//    
//    public constructor() {
//        
//    }
//    
//    public render() {
//        for (var i = 0; i < this.objects.length;i++) {
//            this.objects[i].render();
//        }
//    }
//}
//
//export class SceneManager {
//    
//}

// let scene = new Scene();
//function setup(){
//   
//    let myObj = new saObject2D();
//    let vertices:saVertex[] = [new saVertex(0,0), new saVertex(0,80), new saVertex(80,80), new saVertex(80,0)];
//    let panelShape = new saShape();
//    panelShape.assignVertices(vertices);
//    myObj.assignShape(panelShape);
//    
//    scene.objects.push(myObj);
//    
//    
//}
//
//function draw() {
//    scene.render();
//}
 
 
