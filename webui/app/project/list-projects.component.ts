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
@Component({
    templateUrl: 'app/project/list-projects.component.html'
     providers: [HTTP_PROVIDERS]
})

export class ListProjectsPage {
    title = "List Projects"
    public projects = [];
    headers = new Headers({ 'Content-Type': 'application/json' });
    
        public constructor(public http:Http) {
        
        //fetch projects 
        http.get('/api/projects',this.headers).map(res=>res.json()).subscribe(
        d=>{
            console.log(this.projects);
            this.projects = d;
            console.log(this.projects);
        },e=>{
            console.log("Cound not fetch projects list!");
        },s=>{
            console.log("Fetched Projects!");
        }
        );
        
    }

}