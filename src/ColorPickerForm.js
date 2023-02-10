import React from 'react'
import { ChromePicker } from 'react-color';
import { Button } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useEffect } from 'react';
import './ColorPickerForm.css'

function ColorPickerForm(props) {
    const {paletteIsFull} = props
    const [currentColor, setcolor] = React.useState("teal");
    const [name, setName] = React.useState({newColorName: "", newPaletteName: ""});

   
    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", value => {
          return props.colors.every(
            ({ name }) => name.toLowerCase() !== value.toLowerCase()
          );
        });
        ValidatorForm.addValidationRule("isColorUnique", value => {
          return props.colors.every(
            ({ color }) => color !== currentColor
          );
        });
      });

    const updateCurrentColor = (newColor) => {
        setcolor(newColor.hex);
      };
      const handleChange = (evt) =>{
        setName({
          ...name , [evt.target.name]: evt.target.value
        })
      }
      const handleSubmit = () => {
        const newColor = {
            color: currentColor,
            name: name.newColorName
        }
        props.addNewColor(newColor)
        setName({newColorName: ""})
      }
    
    return (
      <div>
        <ChromePicker className='picker' color={currentColor} onChangeComplete={updateCurrentColor} />
        <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
          <TextValidator value={name.newColorName} 
          className='colorNameInput' placeholder='Color Name' name = "newColorName" variant='filled' margin='normal' onChange={handleChange} 
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['Enter a Color Name', 'Color Name Must be Unique', 'Color Must be Unique']}/>
          <Button className='addColor' variant='contained' disabled={paletteIsFull} color='primary' type='submit' style={{backgroundColor: paletteIsFull? 'grey' : currentColor}}>
            {paletteIsFull? "Palette Full": "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    )
}
export default ColorPickerForm
