import React, { useState, useEffect, useRef } from 'react';

function SelectionSortVisualizer() {
  const [arr, setArr] = useState([]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(1);
  const [minIdx, setMinIdx] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(15);
  const [sortDelay, setSortDelay] = useState(100); // Sorting delay in milliseconds
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  const initializeArray = (size = arraySize) => {
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArr(newArr);
    setI(0);
    setJ(1);
    setMinIdx(0);
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
    drawArray(shuffledArr);
  };

  const startSorting = () => {
    setIsSorting(true);
  };

  const stopSorting = () => {
    setIsSorting(false);
    cancelAnimationFrame(animationFrameId.current);
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
        cancelAnimationFrame(animationFrameId.current);
        setIsSorting(false);
      }

      drawArray(newArr);
      animationFrameId.current = setTimeout(selectionSortStep, sortDelay); // Use setTimeout with sortDelay
    };

    animationFrameId.current = setTimeout(selectionSortStep, sortDelay);

    return () => clearTimeout(animationFrameId.current);
  }, [arr, i, j, minIdx, isSorting, sortDelay]);

  const drawArray = (array) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    array.forEach((value, index) => {
      ctx.fillStyle = index === minIdx ? 'red' : 'teal';
      ctx.fillRect(index * (canvas.width / array.length), canvas.height - value * 2, (canvas.width / array.length) - 2, value * 2);
    });
  };

  const handleArraySizeChange = (event) => {
    const newSize = Number(event.target.value);
    setArraySize(newSize);
    initializeArray(newSize);
  };

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

      <canvas ref={canvasRef} width={arraySize * 40} height={200}></canvas>

      <div style={{ marginTop: '10px' }}>
        <button onClick={startSorting} disabled={isSorting}>
          Start Sorting
        </button>
        <button onClick={stopSorting} disabled={!isSorting}>
          Stop Sorting
        </button>
        <button onClick={shuffleArray}>Shuffle</button>
      </div>
    </div>
  );
}

export default SelectionSortVisualizer;
