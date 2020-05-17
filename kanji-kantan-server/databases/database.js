import Sequelize from 'sequelize';
import * as dbconfig from './dbconfig';
export const sequelize = new Sequelize(
    dbconfig.DB_NAME,
    dbconfig.DB_USER,
    dbconfig.DB_PASS,
    {
        dialect: dbconfig.DIALECT,
        host: dbconfig.HOST,
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        }
    }
);

export const Op = Sequelize.Op;