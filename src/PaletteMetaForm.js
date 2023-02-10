import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import EmojiPicker from 'emoji-picker-react';



function PaletteMetaForm(props){
    const [stage, setStage] = React.useState("form");
    const [name, setName] = React.useState({ newColorName: "", newPaletteName: "" });

    useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
          return props.palettes.every(
            ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
          );
        });
      })

    const handleChange = (evt) => {
      setName({
        ...name, [evt.target.name]: evt.target.value
      })
    }
    const showEmojiPicker = () => {
        setStage("emoji")
    }
    const savePalette = (emoji) => {
        const newPalette = {
            paletteName: name.newPaletteName, 
            emoji: emoji.emoji
        }
        props.handleSubmit(newPalette)
    }
  

    return (
      <div>
        <Dialog open={stage==="emoji"} onClose={props.hideForm}>
        <DialogTitle>Choose A Palette Emoji</DialogTitle>
        <EmojiPicker onEmojiClick={savePalette}/>
        </Dialog>
        <Dialog open={stage==="form"} onClose={props.hideForm}>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogTitle>Choose A Palette Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Please Enter a name for your beautiful palette. Make Sure it's unique!
            </DialogContentText>
            <TextValidator label="Palette Name"
              value={name.newPaletteName}
              name="newPaletteName"
              onChange={handleChange}
              fullWidth
              margin = 'normal'
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name already used"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.hideForm}>Cancel</Button>
   <Button variant='contained'
              color="secondary"
              type='submit'
            >
              Save Palette</Button>          </DialogActions>
              </ValidatorForm>

        </Dialog>
      </div>
    );
}

export default PaletteMetaForm

