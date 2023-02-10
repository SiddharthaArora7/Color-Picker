import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import DraggableColorBox from './DraggableColorBox';
import { useNavigate } from 'react-router-dom';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import seedColors from './seedColors';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const DrawerContainer = styled('div')(({ theme }) => ({
  width:"90%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%"
}))

export default function NewpaletteForm(props) {
  const [open, setOpen] = React.useState(true);
  const [colors, AddColor] = React.useState(seedColors[0].colors);
  const history = useNavigate();



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    AddColor(colors => [...colors, newColor])
  };


  const handleSubmit = (newpalette) => {
    const Palette = {
      paletteName: newpalette.paletteName,
      emoji: newpalette.emoji,
      id: newpalette.paletteName.toLowerCase().replace(/ /g, '-'),
      colors: colors
    }
    props.savePalette(Palette);
    history('/');
  }

  const clearColors = () => {
    AddColor([])
  }

  const removeColor = (colorName) => {
    const newChosen = colors.filter(color => color.name !== colorName)
    AddColor([...newChosen])
  }
  const addRandomColor = () => {
    const allColors = props.palettes.map(p => p.colors).flat()
    let rand;
    let randomColor;
    let isDuplicatecolor = true;
    while(isDuplicatecolor){
       rand = Math.floor(Math.random() * allColors.length);
       randomColor = allColors[rand];
       isDuplicatecolor = colors.some(color =>color.name === randomColor.name);
       console.log(randomColor);
    }
    AddColor(colors => [...colors, randomColor])
  }

  const paletteIsFull = colors.length >= props.maxColor;
  return (
    <Box sx={{ display: 'flex' }}>
      <PaletteFormNav open={open} palettes={props.palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerContainer>
        <Typography variant='h4'>New Palette</Typography>
        <div > 
        <Button variant='contained' color='error' onClick={clearColors}>Clear Palette</Button>
        <Button  variant='contained' color='primary' disabled={paletteIsFull} onClick={addRandomColor}>Random Color</Button>
        </div>
        <ColorPickerForm
          palettes={props.palettes}
          paletteIsFull={paletteIsFull}
          addNewColor={addNewColor}
          colors={colors} />
          </DrawerContainer>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {colors.map(color => {
          return <DraggableColorBox color={color.color} name={color.name} handleClick={() => removeColor(color.name)} />
        })}
      </Main>
    </Box>
  );
}
NewpaletteForm.defaultProps = {
  maxColor: 20
}