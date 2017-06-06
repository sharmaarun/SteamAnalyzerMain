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
import {Stage} from './stage';
import {ComponentType} from './common';

/*
 * Holds all the components of the project design [eg. panels, stream points etc]
 */
export class Schema {

    _parsedSchema;
    _schema = {
        stages: []
        stream_points: [],

    };

    public constructor() {
        //initialize
        this._schema = {

        };

    }


    /*
     * Add objects to arrays [eg. _panel, _streampoints]
     */
    public addObject(_o: any) {
        if (_o === undefined || _o._type === undefined) {
            return;
        }
        if (_o._type == ComponentType.PANEL) {
            this._schema.stages.push(_o);
        }
    }

}
