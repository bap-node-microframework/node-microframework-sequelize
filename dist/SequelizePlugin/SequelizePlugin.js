"use strict";
var Sequelize = require('sequelize');
var core_1 = require('bap-node-microframework/core');
var SequelizePlugin = (function () {
    function SequelizePlugin(dns, debug) {
        var sequelize = new Sequelize(dns, {
            logging: (process.env.DEBUG || debug) ? console.log : false,
            define: {
                timestamps: false
            },
            dialectOptions: {
                multipleStatements: true
            }
        });
        core_1.Container.registerService('sequelize', sequelize);
    }
    return SequelizePlugin;
}());
exports.SequelizePlugin = SequelizePlugin;
//# sourceMappingURL=SequelizePlugin.js.map