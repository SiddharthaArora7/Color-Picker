import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Minipalette from './Minipalette';
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {blue} from '@mui/material/colors'
import {red} from '@mui/material/colors'
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import "./Palettelist.css"
import { Button } from '@mui/material';

export default class Palettelist extends Component {
    constructor(props){
        super(props)
        this.state = {openDeleteDialog: false, deletingId: "", openResetDialog: false}
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.ResetDialogOpen = this.ResetDialogOpen.bind(this);
        this.Reset = this.Reset.bind(this);
    }
    openDialog(id){
        this.setState({openDeleteDialog: true , deletingId: id});
    }
    closeDialog(){
        this.setState({openDeleteDialog: false, deletingId: "", openResetDialog: false});
    }
    handleDelete(){
        this.props.deletePalette(this.state.deletingId);
        this.closeDialog();
    }
    ResetDialogOpen(){
        this.setState({openResetDialog: true})
    }
    Reset(){
        window.localStorage.clear();
        this.props.resetPalettes();
        this.closeDialog();
    }
    render() {
        const { palettes } = this.props;
        const {openDeleteDialog, openResetDialog } = this.state;
        return (
            <div className='root'>
                <div className='container'> 
                <nav className='nav'>
                <h1>React Colors</h1>
                <div className='createPaletteBtn'>
                <Button  onClick={this.ResetDialogOpen}>Reset</Button>
                <span> |  </span>
                <Link to={'/palette/new'}>Create Palette</Link>
                </div>
                </nav>
                    <TransitionGroup className='palettes'>
                {palettes.map(palette => (
                    <CSSTransition classNames='fade' timeout={500}>
                    <Minipalette {... palette}
                    //  handleDelete = {deletePalette}
                    handleDelete = {this.openDialog}
                     key={palette.id}
                      id={palette.id}/>
                    </CSSTransition>
                ))}
                </TransitionGroup>
                </div>
                <Dialog open={openDeleteDialog} onClose={this.closeDialog}>
                <DialogTitle>Delete this Palette?</DialogTitle>
                <List>
                    <ListItem button onClick={this.handleDelete}>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                            <CheckIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>Delete</ListItemText>
                    </ListItem>
                    <ListItem button onClick={this.closeDialog}> 
                        <ListItemAvatar>
                        <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                            <CloseIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>Cancel</ListItemText>
                    </ListItem>
                </List>
                </Dialog>    
                <Dialog open={openResetDialog}>
                <DialogTitle>Reset Palettes?</DialogTitle>
                <List>
                    <ListItem button onClick={this.Reset}>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                            <CheckIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>Yes</ListItemText>
                    </ListItem>
                    <ListItem button onClick={this.closeDialog}> 
                        <ListItemAvatar>
                        <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                            <CloseIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>No</ListItemText>
                    </ListItem>
                </List>
                </Dialog>    
            </div>
        )
    }
}
