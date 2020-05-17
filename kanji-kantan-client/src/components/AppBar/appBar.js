import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import TabBar from './../TabBar/tabBar';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#F4F4F4",
    },
    title: {
        padding: theme.spacing(1),
        border: "1px solid #fff",
        width: 150,
        textAlign: "center",
        borderRadius: 25,
    },
    search: {
        flexGrow: 1,
    },
    toolbar: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#4D81ED",
    },
    loginBtn: {
        flexDirection: "row-reverse",
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    let history = useHistory();
    function handleClick() {
        history.push("/");
    }
    return (
        <AppBar position="sticky" className={classes.root} elevation={0}>
            <Toolbar className={classes.toolbar}>
                <Typography
                    variant="h6"
                    className={classes.title}
                    onClick={handleClick}
                >
                    Kanji Kantan
                    </Typography>
                <Typography variant="h6" className={classes.search} />
                <Button color="inherit" className={classes.loginBtn}>Login</Button>
            </Toolbar>
            <TabBar />
        </AppBar>
    );
}
