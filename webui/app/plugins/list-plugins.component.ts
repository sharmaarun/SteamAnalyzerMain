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
import {Commons, FilterPropsPipe} from '../home/commons.component';
@Component({
    templateUrl: 'app/plugins/list-plugins.component.html',
     providers: [HTTP_PROVIDERS],
     pipes: [FilterPropsPipe]
})

export class ListPluginsPage {
    title = "List Plugins"
    public plugins = [];
    public selectedPlugin = {};
    headers = new Headers({ 'Content-Type': 'application/json' });

    public constructor(public http: Http) {

        //load the plugins


        this.refreshPluginsList();

    }

    private refreshPluginsList() {
        //fetch projects 
        this.http.get('/api/plugins', this.headers).map(res => res.json()).subscribe(
            d => {
                console.log(this.plugins);
                this.plugins = d;
                console.log(this.plugins);
            }, e => {
                console.log("Cound not fetch projects list!");
            }, s => {
                console.log("Fetched Projects!");
            }
        );
    }

    public showInfo(p) {
        this.selectedPlugin = p;
        $("#infoViewer").modal("show");
    }

    public remove(p) {
        var confirm = window.confirm("Continue with plugin removal?");
        if(!confirm) return;
        Commons.loaderShow();
        var action;
        this.http.post('/api/plugins/remove', { plugin: p }, this.headers).map(res => res.json()).subscribe(
            d => {
                Commons.loaderDone("");
                action =Commons.toast({ content: "Removed Plugin " + p.name + " ..." });

            }, e => {
                action =Commons.toast({ content: "Cound not remove plugin!", timeout:3000});
                Commons.loaderDone("");
                console.log("");
            }, s => {
                action =Commons.toast({ content: "Done.", timeout:1000});
                Commons.loaderDone("");
                console.log("Fetched Projects!");
            }
        );
    }

}