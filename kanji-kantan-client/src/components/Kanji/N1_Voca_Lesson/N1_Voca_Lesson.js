import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useLocation } from "react-router-dom";
import N1_Voca_Lesson_Table from './N1_Voca_Lesson_Table';
import apiCaller from './../../../utils/apiCaller';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        paddingTop: 3,
        paddingLeft: 8,
        paddingBottom: 3,
    }
}));

export default function N1_Voca_Lesson(props) {

    const classes = useStyles();
    const { match } = props;

    const lessonId = match.params.id

    const [listData, setListData] = useState('');
    const [index, setIndex] = useState(0);
    const [isStatusChange, setIsStatusChange] = useState(false);

    const rows = listData;
    const columns = [
        {
            id: 'id',
            label: 'ID',
            minWidth: 50
        },
        {
            id: 'word',
            label: '語彙',
            minWidth: 50,
            align: 'left',
        },
        {
            id: 'phonetic',
            label: 'ひらがな',
            minWidth: 50,
            align: 'left',
        },
        {
            id: 'mean',
            label: '内容',
            minWidth: 100,
            align: 'left',
        },
        {
            id: 'finished',
            label: '状態',
            minWidth: 50,
            align: 'right',
        }
    ];

    async function fetchListLesson(lesson) {
        const result = await apiCaller('/vocabulary/' + String(lesson), 'GET', null);
        setListData(result.data.data);
    }

    useEffect(() => {
        fetchListLesson(lessonId);
    }, []);

    useEffect(() => {
        fetchListLesson(lessonId);
        setIsStatusChange(false);
    }, [isStatusChange]);

    function handleRowChange(indexValue) {
        if (indexValue != index) {
            setIndex(indexValue);
        }
    }

    async function handleLearningStatus() {
        const result = await apiCaller('/vocabulary/' + String(listData[index].id), 'PUT', {
            "finished": !listData[index].finished
        });
        setIsStatusChange(true);
    }

    return (
        <Paper className={classes.root}>
            <Grid container spacing={1} className={classes.container}>
                <Grid item xs={12}>
                    <N1_Voca_Lesson_Table
                        columns={columns}
                        rows={rows}
                        indexProps={index}
                        handleRowChange={handleRowChange}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}