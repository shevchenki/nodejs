import React, { useState, useEffect, useRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import apiCaller from './../../utils/apiCaller';

const useStyles = makeStyles({
    root: {
        width: '100%',
        // height: 530,
        backgroundColor: "#F4F4F4",
    },
    formControl: {
        position: 'relative',
        width: '85%',
        marginTop: 2,
        marginLeft: 15,
        borderRadius: 25,
        textAlign: 'center',
        backgroundColor: "#F37727",
        border: '1px solid none',
    },
    search: {
        display: 'flex',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 25,
    },
    input: {
        flex: 1,
        marginLeft: 20,
    },
    iconButton: {
        padding: 10,
    },
    content: {
        height: 450,
        marginTop: 7,
        marginLeft: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    cntHeader: {
        display: 'flex',
    },
    contentWord: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 0,
        color: 'red',
    },
    contentKana: {
        paddingTop: 0,
        paddingLeft: 10,
    },
    contentCnt: {
        whiteSpace: 'pre-line',
        paddingTop: 10,
        paddingLeft: 10,
    },
    dialogTitle: {
        width: 400,
        color: '#fff',
        backgroundColor: "#F37727",
    },
    container: {
        maxHeight: 300,
        backgroundColor: "#fff",
    }
});

const BootstrapInput = withStyles((theme) => ({
    input: {
        // position: 'relative',
        backgroundColor: "#F37727",
        border: '1px solid none',
        borderRadius: 25,
        color: '#fff',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
    },
    focused: {
        borderRadius: 25,
        backgroundColor: "red",
        border: '1px solid none',
        outline: 'none'
    },
}))(InputBase);

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

export default function Search() {

    const classes = useStyles();
    const [searchValue, setSearchValue] = useState('javi');
    const [wordSearch, setWordSearch] = useState('');
    const [wordContent, setWordContent] = useState('');

    const [listNote, setListNote] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function search2() {
            const result = await apiCaller('/search/' + searchValue + '/漢字', 'GET', null);
            setWordContent(result.data.data);
        }
        search2();
        async function getNote() {
            const result = await apiCaller('/note', 'GET', null);
            setListNote(result.data.data);
        }
        getNote();
    }, []);

    async function search() {
        const result = await apiCaller('/search/' + searchValue + '/' + String(wordSearch), 'GET', null);
        setWordContent(result.data.data);
    }

    const onKeyPress = (event) => {
        if (event.key === 'Enter') onSearch();
    }

    const onSearch = () => {
        search();
    }

    const handleChange = (event) => {
        setWordSearch(event.target.value);
    }

    const selectChange = (event) => {
        setSearchValue(event.target.value);
    }

    const onAddToLearn = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Paper className={classes.root} elevation={0}>
            <Grid container>
                <Grid item xs={2}>
                    <FormControl className={classes.formControl}>
                        <Select
                            value={searchValue}
                            onChange={selectChange}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value={'javi'}>Japan-Vietnam</MenuItem>
                            <MenuItem value={'vija'}>VietNam-Japan</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.search} >
                        <InputBase
                            className={classes.input}
                            placeholder="Search Vocabulary"
                            inputProps={{ 'aria-label': 'search vocabulary' }}
                            onChange={handleChange}
                            onKeyPress={onKeyPress}
                        />
                        <IconButton
                            type="submit"
                            className={classes.iconButton}
                            aria-label="search"
                            onClick={() => onSearch()}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={8}>
                    <Paper className={classes.content} elevation={0}>
                        {wordContent.length > 0 ?
                            <div>
                                <Paper className={classes.cntHeader} elevation={0}>
                                    <Typography variant={'h5'} className={classes.contentWord}>
                                        {wordContent[0].word}
                                    </Typography>
                                    <IconButton
                                        type="submit"
                                        className={classes.iconButton}
                                        aria-label="search"
                                        onClick={() => onAddToLearn()}
                                    >
                                        <AddCircleIcon style={{ color: "#F37727" }} />
                                    </IconButton>
                                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                        <DialogTitle className={classes.dialogTitle}>
                                            テーマ
                                        </DialogTitle>
                                        <DialogContent>
                                            <TableContainer className={classes.container}>
                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableBody>
                                                        {listNote.map((row, index) => (
                                                            <TableRow key={index} style={{ display: 'flex' }}>
                                                                <TableCell component="th" scope="row" style={{ flex: 1 }}>
                                                                    {row.theme}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <IconButton
                                                                        onClick={() => onAddToLearn()}
                                                                        style={{ padding: 0, margin: 0 }}
                                                                    >
                                                                        <NoteAddIcon style={{ color: "#F37727" }} />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus onClick={handleClose} color="primary">
                                                Close
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Paper>
                                <Typography className={classes.contentKana}>
                                    {wordContent[0].kana}
                                </Typography>
                                <Typography className={classes.contentCnt}>
                                    {wordContent[0].content}
                                </Typography>
                            </div>
                            :
                            <Typography variant={'h5'} className={classes.contentCnt}>
                                Không tìm thấy kết quả!
                            </Typography>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
}
