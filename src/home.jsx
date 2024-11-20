import React from 'react';
import './home.css';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to AlgoBeesual!</h1>
      <p>
        This project provides visualizations of popular sorting algorithms.
        Explore and learn how algorithms like Bubble Sort, Insertion Sort, and others work by visualizing them in real-time.
      </p>
      <p>
        Select an algorithm from the menu to see it in action!
      </p>
    </div>
  );
}

export default Home;
