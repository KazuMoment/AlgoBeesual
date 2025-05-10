import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import playIcon from './assets/play icon.png';
import pauseIcon from './assets/stop icon.png';
import shuffleIcon from './assets/shuffle w honey icon.png';
import beeImage from './assets/bee.png'; 

function SelectionSortVisualizer() {
  const [arr, setArr] = useState([]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(1);
  const [minIdx, setMinIdx] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [arraySize, setArraySize] = useState(15);
  const [sortDelay, setSortDelay] = useState(100); 
  const [autoStart, setAutoStart] = useState(true);
  const [userInput, setUserInput] = useState('');
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  const initializeArray = (newArr) => {
    setArr(newArr);
    setI(0);
    setJ(1);
    setMinIdx(0);
    setIsSorted(false);
    drawArray(newArr);
  };

  const shuffleArray = () => {
    const shuffledArr = [...arr];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    setArr(shuffledArr);
    setI(0);
    setJ(1);
    setMinIdx(0);
    setIsSorted(false);
    drawArray(shuffledArr);
  };

  const startSorting = () => {
    setIsSorting(true);
    setIsSorted(false);
  };

  const stopSorting = () => {
    setIsSorting(false);
    clearTimeout(animationFrameId.current);
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

    const selectionSortStep = () => {
      const newArr = [...arr];

      if (i < newArr.length - 1) {
        if (j < newArr.length) {
          if (newArr[j] < newArr[minIdx]) {
            setMinIdx(j);
          }
          setJ(j + 1);
        } else {
          [newArr[i], newArr[minIdx]] = [newArr[minIdx], newArr[i]];
          setArr(newArr);
          setI(i + 1);
          setJ(i + 2);
          setMinIdx(i + 1);
        }
      } else {
        setIsSorting(false);
        setIsSorted(true);
        clearTimeout(animationFrameId.current);
      }

      drawArray(newArr);
      animationFrameId.current = setTimeout(selectionSortStep, sortDelay);
    };

    animationFrameId.current = setTimeout(selectionSortStep, sortDelay);

    return () => clearTimeout(animationFrameId.current);
  }, [arr, i, j, minIdx, isSorting, sortDelay]);

  const drawArray = (array) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#FFF9C4'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
  

    array.forEach((value, index) => {
      ctx.fillStyle = index === minIdx ? '#FFD700' : '#5a3019'; 
      ctx.fillRect(index * (canvas.width / array.length), canvas.height - value * 3, (canvas.width / array.length) - 2, value * 3); 

      if (isSorting && index === minIdx) {
        const barWidth = canvas.width / array.length;
        const barHeight = value * 2.6;
        const x = index * barWidth;
        const y = canvas.height - barHeight;

        const beeX = x + (barWidth - 40) / 2; 
        const beeY = y - 50; 

        ctx.drawImage(beeImageElement, beeX, beeY, 35, 35); 
      }
    });
  };

  const beeImageElement = new Image();
  beeImageElement.src = beeImage;

  useEffect(() => {
    initializeArray(Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1));
    if (autoStart) {
      startSorting();
    }
  }, [autoStart, arraySize]);

  useEffect(() => {
    drawArray(arr);
  }, [arr]);

  return (
    <div className="visualizer-container">
      <div className="controls">
        <label>
          Array Size: {arraySize}
          <input
            type="range"
            value={arraySize}
            onChange={handleArraySizeChange}
            min="5"
            max="50"
          />
        </label>

        <label>
          Sorting Speed (ms): {sortDelay}
          <input
            type="range"
            value={sortDelay}
            onChange={(e) => setSortDelay(Number(e.target.value))}
            min="10"
            max="1000"
            step="10"
          />
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
        Selection Sort is an in-place comparison-based algorithm that repeatedly selects the smallest element from the unsorted part of the list and swaps it with the leftmost unsorted element. Its <strong> \( O(n^2) \) </strong> complexity makes it inefficient for large datasets.
      </p>
    </div>
  );
}

export default SelectionSortVisualizer;
