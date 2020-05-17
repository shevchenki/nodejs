import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from './components/AppBar/appBar';
import routers from './routers/routers';
import Paper from "@material-ui/core/Paper";
// import { createHashHistory } from "history";

import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#fff",
        // height: 1000
    },
}));

export default function App() {

    // const history = createHashHistory();
    const classes = useStyles();
    const showContentMenus = (routers, history) => {
        let result = null;
        if (routers.length > 0) {
            result = routers.map((router, index) => {
                return (
                    <Route
                        key={index}
                        path={router.path}
                        exact={router.exact}
                        component={router.main}
                    // history={history}
                    />
                )
            });
            return result;
        }
    }
    return (
        <Router>
            <Paper className={classes.root} elevation={0}>
                <AppBar />
                <Switch>
                    {/* {showContentMenus(routers, history)} */}
                    {showContentMenus(routers)}
                </Switch>
            </Paper>
        </Router>
    );
}