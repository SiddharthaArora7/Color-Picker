import React,{memo} from 'react'
import { useNavigate } from 'react-router-dom'
import { Delete } from '@mui/icons-material';
import "./Minipalette.css"

function Minipalette(props){
    const history = useNavigate();
    const { paletteName, emoji , colors, id} = props;
    console.log(paletteName);
    const handleClick = e => {
      e.preventDefault();
      history(`/palette/${id}`);
  }
    const miniColorBoxes = colors.map(color=>{
       return <div
       className='minicolor'
        style={{backgroundColor: color.color}}
        key={color.name}
        ></div>
    })
    const deletePalette = (e) =>{
      e.stopPropagation();
      props.handleDelete(props.id)
    }
    return (
      <div className='main' onClick={handleClick}>
        <Delete className='delete-icon' onClick={deletePalette}/>
        <div className='colors'>{miniColorBoxes}</div>
        <h5 className='title'>
            {paletteName} <span className='emoji'>{emoji}</span>
        </h5>
      </div>
    )
}
export default memo(Minipalette);
