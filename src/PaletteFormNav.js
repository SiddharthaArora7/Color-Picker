import React from 'react'
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import PaletteMetaForm from './PaletteMetaForm';
import './PaletteFormNav.css'

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: 'center',
  height: "64px",
  backgroundColor: "#f5f5f5",
  color: 'black',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function PaletteFormNav(props) {

  const { open } = props
  const [formShowing, setformShowing] = React.useState(false)
  const showForm = () => {
    setformShowing(true)
  }
  const hideForm = () => {
    setformShowing(false)
  }
   return (
    <div className='paletteFormNav'>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <AddToPhotosIcon/>
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create A Palette
          </Typography>

        </Toolbar>
        <div className='navBtns'>
          <Link to="/">
            <Button variant='contained' color='error' >Go Back</Button>
          </Link>
          <Button className='savebtn' variant="contained" onClick={showForm}>
          Save
        </Button>
        </div>
      </AppBar>
      {formShowing && (
          <PaletteMetaForm palettes={props.palettes} handleSubmit={props.handleSubmit} hideForm={hideForm}/>
      )}
    </div>
  )
}
export default PaletteFormNav