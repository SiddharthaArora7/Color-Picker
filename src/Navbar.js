import React, { Component } from 'react'
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "./Navbar.css"

export default class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {format: "hex", open: false};
    this.handleformatchange = this.handleformatchange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  handleformatchange(e){
    this.setState({format: e.target.value, open: true});
    this.props.handlechange(e.target.value);
  }
  closeSnackbar(){
    this.setState({open: false});
  }
  render() {
    const{ level, changelevel, showingAllColors }  = this.props;
    const{ format } = this.state;
    return (
      <header className='Navbar'>
        <div className='logo'>
          <Link to="/">reactcolorpicker</Link>
        </div>
        {showingAllColors &&( 
        <div className='slider-container'>
            <span>Level:{level}</span>
        <div className='slider'>
          <Slider defaultValue={level} min={100} max={900} step={100} onChange={changelevel} />
        </div>
        </div>
        )}
        <div className='select-container'>
            <Select value={format} onChange={this.handleformatchange}>
                <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
                <MenuItem value='rgba'>RGBA - rgba(255,255,255, 1)</MenuItem>
            </Select>
        </div>
        <Snackbar
        anchorOrigin={{vertical:"bottom", horizontal: "left"}}
        open = {this.state.open}
        autoHideDuration={3000}
        message={<span id="message-id">Format Changed!</span>}
        onClose={this.closeSnackbar}
        action={[
          <IconButton onClick={this.closeSnackbar} 
          color='inherit' 
          key='close'
          aria-label='close'
          >
            <CloseIcon/>
          </IconButton>
        ]}

        />
      </header>
    )
  }
}
