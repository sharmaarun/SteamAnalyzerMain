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

var passport;


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
                out.push(JSON.parse(fs.readFileSync(app.conf.projects.localPath + "/" + ll + "/topology.json")));
            } catch (e) {
                console.log("could not read : " + ll);
            }
        }

        return res.json(out);
    });
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