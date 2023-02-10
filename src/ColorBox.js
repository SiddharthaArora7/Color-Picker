import React, { Component } from 'react'
import "./ColorBox.css"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';

class ColorBox extends Component {
  constructor(props){
    super(props)
    this.state = {copied : false}
    this.changecopystate = this.changecopystate.bind(this);
  }
  changecopystate(){
    this.setState({copied: true}, () =>{
      setTimeout( ()=> this.setState({copied: false}),1500);
    });
  }
  render() {
    const {name, background , colorId, paletteId , showLink} = this.props;
    const{copied} = this.state;
    const isDarkColor = chroma(background).luminance()<=0.08
    const isLightColor = chroma(background).luminance()>=0.6
    return (
      <CopyToClipboard text={background} onCopy={this.changecopystate}>
      <div style={{ background }} className='ColorBox'>
        <div style={{background}} className= {`copy-layover ${copied && 'show'}`}/>
        <div className={`copy-msg ${copied && 'show'}`}>
          <h1>copied!!!</h1>
          <p className ={isLightColor && 'dark-text'}>{this.props.background}</p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <span className={isDarkColor && 'light-text'}>{name}</span>
          </div>
          <button className={`copy-button ${isLightColor && 'dark-text'}` }>Copy</button>
        </div>
        {showLink && (
        <Link to={`/palette/${paletteId}/${colorId}`} onClick={e=>e.stopPropagation()}>
        <span className={`see-more ${isLightColor && 'dark-text'}` }>More</span>
        </Link>
        )}
      </div>
      </CopyToClipboard>
    )
  }
}
export default ColorBox;