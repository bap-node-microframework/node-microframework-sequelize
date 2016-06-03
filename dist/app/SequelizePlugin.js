"use strict";
var Sequelize = require('sequelize');
var core_1 = require('bap-node-microframework/core');
var SequelizePlugin = (function () {
    function SequelizePlugin(options) {
        var sequelize = new Sequelize(options.dsn, {
            logging: (process.env.DEBUG || options.debug) ? console.log : false,
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