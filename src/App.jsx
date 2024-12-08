import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BubbleSortVisualizer from './BubbleSortVisualizer';  // Import the BubbleSortVisualizer
import InsertionSortVisualizer from './InsertionSortVisualizer';
import MergeSortVisualizer from './MergeSortVisualizer';
import SelectionSortVisualizer from './SelectionSortVisualizer';
import Home from './Home';
import './App.css';  // Make sure the styles match

function App() {
    const [open, setOpen] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('home');  // Default is 'home'

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
            <AppBar
    position="fixed"
    sx={{
        background: 'linear-gradient(to right, #FFB02E, #5A3019)', // Honey gold to dark honey brown gradient
        color: '#FFFBE6', // Soft cream color for contrast
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Slightly deeper shadow for depth
    }}
>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        {/* Left Section - Burger Icon and Title */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Burger Icon */}
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
                        color: '#FFFBE6', // Cream for better visibility
                        '&:hover': {
                            color: '#CC9918', // Brighter golden yellow on hover
                        },
                    }}
                />
            </Button>

            {/* Title */}
            <Typography
                variant="h6"
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: '#FFFBE6', // Matches the bee theme
                    letterSpacing: '1px', // Slight spacing for elegance
                }}
            >
                AlgoBeesual
            </Typography>
        </div>
    </Toolbar>
</AppBar>




            {/* Main content area */}
            <div style={{
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

            <Drawer
    anchor="left"
    open={open}
    onClose={toggleDrawer}
    variant="temporary"
    sx={{
        '& .MuiDrawer-paper': {
            backgroundColor: '#1B1B1B',  // Darker background for a more refined look
            color: '#FFD54F',  // Honey yellow text for contrast
            borderTopRightRadius: '40px',
            borderBottomRightRadius: '40px',
            padding: '20px',
            width: '260px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',  // Darker shadow for a more subtle look
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
                borderBottom: '2px solid #FFD54F',  // Golden yellow border for contrast
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: 'bold',
                    color: 'black',  // Changed to black for text color
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
                        backgroundColor: '#333',  // Dark background for items
                        color: '#FFD54F',  // Yellow text
                        '&:hover': {
                            backgroundColor: '#444',  // Slightly lighter on hover
                            transform: 'scale(1.03)', // Slight scale effect for interaction
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
