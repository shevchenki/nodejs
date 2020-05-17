import Sequelize from 'sequelize';
import { sequelize } from '../databases/database';

export const Lesson_Voca = sequelize.define('vocabulary', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    grid: {
        type: Sequelize.INTEGER
    },
    word: {
        type: Sequelize.STRING,
    },
    phonetic: {
        type: Sequelize.STRING
    },
    mean: {
        type: Sequelize.STRING
    },
    level: {
        type: Sequelize.INTEGER
    },
    lesson: {
        type: Sequelize.INTEGER
    },
    finished: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false,
    schema: "lesson",
    tableName: "vocabulary"
});

export const N1_Voca_Master = sequelize.define('n1_voca', {
    lesson: {
        type: Sequelize.INTEGER
    },
    counts:{
        type: Sequelize.INTEGER
    },
    finishednumber:{
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    schema: "lesson",
    tableName: "N1_Voca"
});