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
var fss = require('fs');
var http = require('http');
        const jsdom = require('jsdom');
        const { JSDOM } = jsdom;
        var passport;
var options = {
    host: app.conf.spark.ui.url,
    port: app.conf.spark.ui.port,
    path: '/',
    method: 'GET'
};
global.compilerSocketPort = 7654;
global.deploymentSocketPort = 7655;


exports.saveProject = function (req, res) {
    //TODO: check passport authentication
    //TODO: check the incoming data

    //create the basic project structure in the hdfs directory
    //
    console.log(req.body);
    if (req.body.project == undefined || req.body.project.name == undefined) {
        return res.status(400).send({msg: 'Invalid Project Schema!'});
    }
    console.log("Starting Save...");

    fs.copy(app.conf.template.path + '/' + app.conf.template.name, app.conf.projects.localPath + "/" + req.body.project.name, function (out) {
        if (out.status !== undefined && (out.status == "OK" || (out.status == "ERROR" && out.code == "EXISTS"))) {

            //now save the project json file
            fs.writeJSON(req.body.project, app.conf.projects.localPath + "/" + req.body.project.name + "/" + "topology.json", function (err) {
                if (err) {
                    return res.status(500).send({status: "ERROR", msg: "Project Not Saved!"});
                }
                return res.status(200).send({status: "OK", msg: "Project Saved!"});
            });

        } else {
            return res.status(200).send({status: "OK", msg: "Could not save Project!"});
        }
    });


}

exports.list = function (req, res) {
    fs.list(app.conf.projects.localPath, function (l) {
        var out = [];
                for (ll of l) {
        try {
            var p = JSON.parse(fs.readFileSync(app.conf.projects.localPath + "/" + ll + "/topology.json"));
            p.driverId = ll;
            out.push(p);
        } catch (e) {
            console.log("could not read : " + ll);
        }
    }

    return res.json(out);
    });
}

exports.status = function (req, res) {
    if (req.body.name == undefined || req.body.name == "") {
        return res.status(400).send({status: "ERROR", msg: "Invalid project name!"});
    }

    var project = req.body.name;
    var body = "";
    var reqq = http.request(options, function (ress) {
        ress.setEncoding('utf8');
        ress.on('data', function (chunk) {
            body += chunk;
        });

        ress.on('end', function () {
            var dom = new JSDOM(body);
            var l = dom.window.document.querySelectorAll("table")[1].querySelectorAll("td:nth-child(2)");
            var found = 0;
            for (v in l) {
                var app = l[v].textContent;
                app = app == undefined ? "" : app.trim().replace("\n", "");
                console.log("comparing " + project + " to " + app);
                if (project == app) {
                    found = 1;
                    break;
                }
            }
            if (found == 1) {
                return res.status(200).send({status: "OK", msg: "Success!", data: {running: true}});
            } else {
                return res.status(200).send({status: "OK", msg: "Success!", data: {running: false}});
            }
        });
    });


    reqq.on('error', function (e) {
        console.log('problem with request: ' + e.message);
        return res.status(500).send({status: "ERROR", msg: "Server Error!", data: {running: false}});
    });

    reqq.end();


}

exports.readTopologies = function (list, out, callback) {
    if (list.length <= 0) {
        callback(out);
        return;
    }
    fs.list(app.conf.projects.localPath + "/" + list[0] + "/topology.json", function (t) {

        list.splice(0, 1);
        out.push(t);
        exports.readTopologies(list, out);
    });
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
        var port = global.compilerSocketPort - 1;
        var checkPort, output = "NA";
        while (output != undefined && output != "") {
            port = port + 1;
            checkPort = new fs.run_cmd("lsof", ["-i:" + port]);
            output = checkPort.stdout.toString();
        }
        console.log("sending output to" + port);
        //pass the project full path+name to compiler
        var compile = new fs.runCmd(app.conf.path.localPath + "/webui/shell/websocketd",
                ["--port=" + port, "java", "-jar",
                    app.conf.compiler.path + "/" + app.conf.compiler.executable,
                    "VERBOSE",
                    "--variable:pluginsPath=" + app.conf.plugins.path,
                    "--variable:coreLibPath=" + app.conf.library.core.path,
                    "COMPILE",
                    app.conf.projects.localPath + "/" + req.body.name,
                    app.conf.projects.localPath + "/" + req.body.name,
                ], function (o, e) {
            console.log(o + "\n" + e);
        });

        var pid = fs.run_cmd("echo", ["$!"]);
        return res.json({status: "OK", msg: "Command Executed!", data: {port: port, pid: pid.stdout.toString()}});
//        return res.json({status: "OK", msg: "Command Executed!",data:{port:port}, output: compile.stdout.toString(), error: compile.stderr.toString()});



    } catch (e) {
        console.log(e);
        return res.status(500).send({status: "ERROR", msg: "Server Error!"});
    }

}

exports.deployProject = function (req, res) {
    if (req.body.name == undefined || req.body.name == null) {
        return res.status(400).send({status: "ERROR", msg: "Invalid Project Name/ Project not found!"});
    }
    var enableSocket = req.body.terminal == undefined ? false : req.body.terminal == "1" ? true : false;
    try {
        var port = global.deploymentSocketPort - 1;
        var checkPort, output = "NA";
        while (output != undefined && output != "") {
            port = port + 1;
            checkPort = new fs.run_cmd("lsof", ["-i:" + port]);
            output = checkPort.stdout.toString();
        }
        console.log("sending output to" + port);
        //pass the project full path+name to compiler
        var logStream = fss.createWriteStream(app.conf.projects.localPath + "/" + req.body.name + "/log.out", {flags: 'a'});
        var deploy = fs.run_cmd_async(app.conf.spark.path + "/bin/spark-submit",
                [
                    "--master",
                    app.conf.spark.master,
                    "--class", "com.sa.SAEntryPoint",
                    app.conf.projects.localPath + "/" + req.body.name + "/target/" + "template-1.0-SNAPSHOT-jar-with-dependencies.jar",
                    "--variable::sparkMasterURL=" + app.conf.spark.master,
                    "--variable::applicationName=" + req.body.name,
                    "--variable::applicationId=" + req.body.name.replace("project-", ""),
                    "--variable::applicationPath=" + app.conf.projects.hdfs.path + "/" + req.body.name,
                    "--variable::driverId="+req.body.name,
                    "--variable::hdfsMaster=" + app.conf.hadoop.hdfsMaster

                ]
                );
        var str = app.conf.spark.path + "/bin/spark-submit" + " " +
                    "--master"+ " " +
                    app.conf.spark.master+ " " +
                    "--class com.sa.SAEntryPoint"+ " " +
                    app.conf.projects.localPath + "/" + req.body.name + "/target/" + "template-1.0-SNAPSHOT-jar-with-dependencies.jar"+ " " +
                    "--variable::sparkMasterURL=" + app.conf.spark.master+ " " +
                    "--variable::applicationName=" + req.body.name+ " " +
                    "--variable::applicationId=" + req.body.name.replace("project-", "")+ " " +
                    "--variable::applicationPath=" + app.conf.projects.hdfs.path + "/" + req.body.name+ " " +
                    "--variable::driverId="+req.body.name+ " " +
                    "--variable::hdfsMaster=" + app.conf.hadoop.hdfsMaster;
        deploy.stdout.pipe(logStream);
        deploy.stderr.pipe(logStream);

        var terminalOutput = new fs.runCmd(app.conf.path.localPath + "/webui/shell/websocketd", [
            "--port=" + port,
            "tail",
            "-1f",
            app.conf.projects.localPath + "/" + req.body.name + "/log.out"
        ], function (o, e) {

        });






        var pid = fs.run_cmd("echo", ["$!"]);
        return res.json({status: "OK", msg: "Command Executed!", data: {port: port, pid: pid.stdout.toString()}});
//        return res.json({status: "OK", msg: "Command Executed!",data:{port:port}, output: compile.stdout.toString(), error: compile.stderr.toString()});



    } catch (e) {
        console.log(e);
        return res.status(500).send({status: "ERROR", msg: "Server Error!"});
    }

}

exports.killSocket = function (req, res) {
    if (req.body.pid == undefined || req.body.pid == "" && req.body.port == undefined || req.body.port == "") {
        return res.status(400).send({status: "ERROR", msg: "Invalid process id specified!"});
    }

    var pid = req.body.pid;
    var port = req.body.port;
    var kill = parseInt(fs.run_cmd("lsof", ["-ti:" + port]).stdout.toString());
    console.log("socker found " + kill);
    var kill = fs.run_cmd("kill", ["-9", kill]);
    return res.json({status: "OK", msg: "Command executed", output: kill.stdout.toString(), error: kill.stderr.toString()});
}


module.exports = function (_passport) {
    passport = _passport;
    return exports;
};