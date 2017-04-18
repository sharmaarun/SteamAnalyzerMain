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

var fs = require('../commons/fs.service');
var whdfs = require('webhdfs');
var hdfs = whdfs.createClient({
    user: 'hadoop',
    host: 'master',
    port: '50070',
});
var passport;


exports.getDataFromHDFS = function (req, res) {
    //TODO: check passport authentication
    //TODO: check the incoming data

    //create the basic project structure in the hdfs directory
    //



}

exports.list = function (req, res) {
    var file = hdfs.createReadStream("/user/hadoop/nullreport.json");
    var data = "", error = {}, status = "OK";
    file.on('error', function onError(err) {
        // Do something with the error 
        error = err;
        console.log(err);
    });

    file.on('data', function onChunk(chunk) {
        // Do something with the data chunk 
        data = chunk;
    });

    file.on('finish', function onFinish() {
        return res.json("{\"data\": "+data+", \"status\": \""+status+"\", \"error\": \"" + error + "\"}");
        // Upload is done 
    });
//    setInterval(function () {
//        if ((data != "" && data != undefined) || (status!="" && status!=undefined))
//            
//    }, 500);

}

exports.getJSON = function (req, res) {
    if (req.body.name == undefined || req.body.name == null) {
        return res.status(400).send({status: "ERROR", msg: "Invalid Project Name/ Project not found!"});
    }
    try {
        return res.json(fs.readJSON(app.conf.projects.localPath + "/" + req.body.name + "/topology.json"));
    } catch (e) {
        console.log(e);
        return res.status(500).send({status: "ERROR", msg: "Server Error!"});
    }

}


exports.compileProject = function (req, res) {
    if (req.body.name == undefined || req.body.name == null) {
        return res.status(400).send({status: "ERROR", msg: "Invalid Project Name/ Project not found!"});
    }
    try {

        //pass the project full path+name to compiler
        var compile = new fs.run_cmd("java",
                ["-jar",
                    app.conf.compiler.path + "/" + app.conf.compiler.executable,
                    "VERBOSE",
                    "--variable:pluginsPath=" + app.conf.plugins.path,
                    "--variable:coreLibPath=" + app.conf.library.core.path,
                    "COMPILE",
                    app.conf.projects.localPath + "/" + req.body.name,
                    app.conf.projects.localPath + "/" + req.body.name
                ]);

        return res.json({status: "OK", msg: "Command Executed!", output: compile.stdout.toString(), error: compile.stderr.toString()});



    } catch (e) {
        console.log(e);
        return res.status(500).send({status: "ERROR", msg: "Server Error!"});
    }

}


module.exports = function (_passport) {
    passport = _passport;
    return exports;
};