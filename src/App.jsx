import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BubbleSortVisualizer from './BubbleSortVisualizer';
import InsertionSortVisualizer from './InsertionSortVisualizer';
import MergeSortVisualizer from './MergeSortVisualizer';
import SelectionSortVisualizer from './SelectionSortVisualizer';
import Home from './Home';
import './App.css';

// -------------------------------------------
// Navigation + Layout Component
// -------------------------------------------
function NavigationWrapper() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);

  const handleSelection = (route) => {
    navigate(route);
    setOpen(false);
  };

  return (
    <>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          background: 'linear-gradient(to right, #FFB02E, #5A3019)',
          color: '#FFFBE6',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              onClick={toggleDrawer}
              sx={{
                minWidth: 0,
                padding: 0,
                marginRight: '10px',
                '&:hover': { backgroundColor: 'transparent' },
              }}
            >
              <MenuIcon
                sx={{
                  fontSize: '2rem',
                  color: '#FFFBE6',
                  '&:hover': { color: '#CC9918' },
                }}
              />
            </Button>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              AlgoBeesual
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
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
            <img
              src="src/assets/logo.png"
              alt="Logo"
              style={{ width: '80px', height: '80px', objectFit: 'contain', marginBottom: '10px' }}
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

          {/* Navigation List */}
          <List sx={{ padding: 0 }}>
            {[
              { label: 'Home', path: '/' },
              { label: 'Bubble Sort', path: '/bubble-sort' },
              { label: 'Insertion Sort', path: '/insertion-sort' },
              { label: 'Merge Sort', path: '/merge-sort' },
              { label: 'Selection Sort', path: '/selection-sort' },
            ].map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleSelection(item.path)}
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

      {/* Routed Views */}
      <div
        style={{
          marginTop: '80px',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bubble-sort" element={<BubbleSortVisualizer />} />
          <Route path="/insertion-sort" element={<InsertionSortVisualizer />} />
          <Route path="/merge-sort" element={<MergeSortVisualizer />} />
          <Route path="/selection-sort" element={<SelectionSortVisualizer />} />
        </Routes>
      </div>
    </>
  );
}

// -------------------------------------------
// Root App Component with Router
// -------------------------------------------
function App() {
  return (
    <Router>
      <NavigationWrapper />
    </Router>
  );
}

export default App;
