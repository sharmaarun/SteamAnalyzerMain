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

    var project = req.body.project;
    if (project == undefined) {
        res.status(400).send({status: "ERROR", msg: "Invalid project!"});
    }
    var topology = fs.readJSON(app.conf.projects.localPath + "/" + project + "/topology.json");
    var totalReports = {};
    for (var i = 0; i < topology.stages.length; i++) {
        var stg = topology.stages[i];
        if (stg.plugin.type == "REPORT_STAGE") {
            var repo = stg.name + "_" + stg.id;
            totalReports[repo] = app.conf.projects.hdfs.path + "/" + project + "/" + stg.name + "_" + stg.id + "/report.json";
        }
    }
    var rd = [];
    readReports(totalReports, function (data) {
        return res.json(data);
    });

//    setInterval(function () {
//        if ((data != "" && data != undefined) || (status!="" && status!=undefined))
//            
//    }, 500);

}

exports.getJson = function (req, res) {
    var project = req.body.name;
    var stg = req.body.plugin;
    var id = req.body.id;
    var files = JSON.parse(req.body.files);
    if (project == undefined || stg == undefined || id == undefined || files == undefined) {
        return res.json({status: "ERROR", msg: "Invalid report name/id"});
    }
    for (var i = 0; i < files.length; i++) {
        files[i] = app.conf.projects.hdfs.path + "/" + project + "/" + stg + "_" + id + "/" + files[i];
    }
    console.log(files[0]);
    try{
        var tmp = fs.run_cmd(app.conf.path.localPath + "/webui/shell/tst.sh", [files[0]]);

        return res.json(tmp.stdout.toString());
    } catch (ex) {
        console.log(ex);
        return res.json({status:"ERROR",msg:"Connection Interrupred!",ex:JSON.stringify(ex)});
    }
//    readReports(files,function(data){
//       
//         return res.json(data);
//    });
}


var readReport = function (paths, count, arr, cb) {
    if (count > Object.keys(paths).length - 1) {
        console.log("return all data");
        cb(arr);
        return;
    }
    var keys = Object.keys(paths);
    var currKey = keys[count];
    var path = paths[currKey];
    var file = hdfs.createReadStream(path + "");
    var data = "", error = {}, status = "OK";
    file.on('error', function onError(err) {
        // Do something with the error 
        error = err;
        console.log(err);
    });

    file.on('data', function onChunk(chunk) {
        // Do something with the data chunk 
        data += chunk;
    });

    file.on('finish', function onFinish() {
        console.log("got the data for " + count + "--" + path);
        arr.push("{\"report\":\"" + currKey + "\",\"data\": " + data + ", \"status\": \"" + status + "\", \"error\": \"" + error + "\"}");
        readReport(paths, count + 1, arr, cb);
        // Upload is done 
    });
}

var readReports = function (paths, cb) {
    var count = 0;
    var arr = [];
    readReport(paths, count, arr, cb);
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
        var compile = new fs.runCmd("java",
                ["-jar",
                    app.conf.compiler.path + "/" + app.conf.compiler.executable,
                    "VERBOSE",
                    "--variable:pluginsPath=" + app.conf.plugins.path,
                    "--variable:coreLibPath=" + app.conf.library.core.path,
                    "COMPILE",
                    app.conf.projects.localPath + "/" + req.body.name,
                    app.conf.projects.localPath + "/" + req.body.name
                ], function (o, e) {
            console.log(o + "\n" + e);
        });

//        return res.json({status: "OK", msg: "Command Executed!", output: compile.stdout.toString(), error: compile.stderr.toString()});
        return res.json({status: "OK", msg: "Command Executed!", output: {port: port}, error: compile.stderr.toString()});



    } catch (e) {
        console.log(e);
        return res.status(500).send({status: "ERROR", msg: "Server Error!"});
    }

}


module.exports = function (_passport) {
    passport = _passport;
    return exports;
};