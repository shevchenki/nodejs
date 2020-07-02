import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from "react-router-dom";
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 480,
    },
    container: {
        maxHeight: 480,
    }
});

const StyledTableRow = withStyles((theme) => ({
    selected: {
        '&$selected, &$selected:hover': {
            backgroundColor: "#cdebff"
        }
    },
}))(TableRow);

export default function Note_Master_Table_Details(props) {

    const classes = useStyles();
    let history = useHistory();

    const { columns, rows, match } = props;

    const [selected, setSelected] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleGoToLesson = (index) => {
        const lessonNumber = index + 1 + (page * rowsPerPage);
        const url = match.url === "/" ? "/kanji" : match.url
        history.push(url + "/" + lessonNumber);
    }

    const tableCell = (columns, rows) => {
        if (rows.length > 0) {
            return (rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                const isItemSelected = selected == index ? true : false;
                return (
                    <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        onClick={() => setSelected(index)}
                        selected={isItemSelected}
                        className={classes.tableRow}
                    >
                        {columns.map((column) => {
                            let value = row[column.id];
                            return (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                >
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                            );
                        })}
                        {/* <TableCell
                            align={"center"}
                            style={{ minWidth: 50 }}
                        >
                            <IconButton
                                aria-label="go to lesson"
                                onClick={() => handleGoToLesson(index)}
                            >
                                <ArrowForwardIcon
                                    style={{ color: "#F37727" }}
                                />
                            </IconButton>
                        </TableCell> */}
                    </StyledTableRow>
                );
            }))
        }
    }

    return (
        <Paper>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow style={{ display: 'flex' }}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, flex: 1 }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell
                                    style={{ minWidth: 50, textAlign: "right" }}
                                >
                                    <IconButton
                                        aria-label="go to lesson"
                                        // onClick={() => handleGoToLesson(index)}
                                        style={{ color: "#F37727", padding: 0, margin: 0 }}
                                    >
                                        <NoteAddIcon
                                        />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableCell(columns, rows)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Paper>
    );
}
