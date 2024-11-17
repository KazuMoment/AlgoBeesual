import React, { useState, useEffect, useRef } from 'react';

function MergeSortVisualizer() {
  const [arr, setArr] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(15);
  const [sortDelay, setSortDelay] = useState(100); 
  const [autoStart, setAutoStart] = useState(true); 
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const [step, setStep] = useState(0);
  const [animations, setAnimations] = useState([]);

  
  const initializeArray = (size = arraySize) => {
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArr(newArr);
    setStep(0);
    setAnimations([]);
    drawArray(newArr); 
  };


  const startSorting = () => {
    setIsSorting(true);
    const newAnimations = [];
    mergeSort([...arr], newAnimations);
    setAnimations(newAnimations);
    setStep(0); 
  };

  
  const stopSorting = () => {
    setIsSorting(false);
    cancelAnimationFrame(animationFrameId.current);
  };

  
  const shuffleArray = () => {
    const shuffledArr = [...arr];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]]; 
    }
    setArr(shuffledArr);
    setStep(0);
    setAnimations([]);
    drawArray(shuffledArr); 
  };


  const handleArraySizeChange = (event) => {
    const newSize = Number(event.target.value);
    setArraySize(newSize);
    initializeArray(newSize); 
  };

 
  const mergeSort = (array, animations) => {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    const sortedLeft = mergeSort(left, animations);
    const sortedRight = mergeSort(right, animations);

    return merge(sortedLeft, sortedRight, animations);
  };

  
  const merge = (left, right, animations) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      animations.push({
        leftIdx: leftIndex,
        rightIdx: rightIndex,
        result: [...result, left[leftIndex], right[rightIndex]]
      });

      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    result = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    animations.push({
      leftIdx: -1,
      rightIdx: -1,
      result: [...result]
    });

    return result;
  };

  
  useEffect(() => {
    if (!isSorting || animations.length === 0) return;

    const animate = () => {
      if (step < animations.length) {
        const { leftIdx, rightIdx, result } = animations[step];
        setArr(result); 
        drawArray(result, leftIdx, rightIdx); 
        setStep((prevStep) => prevStep + 1); 
      } else {
        cancelAnimationFrame(animationFrameId.current); 
        setIsSorting(false);
      }

      animationFrameId.current = setTimeout(animate, sortDelay);
    };

    animationFrameId.current = setTimeout(animate, sortDelay);

    return () => clearTimeout(animationFrameId.current);
  }, [animations, isSorting, step, sortDelay]);

  
  useEffect(() => {
    initializeArray(arraySize); 
    if (autoStart) {
      startSorting();
    }
  }, [autoStart, arraySize]);

  
  const drawArray = (array, leftIdx = null, rightIdx = null) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    array.forEach((value, index) => {
      if (index === leftIdx || index === rightIdx) {
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

export default MergeSortVisualizer;
