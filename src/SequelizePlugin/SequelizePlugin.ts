import * as config from 'config';
import * as Sequelize from 'sequelize';
import { Container } from 'bap-node-microframework/core';

export class SequelizePlugin {
    constructor(dns, debug) {
        let sequelize = new Sequelize(dns, {
            logging: (process.env.DEBUG || debug) ? console.log : false,
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
