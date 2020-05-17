import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paperLeft: {
        margin: 0,
        paddingTop: 5,
        textAlign: 'right',
    },
    paper: {
        margin: 0,
        paddingTop: 5,
        textAlign: 'center',
    },
    paperRight: {
        margin: 0,
        paddingTop: 5,
        textAlign: 'left',
    },
    benkyoucyu: {
        margin: 0,
        width: "100%",
        color: "red",
        backgroundColor: "#FBFBFB",
        padding: theme.spacing(0.7),
    },
    kanryo: {
        margin: 0,
        width: "100%",
        color: "blue",
        backgroundColor: "#FBFBFB",
        padding: theme.spacing(0.7),
    },
}));

export default function CardMove(props) {
    const classes = useStyles();
    const { data, indexProps, setIndexProps, dataCount } = props;

    return (
        <div className={classes.root} >
            <Grid container
                spacing={0}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs>
                    <Paper className={classes.paperLeft} elevation={0}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIndexProps(indexProps - 1)}
                            disabled={indexProps === 0 ? true : false}
                        >
                            <NavigateBefore />
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setIndexProps(indexProps + 1)}
                            onClick={() => props.handleLearningStatus()}
                            className={data.finished ? classes.kanryo : classes.benkyoucyu}
                        >
                            {data.finished ? "完了" : "勉強中"}
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paperRight} elevation={0}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIndexProps(indexProps + 1)}
                            disabled={indexProps === dataCount - 1 ? true : false}
                        >
                            <NavigateNext />
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
