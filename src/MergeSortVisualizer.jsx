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

  // Shuffle the array and render it
  const shuffleArray = () => {
    const shuffledArr = [...arr];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]]; // Swap elements
    }
    setArr(shuffledArr);
    setStep(0);
    setAnimations([]);
    drawArray(shuffledArr);
  };

  // Handle array size change
  const handleArraySizeChange = (event) => {
    setArraySize(Number(event.target.value));
    initializeArray();  // Call initializeArray here to reflect changes immediately
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
      // Add the current elements being compared to the animations
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

    // Concatenate remaining elements and update animations
    result = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    animations.push({
      leftIdx: -1, // No more elements to compare
      rightIdx: -1, // No more elements to compare
      result: [...result]
    });

    return result;
  };

  // Step through the animations for visualization
  useEffect(() => {
    if (!isSorting || animations.length === 0) return;

    const animate = () => {
      if (step < animations.length) {
        const { leftIdx, rightIdx, result } = animations[step];
        setArr(result); // Update array for each step
        drawArray(result, leftIdx, rightIdx); // Draw each step on the canvas with highlights
        setStep((prevStep) => prevStep + 1); // Move to the next step
      } else {
        cancelAnimationFrame(animationFrameId.current); // Stop when fully sorted
        setIsSorting(false);
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [animations, isSorting, step]);

  // Draw array on the canvas with red for elements being compared/merged
  const drawArray = (array, leftIdx = null, rightIdx = null) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    array.forEach((value, index) => {
      // Highlight elements being compared (either left or right index)
      if (index === leftIdx || index === rightIdx) {
        ctx.fillStyle = 'red'; // Color for elements being compared or merged
      } else {
        ctx.fillStyle = 'teal'; // Default color for other elements
      }
      ctx.fillRect(index * (canvas.width / array.length), canvas.height - value * 2, (canvas.width / array.length) - 2, value * 2);
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="number"
            value={arraySize}
            onChange={handleArraySizeChange}
            min="5"
            max="50"
            style={{ padding: '5px' }}
          />
          <button type="button" onClick={initializeArray} style={{ padding: '5px', marginLeft: '5px' }}>
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

export default MergeSortVisualizer;
