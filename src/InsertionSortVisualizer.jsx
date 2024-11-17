import React, { useState, useEffect, useRef } from 'react';

function InsertionSortVisualizer() {
  const [arr, setArr] = useState([]);
  const [i, setI] = useState(1);
  const [j, setJ] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(15);
  const [sortDelay, setSortDelay] = useState(100); 
  const [autoStart, setAutoStart] = useState(true); 
  const canvasRef = useRef(null);
  const timeoutRef = useRef(null);

  
  const initializeArray = (size = arraySize) => {
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArr(newArr);
    setI(1);
    setJ(0);
    drawArray(newArr); 
  };

  
  const startSorting = () => {
    setIsSorting(true);
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
    setI(1);
    setJ(0);
    drawArray(shuffledArr); 
  };

 
  const handleArraySizeChange = (event) => {
    const newSize = Number(event.target.value);
    setArraySize(newSize);
    initializeArray(newSize); 
  };

  
  useEffect(() => {
    if (!isSorting) return;

    const insertionSortStep = () => {
      const newArr = [...arr];
      
      
      if (i < newArr.length) {
        if (j < i) {
          if (newArr[i] < newArr[j]) {
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]]; 
            setArr(newArr);
          }
          setJ(j + 1);
        } else {
          setI(i + 1);
          setJ(0);
        }
      } else {
        clearTimeout(timeoutRef.current); 
      }

      drawArray(newArr);
      timeoutRef.current = setTimeout(insertionSortStep, sortDelay); 
    };

    timeoutRef.current = setTimeout(insertionSortStep, sortDelay);

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
      if (index === i || index === j) {
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
      <div style={{ marginBottom: '10px' }}>
        <label>
          Array Size: {arraySize}
          <input
            type="range"
            value={arraySize}
            onChange={handleArraySizeChange}
            min="5"
            max="50"
            style={{ marginLeft: '10px', verticalAlign: 'middle' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Sorting Speed (ms): {sortDelay}
          <input
            type="range"
            value={sortDelay}
            onChange={(e) => setSortDelay(Number(e.target.value))}
            min="10"
            max="1000"
            step="10"
            style={{ marginLeft: '10px', verticalAlign: 'middle' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Auto-Start Sorting:
          <input
            type="checkbox"
            checked={autoStart}
            onChange={(e) => setAutoStart(e.target.checked)}
            style={{ marginLeft: '10px', verticalAlign: 'middle' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <button onClick={startSorting} disabled={isSorting}>Start Sorting</button>
        <button onClick={stopSorting} disabled={!isSorting}>Stop Sorting</button>
        <button onClick={shuffleArray}>Shuffle</button>
      </div>

      <canvas ref={canvasRef} width={500} height={300}></canvas>
    </div>
  );
}

export default InsertionSortVisualizer;
