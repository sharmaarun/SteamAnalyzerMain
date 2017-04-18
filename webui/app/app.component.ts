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
import { FORM_DIRECTIVES } from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector : 'my-app',
    templateUrl: './app/app.component.html',
    directives: [FORM_DIRECTIVES]
})

export class AppComponent {
    title = 'THS';
    loggedIn = false;
    constructor(public router:Router) {
        
        if(requestedURL!==undefined && requestedURL!=="") {
            this.router.navigate([requestedURL]);
        }
        
        if(document.cookie.match("loggedin=true")!=null) {
            this.loggedIn = true;
        }
            
    }
    
    public logout() {
        document.cookie="";
        window.location.reload();
    }
}