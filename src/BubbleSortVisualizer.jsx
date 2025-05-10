import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import playIcon from './assets/play icon.png';
import pauseIcon from './assets/stop icon.png';
import shuffleIcon from './assets/shuffle w honey icon.png';
import beeImage from './assets/bee.png'; 

function BubbleSortVisualizer() {
  const [arr, setArr] = useState([]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [arraySize, setArraySize] = useState(15);
  const [sortDelay, setSortDelay] = useState(100);
  const [autoStart, setAutoStart] = useState(true);
  const [userInput, setUserInput] = useState(''); 
  const canvasRef = useRef(null);
  const timeoutRef = useRef(null);

  const initializeArray = (newArr) => {
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
    initializeArray(Array.from({ length: newSize }, () => Math.floor(Math.random() * 100) + 1));
  };

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmitUserInput = () => {
    const inputArray = userInput
      .split(',')
      .map((str) => parseInt(str.trim(), 10))
      .filter((num) => !isNaN(num));

    if (inputArray.length > 0) {
      initializeArray(inputArray);
    } else {
      alert("Invalid input! Please enter numbers separated by commas.");
    }
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
    initializeArray(Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1));
    if (autoStart) {
      startSorting();
    }
  }, [autoStart, arraySize]);

  const beeImageElement = new Image();
  beeImageElement.src = beeImage;

  const drawArray = (array) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');


    ctx.fillStyle = '#FFF9C4'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height); 

    array.forEach((value, index) => {
      if (isSorting && (index === j || index === j + 1)) {
        ctx.fillStyle = '#FFD700';
      } else {
        ctx.fillStyle = '#5a3019'; 
      }
      const barWidth = canvas.width / array.length;
      const barHeight = value * 2.6;
      const x = index * barWidth;
      const y = canvas.height - barHeight;

     
      ctx.fillRect(x, y, barWidth - 2, barHeight);

    
      if (isSorting && (index === j || index === j + 1)) {
        const smallerBarIndex = arr[j] < arr[j + 1] ? j : j + 1; 
        if (index === smallerBarIndex) {
          const otherBarHeight = arr[j] < arr[j + 1] ? arr[j + 1] * 2.6 : arr[j] * 2.6; 
          const beeX = x + (barWidth - 40) / 2; 
          const beeY = canvas.height - (barHeight + otherBarHeight) / 2 - 60; 
          ctx.drawImage(beeImageElement, beeX, beeY, 35, 35); 
        }
      }
    });
  };
  

  useEffect(() => {
    drawArray(arr);
  }, [arr]);

  return (
    <div className="visualizer-container" style={{ position: 'relative' }}>
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

        {/* Input for custom array */}
        <div>
          <label>Custom Array (comma separated):</label>
          <input
            type="text"
            value={userInput}
            onChange={handleUserInputChange}
            placeholder="Enter numbers separated by commas"
          />
          <button onClick={handleSubmitUserInput}>Submit</button>
        </div>
  
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
