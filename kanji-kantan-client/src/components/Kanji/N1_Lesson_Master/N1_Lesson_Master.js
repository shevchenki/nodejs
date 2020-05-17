import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import N1_Lesson_Master_Table from './N1_Lesson_Master_Table';
import apiCaller from './../../../utils/apiCaller';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#F4F4F4",
    },
    container: {
        paddingTop: 0,
        paddingLeft: 8,
        paddingBottom: 3,
    }
}));

export default function N1_Lesson_Master(props) {

    const classes = useStyles();
    const [listData, setListData] = useState('');
    const { match } = props;
    const rows = listData;
    const columns = [
        {
            id: 'lesson',
            label: '科目',
            minWidth: 50,
            align: 'center',
        },
        {
            id: 'counts',
            label: 'Số từ',
            minWidth: 50,
            align: 'center',
        },
        {
            id: 'finishednumber',
            label: '完了',
            minWidth: 50,
            align: 'center',
            // format: (value) => value.toLocaleString(),
        }
    ];

    useEffect(() => {
        async function fetchMasterKanji() {
            const result = await apiCaller(match.url === "/" ? "/kanji" : match.url, 'GET', null);
            setListData(result.data.data);
        }
        fetchMasterKanji();
    }, []);

    return (
        <Paper className={classes.root} elevation={0}>
            <Grid container spacing={1} className={classes.container}>
                <Grid item xs={8}>
                    <N1_Lesson_Master_Table
                        columns={columns}
                        rows={rows}
                        match={match}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}