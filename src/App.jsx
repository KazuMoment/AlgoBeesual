import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BubbleSortVisualizer from './BubbleSortVisualizer';  // Import the BubbleSortVisualizer
import InsertionSortVisualizer from './InsertionSortVisualizer';
import MergeSortVisualizer from './MergeSortVisualizer';
import SelectionSortVisualizer from './SelectionSortVisualizer';
import Home from './home';
import './App.css';


function App() {
    const [open, setOpen] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('home');  // Set 'home' as the default

    const toggleDrawer = () => setOpen(!open);

    // Handle item selection from the drawer
    const handleSelection = (algorithm) => {
        console.log("Selected Algorithm: ", algorithm);  // Debugging log
        setSelectedAlgorithm(algorithm);
        setOpen(false);  // Close the drawer after selection
    };

    return (
        <div>
            {/* AppBar for the header */}
            <AppBar position="fixed" sx={{ backgroundColor: '#0C2626' }}>
                <Toolbar disableGutters>
                    <Button color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </Button>
                    <Typography variant="h6" sx={{ marginLeft: 2 }}>
                        AlgoBeesual
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Main content area */}
            <div        style={{
                    marginTop: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 'calc(100vh - 80px)', // Account for AppBar height
                    padding: '20px',
                }}>
                {selectedAlgorithm === 'bubbleSort' && <BubbleSortVisualizer />}
                {selectedAlgorithm === 'insertionSort' && <InsertionSortVisualizer />}
                {selectedAlgorithm === 'mergeSort' && <MergeSortVisualizer />}
                {selectedAlgorithm === 'selectionSort' && <SelectionSortVisualizer />}
                {selectedAlgorithm === 'home' && <Home />}  {/* Display Home component */}
            </div>

            {/* Drawer */}
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer}
                variant="temporary"
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#CC9918',
                        color: 'white',
                    },
                }}
            >
                <div style={{ width: 250 }}>
                    <List>
                        <ListItem button onClick={() => handleSelection("home")}>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button onClick={() => handleSelection("bubbleSort")}>
                            <ListItemText primary="Bubble Sort" />
                        </ListItem>
                        <ListItem button onClick={() => handleSelection("quickSort")}>
                            <ListItemText primary="Quick Sort" />
                        </ListItem>
                        <ListItem button onClick={() => handleSelection("mergeSort")}>
                            <ListItemText primary="Merge Sort" />
                        </ListItem>
                        <ListItem button onClick={() => handleSelection("selectionSort")}>
                            <ListItemText primary="Selection Sort" />
                        </ListItem>
                        <ListItem button onClick={() => handleSelection("insertionSort")}>
                            <ListItemText primary="Insertion Sort" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>

        </div>
    );
}

export default App;
