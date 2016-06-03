import * as config from 'config';
import * as Sequelize from 'sequelize';
import { Container } from 'bap-node-microframework/core';

export class SequelizePlugin {
    constructor(options) {
        let sequelize = new Sequelize(options.dsn, {
            logging: (process.env.DEBUG || options.debug) ? console.log : false,
            define: {
                timestamps: false
            },
            dialectOptions: {
                multipleStatements: true
            }
        });
        Container.registerService('sequelize', sequelize);
    }
}
