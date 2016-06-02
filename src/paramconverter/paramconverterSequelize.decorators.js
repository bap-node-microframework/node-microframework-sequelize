"use strict";
var core_1 = require('bap-node-microframework/core');
function ParamConverterSequelize() {
    var getArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        getArgs[_i - 0] = arguments[_i];
    }
    var aName = getArgs[0];
    var options = getArgs[1];
    var query = {};
    return function converter(target, name, descriptor) {
        var oldValue = descriptor.value;
        descriptor.value = function (req, res) {
            var findOptions = {};
            if (Array.isArray(options.filterBy)) {
                options.filterBy.forEach(function (col) {
                    findOptions[col] = req.params[col] || req.query[col];
                });
            }
            else {
                Object.keys(options.filterBy).forEach(function (col) {
                    findOptions[col] = req.params[options.filterBy[col]] || req.query[options.filterBy[col]];
                });
            }
            core_1.Container.getModel(options.model).findOne({ where: findOptions }).then(function (data) {
                if (!data) {
                    return res.status(404).json({
                        error: "Cannot find " + options.model + " with " + JSON.stringify(findOptions)
                    });
                }
                req.params[aName] = data;
                return oldValue(req, res);
            }, function (error) {
                return res.status(500).json(error);
            });
        };
    };
}
exports.ParamConverterSequelize = ParamConverterSequelize;
