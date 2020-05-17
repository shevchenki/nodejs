import express from 'express';
import { Lesson_Grammar } from '../models/Lesson_Grammar_N1';

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        let n1_grammar = await Lesson_Grammar.findAll({
            attributes: ["id", "title", "contents"],
            order: [
                ["id", "ASC"]
            ]
        });
        res.json({
            result: "OK",
            data: n1_grammar,
            message: "Get n1 grammar successfully"
        })
    } catch (error) {
        res.json({
            result: "Failed",
            data: {},
            message: `Error: ${error}`
        })
    }
});

export default router;