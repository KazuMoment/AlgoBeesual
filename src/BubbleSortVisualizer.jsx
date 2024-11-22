import React, { useState, useEffect, useRef } from 'react';
import './BubbleVisualizer.css';

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    array.forEach((value, index) => {
      if (isSorting && (index === j || index === j + 1)) {
        ctx.fillStyle = 'red';
      } else {
        ctx.fillStyle = 'teal';
      }
      ctx.fillRect(index * (canvas.width / array.length), canvas.height - value * 2, (canvas.width / array.length) - 2, value * 2);
    });
  };

  useEffect(() => {
    drawArray(arr);
  }, [arr]);

  return (
    <div>
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
        <div>
          <button onClick={startSorting} disabled={isSorting || isSorted}>Start Sorting</button>
          <button onClick={stopSorting} disabled={!isSorting}>Stop Sorting</button>
          <button onClick={shuffleArray}>Shuffle</button>
        </div>
      </div>

      <canvas ref={canvasRef} width={500} height={300}></canvas>

      <p className="description">
      Bubble Sort is a basic comparison-based sorting algorithm. 
      It repeatedly compares adjacent elements and swaps them if needed. The process continues until no swaps are required, indicating the list is sorted. 
      While simple, its \( O(n^2) \) complexity makes it inefficient for large datasets.  
      </p>
    </div>
  );
}

export default BubbleSortVisualizer;
