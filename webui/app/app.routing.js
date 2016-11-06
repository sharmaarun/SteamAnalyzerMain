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
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var create_project_component_1 = require('./project/create-project.component');
var list_projects_component_1 = require('./project/list-projects.component');
var appRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    }, {
        path: 'editor',
        component: create_project_component_1.CreateProjectPage
    }, {
        path: 'editor/:name',
        component: create_project_component_1.CreateProjectPage
    }, {
        path: 'projects',
        component: list_projects_component_1.ListProjectsPage
    }, {
        path: '**',
        redirectTo: ''
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map