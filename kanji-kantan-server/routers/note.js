import express from 'express';
import { Note, Note_Details } from '../models/Note';
import { isEmpty } from 'validator';
// import { Op } from 'sequelize';

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        let note = await Note.findAll({
            attributes: ["theme", "create_date"],
            order: [
                ["create_date"]
            ]
        });
        res.json({
            result: "OK",
            data: note,
            message: "Get note successfully"
        })
    } catch (error) {
        res.json({
            result: "Failed",
            data: {},
            message: `Error: ${error}`
        })
    }
});

router.post('/', async (req, res) => {
    let { theme } = req.body;
    if (isEmpty(theme)) {
        res.json({
            result: "Failed",
            data: {},
            message: "theme must not be empty"
        })
        return;
    }
    let today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    try {
        let newTheme = await Note.create({
            theme: theme,
            create_date: today
        }, {
            fields: ["theme", "create_date"]
        })
        if (newTheme) {
            res.json({
                result: "Insert new theme OK",
                data: newTheme
            })
        } else {
            res.json({
                result: "Failed",
                data: {},
                message: "Insert new task failed"
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