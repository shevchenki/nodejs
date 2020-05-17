import express from 'express';
import { Lesson_Kanji, N1_Kanji_Master } from '../models/Lesson_Kanji';
import { isNumeric } from 'validator';

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        let n1_kanji_master = await N1_Kanji_Master.findAll({
            attributes: ["lesson", "counts", "finishednumber"],
            order: [
                ["lesson", "ASC"]
            ]
        });
        res.json({
            result: "OK",
            data: n1_kanji_master,
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
        const level = "N1";

        if (!isNumeric(lesson)) {
            res.json({
                result: "Failed",
                data: {},
                message: "lesson kanji id must not be number"
            })
            return;
        }

        let lesson_kanji = await Lesson_Kanji.findAll({
            attributes: [
                "id",
                "level",
                "lesson",
                "kanji",
                "hanviet",
                "onyomi",
                "kunyomi",
                "meaning",
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
            data: lesson_kanji,
            message: "Get lessons successfully"
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
        let lesson_kanjis = await Lesson_Kanji.findAll({
            attributes: [
                "id",
                "finished"
            ],
            where: {
                id
            }
        });
        
        if (lesson_kanjis.length > 0) {
            lesson_kanjis.forEach(async (lesson_kanji) => {
                await lesson_kanji.update({
                    finished: finished ? true : false
                })
            });
            res.json({
                result: "OK",
                data: lesson_kanjis,
                message: "Update a lesson_kanji successfully"
            })
        } else {
            res.json({
                result: "Failed",
                data: {},
                message: "Update lesson_kanjis failed"
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