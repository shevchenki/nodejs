import express from 'express';
import { JAVI, VIJA } from '../models/Search';
import { isEmpty } from 'validator';
// import { Op } from 'sequelize';

const router = express.Router();

router.get('/javi/:word', async (req, res) => {

    const { word } = req.params;

    if (isEmpty(word)) {
        res.json({
            result: "Failed",
            data: {},
            message: "word search must not be empty"
        })
        return;
    }

    try {
        let javi = await JAVI.findAll({
            attributes: ["id", "word", "kana", "content"],
            where: {
                word
            },
            // where: {
            //     word: { [Op.like]: word + '%'}
            // },
            order: [
                ["word", "ASC"]
            ],
        });
        res.json({
            result: "OK",
            data: javi,
            message: "Get javi successfully"
        })
    } catch (error) {
        res.json({
            result: "Failed",
            data: {},
            message: `Error: ${error}`
        })
    }
});

router.get('/vija/:word', async (req, res) => {

    const { word } = req.params;

    if (isEmpty(word)) {
        res.json({
            result: "Failed",
            data: {},
            message: "word search id must not be empty"
        })
        return;
    }

    try {
        let vija = await VIJA.findAll({
            attributes: ["id", "word", "kana", "content"],
            where: {
                word
            },
            // where: {
            //     word: { [Op.like]: word + '%'}
            // },
            order: [
                ["word", "ASC"]
            ],
        });
        res.json({
            result: "OK",
            data: vija,
            message: "Get vija successfully"
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