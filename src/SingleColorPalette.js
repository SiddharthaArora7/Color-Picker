import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Palettefooter from './Palettefooter';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default class SingleColorPalette extends Component {
  constructor(props){
    super(props);
    this._shades = this.generateShades(this.props.palette, this.props.colorId)
    this.state = {format: "hex"}
    this.changeformat = this.changeformat.bind(this);
  }
  generateShades(palette, colortofilterby){
    let shades = [];
    let allColors = palette.colors;
    for(let key in allColors){
      shades = shades.concat(
        allColors[key].filter(color => color.id=== colortofilterby)
      )
    }
    return shades.slice(1);
  }
  changeformat(val){
    this.setState({format: val});
  }
  render() {
    const {format} = this.state;
    const {paletteName, emoji, id} = this.props.palette
    const colorBoxes = this._shades.map(color =>{
      return <ColorBox key={color.name} 
      name={color.name} 
      background={color[format]} 
      showLink={false}/>
    })
    return (
      <div className='SingleColorPalette Palette'>
      <Navbar handlechange = {this.changeformat} showingAllColors={false}/>
        <div className='Palette-colors'>
          {colorBoxes}
          <div className='go-back ColorBox'>
            <Link to={`/palette/${id}`} className='back-button'>Go back</Link>
          </div>
        </div>
        <Palettefooter paletteName={paletteName} emoji={emoji}/>
      </div>
    )
  }
}
