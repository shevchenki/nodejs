import Sequelize from 'sequelize';
import { sequelize } from '../databases/database';

export const JAVI = sequelize.define('javi', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    word: {
        type: Sequelize.STRING
    },
    kana: {
        type: Sequelize.STRING,
    },
    content: {
        type: Sequelize.STRING
    },
}, {
    timestamps: false,
    schema: "lesson",
    tableName: "javi"
});

export const VIJA = sequelize.define('javi', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    word: {
        type: Sequelize.STRING
    },
    kana: {
        type: Sequelize.STRING,
    },
    content: {
        type: Sequelize.STRING
    },
}, {
    timestamps: false,
    schema: "lesson",
    tableName: "vija"
});
