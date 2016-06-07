"use strict";
var Sequelize = require('sequelize');
var core_1 = require('bap-node-microframework/core');
var SequelizePlugin = (function () {
    function SequelizePlugin(container, options) {
        this.name = 'sequelize';
        this.instance = new Sequelize(options.dsn, {
            logging: (process.env.DEBUG || options.debug) ? console.log : false,
            define: {
                timestamps: false
            },
            dialectOptions: {
                multipleStatements: true
            }
        });
        container.registerService(this.name, this.instance);
        core_1.Container.setApplicationInstance(container);
    }
    SequelizePlugin.prototype.getInstance = function () {
        return this.instance;
    };
    SequelizePlugin.prototype.getName = function () {
        return this.name;
    };
    return SequelizePlugin;
}());
exports.SequelizePlugin = SequelizePlugin;
//# sourceMappingURL=SequelizePlugin.js.map