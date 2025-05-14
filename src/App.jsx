import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BubbleSortVisualizer from './BubbleSortVisualizer';
import InsertionSortVisualizer from './InsertionSortVisualizer';
import MergeSortVisualizer from './MergeSortVisualizer';
import SelectionSortVisualizer from './SelectionSortVisualizer';
import Home from './Home';
import './App.css';

function App() {
  const [open, setOpen] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('home');

  const toggleDrawer = () => setOpen(!open);

  const handleSelection = (algorithm) => {
    console.log("Selected Algorithm: ", algorithm);
    setSelectedAlgorithm(algorithm);
    setOpen(false);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          background: 'linear-gradient(to right, #FFB02E, #5A3019)',
          color: '#FFFBE6',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              onClick={toggleDrawer}
              sx={{
                minWidth: 0,
                padding: 0,
                marginRight: '10px',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <MenuIcon
                sx={{
                  fontSize: '2rem',
                  color: '#FFFBE6',
                  '&:hover': {
                    color: '#CC9918',
                  },
                }}
              />
            </Button>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#FFFBE6',
                letterSpacing: '1px',
              }}
            >
              AlgoBeesual
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <div style={{
        marginTop: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '20px',
      }}>
        {selectedAlgorithm === 'bubbleSort' && <BubbleSortVisualizer />}
        {selectedAlgorithm === 'insertionSort' && <InsertionSortVisualizer />}
        {selectedAlgorithm === 'mergeSort' && <MergeSortVisualizer />}
        {selectedAlgorithm === 'selectionSort' && <SelectionSortVisualizer />}
        {selectedAlgorithm === 'home' && <Home />}
      </div>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        variant="temporary"
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#1B1B1B',
            color: '#FFD54F',
            borderTopRightRadius: '40px',
            borderBottomRightRadius: '40px',
            padding: '20px',
            width: '260px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.3s ease',
          },
        }}
      >
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Drawer Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: '10px 0',
              marginBottom: '20px',
              borderBottom: '2px solid #FFD54F',
            }}
          >
            {/* 🐝 Logo */}
            <img
              src="src/assets/logo.png"
              alt="Logo"
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain',
                marginBottom: '10px',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: 'bold',
                color: 'black',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              AlgoBeesual
            </Typography>
          </div>

          {/* Drawer Items */}
          <List sx={{ padding: 0 }}>
            {[
              { label: 'Home', key: 'home' },
              { label: 'Bubble Sort', key: 'bubbleSort' },
              { label: 'Merge Sort', key: 'mergeSort' },
              { label: 'Selection Sort', key: 'selectionSort' },
              { label: 'Insertion Sort', key: 'insertionSort' },
            ].map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleSelection(item.key)}
                sx={{
                  marginBottom: '10px',
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: '#333',
                  color: '#FFD54F',
                  '&:hover': {
                    backgroundColor: '#444',
                    transform: 'scale(1.03)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    textAlign: 'center',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default App;
