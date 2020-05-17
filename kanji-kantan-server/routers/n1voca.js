import express from 'express';
import { N1_Voca_Master, Lesson_Voca } from '../models/Lesson_Voca';
import { isNumeric } from 'validator';

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        let n1_voca_master = await N1_Voca_Master.findAll({
            attributes: ["lesson", "counts", "finishednumber"],
            order: [
                ["lesson", "ASC"]
            ]
        });
        res.json({
            result: "OK",
            data: n1_voca_master,
            message: "Get n1 kanji master successfully"
        })
    } catch (error) {
        res.json({
            result: "Failed",
            data: {},
            message: `Error: ${error}`
        })
    }
});

router.get('/:lesson', async (req, res) => {
    try {
        const { lesson } = req.params;
        const level = 1;

        if (!isNumeric(lesson)) {
            res.json({
                result: "Failed",
                data: {},
                message: "lesson kanji id must not be number"
            })
            return;
        }

        let lesson_voca = await Lesson_Voca.findAll({
            attributes: [
                "id",
                "level",
                "lesson",
                "grid",
                "word",
                "phonetic",
                "mean",
                "finished"
            ],
            order: [
                ["id", "ASC"]
            ],
            where: {
                level,
                lesson
            }
        });
        res.json({
            result: "OK",
            data: lesson_voca,
            message: "Get lessons vocabulary successfully"
        })
    } catch (error) {
        res.json({
            result: "Failed",
            data: {},
            message: `Error: ${error}`
        })
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
        finished
    } = req.body;

    if (!isNumeric(id)) {
        res.json({
            result: "Failed",
            data: {},
            message: "id must be a number"
        })
        return;
    }

    try {
        let lesson_vocas = await Lesson_Voca.findAll({
            attributes: [
                "id",
                "finished"
            ],
            where: {
                id
            }
        });
        
        if (lesson_vocas.length > 0) {
            lesson_vocas.forEach(async (lesson_voca) => {
                await lesson_voca.update({
                    finished: finished ? true : false
                })
            });
            res.json({
                result: "OK",
                data: lesson_vocas,
                message: "Update a lesson vocabulary successfully"
            })
        } else {
            res.json({
                result: "Failed",
                data: {},
                message: "Update lesson vocabulary failed"
            })
        }
    } catch (error) {
        res.json({
            result: "Failed",
            data: {},
            message: `Error: ${error}`
        })
    }
});

export default router;