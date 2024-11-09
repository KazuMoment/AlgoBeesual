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

  // Shuffle the array and render it
  const shuffleArray = () => {
    const shuffledArr = [...arr];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]]; // Swap elements
    }
    setArr(shuffledArr);
    setI(1);
    setJ(0);
    drawArray(shuffledArr);
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
      if (index === i || index === j) {
        ctx.fillStyle = 'red'; // Highlight the elements being compared/sorted
      } else {
        ctx.fillStyle = 'teal';
      }
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
        <button onClick={shuffleArray}>Shuffle</button>
      </div>

      <canvas ref={canvasRef} width={500} height={300}></canvas>
    </div>
  );
}

export default InsertionSortVisualizer;
