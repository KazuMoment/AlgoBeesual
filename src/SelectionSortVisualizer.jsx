import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import playIcon from './assets/play icon.png';
import pauseIcon from './assets/stop icon.png';
import shuffleIcon from './assets/shuffle w honey icon.png';
import beeImage from './assets/bee.png'; 
import { useNavigate } from 'react-router-dom';
import SelectionSortQuiz from './SelectionSortQuiz';

function SelectionSortVisualizer() {
  const [arr, setArr] = useState([]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(1);
  const [minIdx, setMinIdx] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [arraySize, setArraySize] = useState(15);
  const [sortDelay, setSortDelay] = useState(100); 
  const [autoStart, setAutoStart] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [score, setScore] = useState(0);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const navigate = useNavigate();

  // Initialize array
  const initializeArray = (newArr = null) => {
    const array = newArr || Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);
    setArr(array);
    setI(0);
    setJ(1);
    setMinIdx(0);
    setIsSorted(false);
    drawArray(array);
  };

  // Shuffle array
  const shuffleArray = () => {
    const shuffledArr = [...arr];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    initializeArray(shuffledArr);
  };

  // Sorting controls
  const startSorting = () => {
    setIsSorting(true);
    setIsSorted(false);
  };

  const stopSorting = () => {
    setIsSorting(false);
    clearTimeout(animationFrameId.current);
  };

  // Event handlers
  const handleArraySizeChange = (event) => {
    const newSize = Number(event.target.value);
    setArraySize(newSize);
    initializeArray();
  };

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmitUserInput = () => {
    const inputArray = userInput
      .split(',')
      .map((str) => parseInt(str.trim(), 10))
      .filter((num) => !isNaN(num));

    if (inputArray.length > 0) {
      initializeArray(inputArray);
    } else {
      alert("Invalid input! Please enter numbers separated by commas.");
    }
  };

  // Sorting algorithm
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
        setIsSorting(false);
        setIsSorted(true);
        clearTimeout(animationFrameId.current);
      }

      drawArray(newArr);
      animationFrameId.current = setTimeout(selectionSortStep, sortDelay);
    };

    animationFrameId.current = setTimeout(selectionSortStep, sortDelay);

    return () => clearTimeout(animationFrameId.current);
  }, [arr, i, j, minIdx, isSorting, sortDelay]);

  // Drawing the array
  const drawArray = (array) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#FFF9C4'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height); 

    array.forEach((value, index) => {
      ctx.fillStyle = index === minIdx ? '#FFD700' : '#5a3019'; 
      ctx.fillRect(index * (canvas.width / array.length), canvas.height - value * 3, (canvas.width / array.length) - 2, value * 3); 

      if (isSorting && index === minIdx) {
        const barWidth = canvas.width / array.length;
        const x = index * barWidth;
        const beeX = x + (barWidth - 40) / 2; 
        const beeY = canvas.height - value * 3 - 50; 
        ctx.drawImage(beeImageElement, beeX, beeY, 35, 35); 
      }
    });
  };

  const beeImageElement = new Image();
  beeImageElement.src = beeImage;

  // Initialize on mount
  useEffect(() => {
    initializeArray();
    if (autoStart) {
      startSorting();
    }
  }, [autoStart, arraySize]);

  // Redraw when array changes
  useEffect(() => {
    drawArray(arr);
  }, [arr]);

  // Quiz completion handler
  const handleQuizComplete = (userScore) => {
    setScore(userScore);
    if (userScore >= 8) {
      alert('✅ Quiz Passed! You unlocked the next algorithm.');
      setQuizPassed(true);
    } else {
      alert('❌ You need at least 8/10 to pass. Try again!');
      setShowQuiz(false);
    }
  };

  return (
    <div className="visualizer-container">
      <h2 style={{ textAlign: 'center' }}>Selection Sort Visualizer</h2>

      <div className="controls">
        <label>
          Array Size: {arraySize}
          <div className="slider-container">
            <span className="slider-label">5</span>
            <input
              type="range"
              value={arraySize}
              onChange={handleArraySizeChange}
              min="5"
              max="50"
            />
            <span className="slider-label">50</span>
          </div>
        </label>

        <label>
          Sorting Speed (ms): {sortDelay}
          <div className="slider-container">
            <span className="slider-label">10</span>
            <input
              type="range"
              value={sortDelay}
              onChange={(e) => setSortDelay(Number(e.target.value))}
              min="10"
              max="1000"
              step="10"
            />
            <span className="slider-label">1000</span>
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

        <div>
          <label>Custom Array (comma separated):</label>
          <input
            type="text"
            value={userInput}
            onChange={handleUserInputChange}
            placeholder="Enter numbers separated by commas"
          />
          <button onClick={handleSubmitUserInput}>Submit</button>
        </div>

        <div className="control-button">
          <button onClick={startSorting} disabled={isSorting || isSorted}>
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
        Selection Sort is an in-place comparison-based algorithm that repeatedly selects the smallest element from the unsorted part of the list and swaps it with the leftmost unsorted element. Its <strong>O(n²)</strong> complexity makes it inefficient for large datasets.
      </p>

      {isSorted && !quizPassed && !showQuiz && (
        <button 
          className="quiz-button" 
          onClick={() => setShowQuiz(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            margin: '20px auto',
            display: 'block'
          }}
        >
          Go to Test 
        </button>
      )}

      {showQuiz && (
        <div 
          className="quiz-container"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            overflowY: 'auto',
            padding: '20px'
          }}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '2rem',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <SelectionSortQuiz onComplete={handleQuizComplete} />
          </div>
        </div>
      )}

      {quizPassed && (
        <div 
          className="unlocked" 
          style={{
            textAlign: 'center',
            margin: '20px 0',
            padding: '15px',
            backgroundColor: '#e8f5e9',
            borderRadius: '5px'
          }}
        >
          <h3>✅ Merge Sort Unlocked!</h3>
          <p>You scored {score}/10 on the quiz</p>
          <button 
            onClick={() => navigate('/merge-sort')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '10px'
            }}
          >
            Go to Merge Sort
          </button>
        </div>
      )}
    </div>
  );
}

export default SelectionSortVisualizer;