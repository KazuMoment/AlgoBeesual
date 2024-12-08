import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import playIcon from './assets/play icon.png';
import pauseIcon from './assets/stop icon.png';
import shuffleIcon from './assets/shuffle w honey icon.png';

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
    
    // Set the background color
    ctx.fillStyle = '#FFF9C4'; // Set canvas background color (light yellow)
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with the background color
    
    // Draw the array elements
    array.forEach((value, index) => {
      if (index === leftIdx || index === rightIdx) {
        ctx.fillStyle = '#FFD700'; // Golden Yellow for comparisons
      } else {
        ctx.fillStyle = '#5a3019'; // Dark Honey Brown for normal elements
      }
      
      // Draw the rectangle representing the array element
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
            onChange={handleArraySizeChange}
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
          <button onClick={startSorting} disabled={isSorting}>
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
        Merge Sort is an efficient, divide-and-conquer sorting algorithm. It works by recursively
        splitting the array into smaller subarrays, sorting them, and then merging them back together.
        The time complexity is O(n log n), making it suitable for larger datasets.
      </p>
    </div>
  );
}

export default MergeSortVisualizer;
