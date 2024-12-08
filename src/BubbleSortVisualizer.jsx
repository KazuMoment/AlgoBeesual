import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import playIcon from './assets/play icon.png';
import pauseIcon from './assets/stop icon.png';
import shuffleIcon from './assets/shuffle w honey icon.png';

function BubbleSortVisualizer() {
  const [arr, setArr] = useState([]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [arraySize, setArraySize] = useState(15);
  const [sortDelay, setSortDelay] = useState(100);
  const [autoStart, setAutoStart] = useState(true);
  const canvasRef = useRef(null);
  const timeoutRef = useRef(null);

  const initializeArray = (size = arraySize) => {
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArr(newArr);
    setI(0);
    setJ(0);
    setIsSorted(false);
    drawArray(newArr);
  };

  const startSorting = () => {
    setIsSorting(true);
    setIsSorted(false);
  };

  const stopSorting = () => {
    setIsSorting(false);
    clearTimeout(timeoutRef.current);
  };

  const shuffleArray = () => {
    const shuffledArr = [...arr];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    setArr(shuffledArr);
    setI(0);
    setJ(0);
    setIsSorted(false);
    drawArray(shuffledArr);
  };

  const handleArraySizeChange = (event) => {
    const newSize = Number(event.target.value);
    setArraySize(newSize);
    initializeArray(newSize);
  };

  useEffect(() => {
    if (!isSorting) return;

    const bubbleSortStep = () => {
      const newArr = [...arr];

      if (i < newArr.length - 1) {
        if (j < newArr.length - 1 - i) {
          if (newArr[j] > newArr[j + 1]) {
            [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
            setArr(newArr);
          }
          setJ(j + 1);
        } else {
          setJ(0);
          setI(i + 1);
        }
      } else {
        setIsSorting(false);
        setIsSorted(true);
        clearTimeout(timeoutRef.current);
      }

      drawArray(newArr);
      timeoutRef.current = setTimeout(bubbleSortStep, sortDelay);
    };

    timeoutRef.current = setTimeout(bubbleSortStep, sortDelay);

    return () => clearTimeout(timeoutRef.current);
  }, [arr, i, j, isSorting, sortDelay]);

  useEffect(() => {
    initializeArray(arraySize);
    if (autoStart) {
      startSorting();
    }
  }, [autoStart, arraySize]);

  const drawArray = (array) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set the background color to a soft honey yellow or white
    ctx.fillStyle = '#FFF9C4'; // Warm pale yellow for the canvas background
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas
    
    array.forEach((value, index) => {
      if (isSorting && (index === j || index === j + 1)) {
        ctx.fillStyle = '#FFD700'; // Dark honey brown for the rectangles
      } else {
        ctx.fillStyle = '#5a3019'; // Default color for other elements
      }
      ctx.fillRect(index * (canvas.width / array.length), canvas.height - value * 2, (canvas.width / array.length) - 2, value * 2);
    });
  };
  

  useEffect(() => {
    drawArray(arr);
  }, [arr]);

  return (
    <div className="visualizer-container">
      <div className="controls">
        <label>
          Array Size: {arraySize}
          <div className="slider-container">
            <span className="slider-label">{5}</span>
            <input
              type="range"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              min="5"
              max="50"
            />
            <span className="slider-label">{50}</span>
          </div>
        </label>
        
        <label>
          Sorting Speed (ms): {sortDelay}
          <div className="slider-container">
            <span className="slider-label">{10}</span>
            <input
              type="range"
              value={sortDelay}
              onChange={(e) => setSortDelay(Number(e.target.value))}
              min="10"
              max="1000"
              step="10"
            />
            <span className="slider-label">{1000}</span>
          </div>
        </label>
        
        <label>
          Auto-Start Sorting:
          <input
            type="checkbox"
            checked={autoStart}
            onChange={(e) => setAutoStart(e.target.checked)}
          />
        </label>
  
        <div className="control-button">
          <button onClick={startSorting} disabled={isSorting || isSorted}>
            <img src={playIcon} alt="Play" className="icon" />
          </button>
          <button onClick={stopSorting} disabled={!isSorting}>
            <img src={pauseIcon} alt="Pause" className="icon" />
          </button>
          <button onClick={shuffleArray}>
            <img src={shuffleIcon} alt="Shuffle" className="icon" />
          </button>
        </div>
      </div>
      <canvas ref={canvasRef} width={500} height={300}></canvas>


      <p className="description">
      Bubble Sort is a basic comparison-based sorting algorithm.
      It repeatedly compares adjacent elements and swaps them if needed. 
      The process continues until no swaps are required, indicating the list is sorted. <br></br> 
      While simple, its <strong> \( O(n^2) \) </strong> complexity makes it inefficient for large datasets.  
      </p>
    </div>
  );
}

export default BubbleSortVisualizer;
