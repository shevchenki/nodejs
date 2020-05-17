import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import apiCaller from './../../utils/apiCaller';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 530,
        backgroundColor: "#F4F4F4",
    },
    container: {
        maxHeight: 530,
        backgroundColor: "#fff",
        paddingTop: 10,
        marginLeft: 8,
    },
    tableCell: {
        paddingTop: 0,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 0,
        border: 'none',
    },
    cell: {
        height: 60,
        width: "100%",
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '1px solid #F4F4F4',
        borderRadius: 0,
    },
    dialog: {
        margin: 0,
        padding: 20,
    },
    dialogTitle:{
        paddingTop: 20,
        color: "red",
        backgroundColor: "#E3F0FF",
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
});

const DialogTitle = ((props) => {
    const classes = useStyles();
    const { children, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.dialog} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function N1_Voca_Lesson_Table() {

    const classes = useStyles();
    const [listData, setListData] = useState('');
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    let title = '';
    let contents = '';
    if (listData.length > 0) {
        title = listData[index].title;
        contents = listData[index].contents;
    }

    const handleClickOpen = (index) => {
        setOpen(true);
        setIndex(index);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function fetchListLesson() {
            const result = await apiCaller('/grammar', 'GET', null);
            setListData(result.data.data);
        }
        fetchListLesson();
    }, []);

    const cell = (cellData, index) => {
        return (
            <Grid item xs={4}>
                <Button className={classes.cell} onClick={() => handleClickOpen(index)}>
                    {cellData.title}
                </Button>
            </Grid>
        )
    }

    const tableCell = (listData) => {
        const dataLength = listData.length;
        if (dataLength > 0) {
            return (listData.map((data, index) => {
                if ((index + 1) % 3 === 0) {
                    const quotient = Math.floor((index + 1) / 3);
                    return (
                        <TableRow
                            key={quotient}
                            role="checkbox"
                            tabIndex={-1}
                        >
                            <TableCell className={classes.tableCell}>
                                <Grid container spacing={3}>
                                    {cell(listData[index - 2], index - 2)}
                                    {cell(listData[index - 1], index - 1)}
                                    {cell(listData[index], index)}
                                </Grid>
                            </TableCell>
                        </TableRow>
                    )
                }
            }))
        }
    }

    const tableCellRemainder = (listData) => {
        const dataLength = listData.length;
        if (dataLength > 0 && dataLength % 3 > 0) {
            const quotient = Math.floor(dataLength / 3);
            const remainder = dataLength % 3;
            return (
                <TableRow
                    key={quotient + 1}
                    role="checkbox"
                    tabIndex={-1}
                >
                    <TableCell className={classes.tableCell}>
                        <Grid container spacing={3}>
                            {(remainder === 2) ? cell(listData[dataLength - 2], index - 2) : ''}
                            {cell(listData[dataLength - 1], index - 1)}
                        </Grid>
                    </TableCell>
                </TableRow>
            )
        }
    }

    return (
        <Paper className={classes.root} elevation={0}>
            <Grid container>
                <Grid item xs={9}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableBody>
                                {tableCell(listData)}
                                {tableCellRemainder(listData)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogTitle className={classes.dialogTitle}>
                            {title}
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography style={{ whiteSpace: 'pre-line' }}>
                                {contents}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        </Paper>
    );
}
