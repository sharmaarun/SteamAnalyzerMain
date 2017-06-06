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
/*
 * A common file to hold enums, constants etc
 */
(function (ComponentType) {
    ComponentType[ComponentType["PANEL"] = 1] = "PANEL";
    ComponentType[ComponentType["STREAMPOINT"] = 2] = "STREAMPOINT";
})(exports.ComponentType || (exports.ComponentType = {}));
var ComponentType = exports.ComponentType;
;
(function (ProcessType) {
    ProcessType[ProcessType["SEARCH"] = 1] = "SEARCH";
    ProcessType[ProcessType["SCRIPT"] = 2] = "SCRIPT";
})(exports.ProcessType || (exports.ProcessType = {}));
var ProcessType = exports.ProcessType;
//# sourceMappingURL=common.js.map