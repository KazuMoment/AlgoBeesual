import React, { useState, useEffect, useRef } from 'react';

function SelectionSortVisualizer() {
  const [arr, setArr] = useState([]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [minIdx, setMinIdx] = useState(null);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(15);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  const initializeArray = () => {
    const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);
    setArr(newArr);
    setI(0);
    setJ(0);
    setMinIdx(null);
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
          if (newArr[j] < newArr[minIdx] || minIdx === null) {
            setMinIdx(j);
          }
          setJ(j + 1);
        } else {
          [newArr[i], newArr[minIdx]] = [newArr[minIdx], newArr[i]];
          setArr(newArr);
          setI(i + 1);
          setJ(i + 2);
          setMinIdx(null);
        }
      } else {
        cancelAnimationFrame(animationFrameId.current);
      }

      drawArray(newArr);
      animationFrameId.current = requestAnimationFrame(selectionSortStep);
    };

    animationFrameId.current = requestAnimationFrame(selectionSortStep);

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [arr, i, j, minIdx, isSorting]);

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
    setArraySize(Number(event.target.value));
  };

  const handleArraySizeSubmit = (event) => {
    event.preventDefault();
    initializeArray();
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

      <canvas ref={canvasRef} width={arraySize * 40} height={200}></canvas>

      <div style={{ marginTop: '10px' }}>
        <button onClick={startSorting} disabled={isSorting}>
          Start Sorting
        </button>
        <button onClick={stopSorting} disabled={!isSorting}>
          Stop Sorting
        </button>
        <button onClick={initializeArray}>Restart</button>
      </div>
    </div>
  );
}

export default SelectionSortVisualizer;
