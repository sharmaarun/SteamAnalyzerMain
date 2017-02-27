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
var process = require('child_process');
var fs = require('fs');

/**
 * Check if the path exists
 * @param {type} path
 * @param {type} isDir Should be true if the path you want to search is directory or file
 * @returns {Boolean}
 */
exports.exists = function (path, isDir) {
    try {
        return isDir ? fs.statSync(path).isDirectory() : fs.statSync(path).isFile();
    } catch (e) {

        if (e.code == 'ENOENT') { // no such file or directory. File really does not exist
            console.warn("File does not exist. : " + path);
            return false;
        }

        console.error("Exception fs.statSync (" + path + "): " + e);
        throw e; // something else went wrong, we don't have rights, ...
    }
};


exports.isDir = function (path) {
    return fs.statSync(path).isDirectory();
};

exports.readJSON = function(path) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}

exports.writeJSON = function(json,path,cb) {
    return fs.writeFile(path,JSON.stringify(json,null,4),function(err){cb(err);});
}

/**
 * Copy command wrapper
 * @param {type} src
 * @param {type} dst
 * @param {type} cb
 * @returns {undefined}
 */
exports.copy = function (src, dst, cb) {
    var spawn = process.spawnSync;
    var copy;

    if (exports.exists(dst, true)) {
        console.warn("File/Folder already exists! : " + dst);
        cb({status: "ERROR", code : "EXISTS", error: {msg: "File/Folder already exists!"}, output: {}});
        return;
    }


    if (app.conf.projects.useHDFS) {
        copy = spawn(
                conf.hadoop.path + '/bin/hdfs',
                ['dfs', '-copyFromLocal', src, dst]
                );
    } else {
        copy = spawn(
                'cp',
                ['-r', src, dst]
                );
    }

    if (copy.status !== 0) {
        cb({status: "ERROR", error: copy.stderr, output: copy.stdout});
    } else {
        cb({status: "OK", error: copy.stderr, output: copy.stdout});
    }
}

/**
 * List files from directory
 * @param {type} cb
 * @returns {undefined}
 */
exports.list = function (path, cb) {
    fs.readdir(path, function (err, items) {
        if (err != undefined && err != null) {
            console.error(err);
            cb({status: "ERROR", error: err});
            return;
        }
        cb(items);
    });
}

exports.run_cmd = function(cmd, args) {
    try {
  var spawn = require('child_process').spawnSync,
  child = spawn(cmd, args);
  return child;
    }catch (e) {
        console.log(e);
    }
    return {};
}



module.exports = exports;