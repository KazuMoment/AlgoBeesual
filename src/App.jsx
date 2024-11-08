import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from '@mui/material';
import './index.css'
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

function App() {
  const [open, setOpen] = useState(false);  // State to control the open/close of the drawer

  // Toggle drawer open and close
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* AppBar for the header */}
      <AppBar position="fixed" sx={{ backgroundColor: '#0C2626' }}>
        <Toolbar disableGutters>
          <Button color="inherit" onClick={toggleDrawer}>
            <MenuIcon/>
          </Button>
          <h2 className='supermercado'
          >
            AlgoBeesual
          </h2>
        </Toolbar>
      </AppBar>

      {/* Main content area */}
      <div style={{ marginTop: '80px', padding: '20px' }}>
        <Typography variant="h4">Main Content</Typography>
        <p>Click the button in the top-left to toggle the drawer!</p>
      </div>

      {/* Temporary Drawer */}
      <Drawer
        anchor="left"       // Position the drawer on the left side (can be "top", "right", "bottom" as well)
        open={open}         // Whether the drawer is open or not
        onClose={toggleDrawer} // Close the drawer when clicking outside or on escape key
        variant="temporary" // Use temporary variant (slides in/out)
        ModalProps={{
          keepMounted: true, // Better performance on mobile devices
        }}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#CC9918', // Set the drawer's background color
            color: 'white', // Text color
          },
        }}
      >
        {/* Drawer contents */}
        <div style={{ width: 250 }}>
          <List>
            <ListItem button onClick={toggleDrawer}>
              <HomeIcon sx={{marginRight:'20px'}}/>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem>
              <ListItemText sx={{
                textAlign: 'center'}}    
                primary={<Typography sx={{ fontSize: '20px', color: '#D3D3D3' }}>Sorting Algorithms</Typography>} />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText
               primary="Bubble Sort"
               sx={{ marginRight: '16px' }} />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Quick Sort" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Merge Sort" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );

}

export default App;

