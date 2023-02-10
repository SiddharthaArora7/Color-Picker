import React from 'react'
import './DraggableColorBox.css'
import DeleteIcon from '@mui/icons-material/Delete';

function DraggableColorBox(props){
    return (
      <div className='draggable-box' style={{backgroundColor: props.color}}>
        <div className='boxContent'>
        <span>{props.name}</span>
        <DeleteIcon className='deleteIcon' onClick={props.handleClick}/>
        </div>
      </div>
    )
  }
export default DraggableColorBox