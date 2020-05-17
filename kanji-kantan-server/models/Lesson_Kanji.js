import Sequelize from 'sequelize';
import { sequelize } from '../databases/database';

export const Lesson_Kanji = sequelize.define('kanji', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    level: {
        type: Sequelize.STRING
    },
    lesson: {
        type: Sequelize.INTEGER,
    },
    kanji: {
        type: Sequelize.STRING
    },
    hanviet: {
        type: Sequelize.STRING
    },
    onyomi: {
        type: Sequelize.STRING
    },
    kunyomi: {
        type: Sequelize.STRING
    },
    meaning: {
        type: Sequelize.STRING
    },
    finished: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false,
    schema: "lesson",
    tableName: "kanji"
});

export const N1_Kanji_Master = sequelize.define('n1_kanji', {
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
    tableName: "N1_Kanji"
});