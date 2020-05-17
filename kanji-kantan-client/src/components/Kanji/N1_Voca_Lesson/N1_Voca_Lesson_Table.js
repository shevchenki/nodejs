import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 500
    },
    container: {
        maxHeight: 500,
    },
    tableCell: {
        fontSize: 18
    },
    tableCellWord: {
        fontSize: 18
    },
    finished: {
        fontSize: 12,
        color: "blue"
    },
    notFinished: {
        fontSize: 12,
        color: "red"
    }
});

const StyledTableRow = withStyles((theme) => ({
    selected: {
        '&$selected, &$selected:hover': {
            backgroundColor: "#cdebff"
        }
    },
}))(TableRow);

export default function N1_Voca_Lesson_Table(props) {

    const classes = useStyles();
    const { columns, rows, indexProps } = props;
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        setSelected(indexProps);
    }, [indexProps]);

    const handleRowChange = (index) => {
        props.handleRowChange(index);
        setSelected(index);
    }

    const cell = (column, value) => {
        if (column.id === 'finished') {
            return (
                <div>
                    {value ?
                        <div className={classes.finished}>完了</div>
                        :
                        <div className={classes.notFinished}>勉強中</div>}
                </div>
            );
        } else {
            return (column.format && typeof value === 'number' ? column.format(value) : value);
        }
    }

    const tableCell = (columns, rows) => {
        if (rows.length > 0) {
            return (rows.map((row, index) => {
                const isItemSelected = selected == index ? true : false;
                return (
                    <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        onClick={() => handleRowChange(index)}
                        selected={isItemSelected}
                        className={classes.tableRow}
                    >
                        {columns.map((column) => {
                            let value = row[column.id];
                            return (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    className={column.id == "word" ? classes.tableCellWord : classes.tableCell}
                                >
                                    {column.id == "id" ? index + 1 : cell(column, value)}
                                </TableCell>
                            );
                        })}
                    </StyledTableRow>
                );
            }))
        }
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    className={classes.tableCell}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableCell(columns, rows)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
