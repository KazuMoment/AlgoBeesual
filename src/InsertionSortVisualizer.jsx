import React, { useState, useEffect, useRef } from 'react';

function InsertionSortVisualizer() {
  const [arr, setArr] = useState([]);
  const [i, setI] = useState(1);
  const [j, setJ] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(15);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  // Initialize array with random values
  const initializeArray = () => {
    const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);
    setArr(newArr);
    setI(1);
    setJ(0);
  };

  // Start sorting
  const startSorting = () => {
    setIsSorting(true);
  };

  // Stop sorting
  const stopSorting = () => {
    setIsSorting(false);
    cancelAnimationFrame(animationFrameId.current);
  };

  // Reset the array and sorting state
  const reset = () => {
    setIsSorting(false);
    initializeArray();
  };

  // Handle array size change
  const handleArraySizeChange = (event) => {
    setArraySize(Number(event.target.value));
  };

  // Handle array size submit
  const handleArraySizeSubmit = (event) => {
    event.preventDefault();
    initializeArray();
  };

  // Insertion Sort step-by-step
  useEffect(() => {
    if (!isSorting) return;

    const insertionSortStep = () => {
      const newArr = [...arr];
      
      // Insertion sort logic
      if (i < newArr.length) {
        if (j < i) {
          if (newArr[i] < newArr[j]) {
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]]; // Swap
            setArr(newArr);
          }
          setJ(j + 1);
        } else {
          setI(i + 1);
          setJ(0);
        }
      } else {
        cancelAnimationFrame(animationFrameId.current); // Stop when sorted
      }

      drawArray(newArr);
      animationFrameId.current = requestAnimationFrame(insertionSortStep);
    };

    animationFrameId.current = requestAnimationFrame(insertionSortStep);

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [arr, i, j, isSorting]);

  // Draw array on the canvas
  const drawArray = (array) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    array.forEach((value, index) => {
      ctx.fillStyle = 'teal';
      ctx.fillRect(index * (canvas.width / array.length), canvas.height - value * 2, (canvas.width / array.length) - 2, value * 2);
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <form onSubmit={handleArraySizeSubmit}>
          <input
            type="number"
            value={arraySize}
            onChange={handleArraySizeChange}
            min="5"
            max="50"
            style={{ padding: '5px' }}
          />
          <button type="submit" style={{ padding: '5px', marginLeft: '5px' }}>
            Set Array Size
          </button>
        </form>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <button onClick={startSorting} disabled={isSorting}>Start Sorting</button>
        <button onClick={stopSorting} disabled={!isSorting}>Stop Sorting</button>
        <button onClick={reset}>Reset</button>
      </div>

      <canvas ref={canvasRef} width={500} height={300}></canvas>
    </div>
  );
}

export default InsertionSortVisualizer;
