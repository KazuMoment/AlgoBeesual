import React from 'react';
import './App.css';
import logo from './assets/logo.png';

function Home() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '60px 40px',
        maxWidth: '1400px',
        margin: '0 auto',
        flexWrap: 'wrap',
        minHeight: '100vh', // Ensure container takes full viewport height
      }}
    >
      {/* Logo container - adjusted for vertical alignment */}
      <div
        style={{
          flex: '0 0 auto',
          marginRight: '50px',
          alignSelf: 'center', // Vertically center with content
          marginTop: '150px',  // Push both logo and content down
        }}
      >
        <img
          src={logo}
          alt="AlgoBeesual Logo"
          style={{
            width: '280px',
            height: 'auto',
            marginLeft: '40px',
          }}
        />
      </div>

      {/* Text section - moved down */}
      <div
        style={{
          flex: '1',
          textAlign: 'left',
          minWidth: '0px',
          marginTop: '200px', // Matches logo's marginTop
        }}
      >
        <h1
          style={{
            fontFamily: 'Quicksand, sans-serif',
            color: '#5a3019',
            fontSize: '3rem',
            marginBottom: '0px',
          }}
        >
          Welcome to AlgoBeesual!
        </h1>

        <p
          style={{
            fontFamily: 'Quicksand, sans-serif',
            color: '#5a3019',
            fontSize: '1.3rem',
            marginBottom: '10px',
          }}
        >
          Visualize sorting algorithms in action. Learn how algorithms like Bubble Sort, Merge Sort, and more work through interactive animations.
        </p>

        <p
          style={{
            fontFamily: 'Quicksand, sans-serif',
            color: '#5a3019',
            fontSize: '1.2rem',
            marginBottom: '20px',
          }}
        >
          See algorithms step-by-step and compare their performance with different data sets.
        </p>

        <h3
          style={{
            fontFamily: 'Quicksand, sans-serif',
            color: '#5a3019',
            fontSize: '1.6rem',
            marginBottom: '10px',
          }}
        >
          Key Features:
        </h3>
        <ul
          style={{
            fontFamily: 'Quicksand, sans-serif',
            color: '#5a3019',
            fontSize: '1.2rem',
            listStyleType: 'circle',
            marginLeft: '20px',
            marginBottom: '30px',
          }}
        >
          <li>Interactive algorithm visualizations</li>
          <li>Step-by-step explanations</li>
          <li>Compare algorithm efficiency</li>
        </ul>

        <h3
          style={{
            fontFamily: 'Quicksand, sans-serif',
            color: '#5a3019',
            fontSize: '1.6rem',
            marginBottom: '20px',
          }}
        >
          Start Exploring!
        </h3>
        <p
          style={{
            fontFamily: 'Quicksand, sans-serif',
            color: '#5a3019',
            fontSize: '1.2rem',
          }}
        >
          Select an algorithm from the menu to see it in action!
        </p>
      </div>
    </div>
  );
}

export default Home;