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


import {Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {CreateProjectPage} from './project/create-project.component';
import {ListProjectsPage} from './project/list-projects.component';
import {PasswordResetPage} from './user/password-reset.component';
import {RegisterPage} from './user/register-page.component';
import {ListPluginsPage} from './plugins/list-plugins.component';
import {ReportPage} from './reports/report.component';
const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    }, {
        path:  'editor',
        component: CreateProjectPage
    },{
        path:  'editor/:name',
        component: CreateProjectPage
    },{
        path:  'projects',
        component: ListProjectsPage
    },{
        path:  'resetpass',
        component: PasswordResetPage
    },{
        path:  'register',
        component: RegisterPage
    },{
        path:  'plugins',
        component: ListPluginsPage
    },{
        path:  'report/:name',
        component: ReportPage
    }, {
        path: '**',
        redirectTo: ''
    }
];

export const routing = RouterModule.forRoot(appRoutes);