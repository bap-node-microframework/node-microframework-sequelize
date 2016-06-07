import * as Sequelize from 'sequelize';
import { Container } from 'bap-node-microframework/core';

export class SequelizePlugin {
    private instance: any;
    private name: String = 'sequelize';

    constructor(container, options) {
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
        Container.setApplicationInstance(container);
    }

    getInstance() {
        return this.instance;
    }

    getName() {
        return this.name;
    }
}
