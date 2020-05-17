import Sequelize from 'sequelize';
import { sequelize } from '../databases/database';

export const Lesson_Grammar = sequelize.define('grammar_n1', {
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
    tableName: "grammar_n1"
});