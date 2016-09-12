"use strict";
var common_1 = require('./common');
/*
 * Holds all the components of the project design [eg. panels, stream points etc]
 */
var Schema = (function () {
    function Schema() {
        this._schema = {
            stages: [],
            stream_points: [],
        };
        //initialize
        this._schema = {};
    }
    /*
     * Add objects to arrays [eg. _panel, _streampoints]
     */
    Schema.prototype.addObject = function (_o) {
        if (_o === undefined || _o._type === undefined) {
            return;
        }
        if (_o._type == common_1.ComponentType.PANEL) {
            this._schema.stages.push(_o);
        }
    };
    return Schema;
}());
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map