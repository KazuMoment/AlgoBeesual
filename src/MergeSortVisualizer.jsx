import React, { useState, useEffect, useRef } from 'react';

function MergeSortVisualizer() {
  const [arr, setArr] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(15);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const [step, setStep] = useState(0);
  const [animations, setAnimations] = useState([]);

  // Initialize array with random values
  const initializeArray = () => {
    const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);
    setArr(newArr);
    setStep(0);
    setAnimations([]);
  };

  // Start sorting
  const startSorting = () => {
    setIsSorting(true);
    const newAnimations = [];
    mergeSort([...arr], newAnimations);
    setAnimations(newAnimations);
    setStep(0); // Reset to the beginning of the animation
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

  // Merge Sort function
  const mergeSort = (array, animations) => {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    const sortedLeft = mergeSort(left, animations);
    const sortedRight = mergeSort(right, animations);

    return merge(sortedLeft, sortedRight, animations);
  };

  // Merge function to merge two sorted arrays
  const merge = (left, right, animations) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      animations.push([leftIndex, rightIndex]); // Add animation for the indices being compared
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    // Concatenate remaining elements
    result = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));

    // Push the result array into animations for visualization
    animations.push(result);
    return result;
  };

  // Step through the animations for visualization
  useEffect(() => {
    if (!isSorting || animations.length === 0) return;

    const animate = () => {
      if (step < animations.length) {
        const newArr = [...arr];
        const animationStep = animations[step];

        if (Array.isArray(animationStep)) {
          if (animationStep.length === 2) {
            // Comparison step (highlight the indices being compared)
            const [leftIdx, rightIdx] = animationStep;
            drawArray(newArr, leftIdx, rightIdx);
          } else {
            // Merge step (update the entire array)
            setArr(animationStep);
          }
        }

        setStep(step + 1);
      } else {
        cancelAnimationFrame(animationFrameId.current); // Stop when fully sorted
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [arr, animations, isSorting, step]);

  // Draw array on the canvas
  const drawArray = (array, leftIdx = null, rightIdx = null) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    array.forEach((value, index) => {
      if (index === leftIdx || index === rightIdx) {
        ctx.fillStyle = 'red'; // Highlighting compared elements
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
        <button onClick={reset}>Reset</button>
      </div>

      <canvas ref={canvasRef} width={500} height={300}></canvas>
    </div>
  );
}

export default MergeSortVisualizer;
