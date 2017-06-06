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

exports.status = function (req, res) {

    //init emptry object
    var stats = {
        services: {
            spark: {
                status: false
            },
            hadoop: {
                status: false
            }
        }
    };

    var cmd = fs.runCmd(app.conf.path.localPath + "/webui/shell/services_status.sh", [], function (data, err) {

        if (err != undefined && err != "" && err != null) {
            return res.json({status: "ERROR", msg: "Could not get status updates!", payload: err});
        } else {

            var dataj = JSON.parse(data);
            console.log(dataj);
            stats.services.spark.status = dataj.services.spark.length > 0 ? true : false;
            stats.services.hadoop.status = dataj.services.hadoop.length > 0 ? true : false;
            return res.json({status: "OK", msg: "Success!", payload: stats});
        }

    });


}
module.exports = function (_passport) {
    passport = _passport;
    return exports;
};