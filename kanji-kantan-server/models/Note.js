import Sequelize from 'sequelize';
import { sequelize } from '../databases/database';

export const Note_Details = sequelize.define('Note_Details', {
    theme: {
        type: Sequelize.STRING
    },
    word: {
        type: Sequelize.STRING,
    },
    kana: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    finished: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false,
    schema: "lesson",
    tableName: "Note_Details"
});

export const Note = sequelize.define('Note', {
    theme: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    create_date: {
        type: Sequelize.DATE
    },
}, {
    timestamps: false,
    schema: "lesson",
    tableName: "Note"
});