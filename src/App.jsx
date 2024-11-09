import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BubbleSortVisualizer from './BubbleSortVisualizer';  // Import the BubbleSortVisualizer
import InsertionSortVisualizer from './InsertionSortVisualizer';
import MergeSortVisualizer from './MergeSortVisualizer';
import SelectionSortVisualizer from './SelectionSortVisualizer';

function App() {
    const [open, setOpen] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);  // Track selected algorithm

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
            <div style={{ marginTop: '80px', padding: '20px' }}>
                {selectedAlgorithm === 'bubbleSort' && <BubbleSortVisualizer />}  {/* Render BubbleSortVisualizer when selected */}
                {selectedAlgorithm === 'insertionSort' && <InsertionSortVisualizer />}
                {selectedAlgorithm === 'mergeSort' && <MergeSortVisualizer />}
                {selectedAlgorithm === 'selectionSort' && <SelectionSortVisualizer />}
                {selectedAlgorithm === null && <Typography variant="h4">Welcome to AlgoBeesual! Select an algorithm to visualize.</Typography>}  {/* Default view */}
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
