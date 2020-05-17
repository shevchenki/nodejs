import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Note_Master_Table_Details from './Note_Master_Table_Details';
import apiCaller from './../../utils/apiCaller';

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

export default function Note_Master_Table(props) {

    const classes = useStyles();
    const [listData, setListData] = useState('');
    const { match } = props;
    const rows = listData;
    const columns = [
        {
            id: 'theme',
            label: '科目',
            minWidth: 50,
            align: 'center',
        },
    ];

    useEffect(() => {
        async function fetchNote() {
            const result = await apiCaller('/note', 'GET', null);
            setListData(result.data.data);
        }
        fetchNote();
    }, []);

    return (
        <Paper className={classes.root} elevation={0}>
            <Grid container spacing={1} className={classes.container}>
                <Grid item xs={8}>
                    <Note_Master_Table_Details
                        columns={columns}
                        rows={rows}
                        match={match}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}