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

import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from "@angular/http";
import {Commons} from '../home/commons.component';
@Component({
    templateUrl: 'app/user/register-page.component.html',
    providers: [HTTP_PROVIDERS, Commons]
})

export class RegisterPage {
    title = "Register";
    headers = new Headers({ "Content-Type": "application/json" });
    user = { username: "", password: "", fName: "", lName: "" };
    constructor(public router: Router, public http: Http) {

    }

    public register() {
        Commons.loaderShow();
        if (this.user.username == "" || this.user.password == "" || this.user.fName == "" || this.user.lName == "") {
            Commons.loaderDone("");
            Commons.toast({ content: "Please fill all the fields!", timeout: 5000 });
            return;
        }
        this.http.post('/signup', this.user, this.headers).map(res => res.json()).subscribe(d => {
            console.log(d);
            if (d.status == "OK") {
                Commons.setCookie("loggedin", "true");
                window.location.reload();
            }
        }, e => { Commons.toast({content:"Server Error occured!", timeout:2000}); }, s => {
            Commons.toast({content:"Registred successfully!!", timeout:2000});
        });
    }

}
