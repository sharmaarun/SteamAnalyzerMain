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

/**
 * List all the plugins from plugins directory
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */

var fs = require('../commons/fs.service');

/**
 * API method to list plugins
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
exports.list = function(req,res) {
    return res.json(app.plugins);   
}




// All non api methods should go below


exports.reload = function(cb) {
    fs.list(app.conf.plugins.path,function(d){
        if(d.status!=undefined&&d.status=="ERROR") {
            cb({status:"ERROR"});
            return;
        }
        
        d.forEach(function(f){
            if(fs.isDir(app.conf.plugins.path+"/"+f)) {
                if(fs.exists(app.conf.plugins.path+"/"+f+"/plug.json",false)) {
                    app.plugins.push(fs.readJSON(app.conf.plugins.path+"/"+f+"/plug.json"));
                }
            }
        });
        cb({status:"OK"});
        return;
    });
}