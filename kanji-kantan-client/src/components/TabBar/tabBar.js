import React from "react";
import { Route, Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 3,
        backgroundColor: "#F4F4F4"
    },
    active: {
        margin: 3,
        borderRadius: 25,
        padding: theme.spacing(1.2),
        textAlign: 'center',
        backgroundColor: "#4D81ED",
        color: "#FFFFFF",
    },
    deactive: {
        margin: 3,
        borderRadius: 25,
        padding: theme.spacing(1.2),
        textAlign: 'center',
        color: "#000000"
    },
    disabledLink: {
        textDecoration: "none"
    },
    paper: {
        marginTop: theme.spacing(0.5),
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 1000
    }
}));

export default function IconLabelTabs() {
    const classes = useStyles();
    const menus = [
        {
            to: '/',
            label: 'SEARCH',
            exact: true
        },
        {
            to: '/kanji',
            label: 'KANJI',
            exact: true
        },
        {
            to: '/vocabulary',
            label: 'VOCABULARY',
            exact: false
        },
        {
            to: "/grammar",
            label: "GRAMMAR",
            exact: false
        },
        {
            to: "/note",
            label: "NOTE",
            exact: false
        },
    ];

    const showMenu = (menus) => {
        let result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <CustomLink
                        key={index}
                        to={menu.to}
                        label={menu.label}
                        activeOnlyWhenExact={menu.exact}
                    />
                )
            });
            return result;
        }
    }

    return (
        <Paper  square className={classes.root} elevation={0}>
            <Grid container >
                {showMenu(menus)}
            </Grid>
        </Paper>
    );
}


function CustomLink({ label, to, activeOnlyWhenExact }) {
    const classes = useStyles();
    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
            return (
                <Grid item xs={3} sm={2}>
                    <Link
                        to={to}
                        className={classes.disabledLink}
                    >
                        <Paper
                            className={match ? classes.active : classes.deactive}
                        >
                            {label}
                        </Paper>
                    </Link>
                </Grid>
            );
        }} />
    )
}
