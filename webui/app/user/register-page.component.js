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
var router_1 = require('@angular/router');
var http_1 = require("@angular/http");
var commons_component_1 = require('../home/commons.component');
var RegisterPage = (function () {
    function RegisterPage(router, http) {
        this.router = router;
        this.http = http;
        this.title = "Register";
        this.headers = new http_1.Headers({ "Content-Type": "application/json" });
        this.user = { username: "", password: "", fName: "", lName: "" };
    }
    RegisterPage.prototype.register = function () {
        commons_component_1.Commons.loaderShow();
        if (this.user.username == "" || this.user.password == "" || this.user.fName == "" || this.user.lName == "") {
            commons_component_1.Commons.loaderDone("");
            commons_component_1.Commons.toast({ content: "Please fill all the fields!", timeout: 5000 });
            return;
        }
        this.http.post('/signup', this.user, this.headers).map(function (res) { return res.json(); }).subscribe(function (d) {
            console.log(d);
            if (d.status == "OK") {
                commons_component_1.Commons.setCookie("loggedin", "true");
                window.location.reload();
            }
        }, function (e) { commons_component_1.Commons.toast({ content: "Server Error occured!", timeout: 2000 }); }, function (s) {
            commons_component_1.Commons.toast({ content: "Registred successfully!!", timeout: 2000 });
        });
    };
    RegisterPage = __decorate([
        core_1.Component({
            templateUrl: 'app/user/register-page.component.html',
            providers: [http_1.HTTP_PROVIDERS, commons_component_1.Commons]
        }), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http])
    ], RegisterPage);
    return RegisterPage;
}());
exports.RegisterPage = RegisterPage;
//# sourceMappingURL=register-page.component.js.map