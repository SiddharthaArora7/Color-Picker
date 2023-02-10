import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Palettefooter from './Palettefooter';
import "./Palette.css"

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: 'hex' }
    this.changelevel = this.changelevel.bind(this);
    this.changeformat = this.changeformat.bind(this);
  }
  changelevel(level) {
    this.setState({ level });
  }
  changeformat(val){
    this.setState({format: val});
  }
  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format } = this.state;
    const colorboxes = colors[level].map(color => (
      <ColorBox background={color[format]} name={color.name} key={color.id} colorId={color.id} paletteId={id} showLink={true}/>
    ));
    return (
      <div className='Palette'>
      < Navbar level={level} changelevel={this.changelevel} handlechange = {this.changeformat} showingAllColors={true}/>
        <div className='Palette-colors'>{colorboxes}</div>
      <Palettefooter paletteName={paletteName} emoji={emoji}/>
      </div>
    )
  }
}
export default Palette;
