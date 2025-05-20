import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import playIcon from './assets/play icon.png';
import pauseIcon from './assets/stop icon.png';
import shuffleIcon from './assets/shuffle w honey icon.png';
import beeImage from './assets/bee.png';
import BubbleSortQuiz from './BubbleSortQuiz';

function BubbleSortVisualizer() {
  const [arr, setArr] = useState([]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
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
  const timeoutRef = useRef(null);
  const beeImageRef = useRef(new Image());
  const navigate = useNavigate();

  useEffect(() => {
    beeImageRef.current.src = beeImage;
  }, []);

  const drawArray = (array, highlight1 = -1, highlight2 = -1, showBee = true) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFF9C4';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / array.length;

    array.forEach((value, index) => {
      const barHeight = value * 2.6;
      const x = index * barWidth;
      const y = canvas.height - barHeight;

      ctx.fillStyle =
        index === highlight1 || index === highlight2 ? '#FFD700' : '#5a3019';
      ctx.fillRect(x, y, barWidth - 2, barHeight);

      if (
        showBee &&
        (index === highlight1 || index === highlight2)
      ) {
        const smallerIndex =
          array[highlight1] < array[highlight2] ? highlight1 : highlight2;
        if (index === smallerIndex) {
          const beeX = x + (barWidth - 35) / 2;
          const beeY = canvas.height - ((array[highlight1] + array[highlight2]) * 2.6) / 2 - 45;
          ctx.drawImage(beeImageRef.current, beeX, beeY, 35, 35);
        }
      }
    });
  };

  const initializeArray = (newArr = null) => {
    const array = newArr || Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);
    setArr(array);
    setI(0);
    setJ(0);
    setIsSorted(false);
    drawArray(array);
  };

  const shuffleArray = () => {
    const shuffledArr = [...arr];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    initializeArray(shuffledArr);
  };

  const handleArraySizeChange = (e) => {
    const newSize = Number(e.target.value);
    setArraySize(newSize);
    initializeArray();
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmitUserInput = () => {
    const inputArray = userInput
      .split(',')
      .map((str) => parseInt(str.trim(), 10))
      .filter((num) => !isNaN(num));
    if (inputArray.length > 0) {
      initializeArray(inputArray);
    } else {
      alert('Invalid input! Please enter numbers separated by commas.');
    }
  };

  const startSorting = () => setIsSorting(true);
  const stopSorting = () => {
    setIsSorting(false);
    clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (!isSorting) return;

    const bubbleSortStep = () => {
      const newArr = [...arr];

      if (i < newArr.length - 1) {
        if (j < newArr.length - 1 - i) {
          if (newArr[j] > newArr[j + 1]) {
            [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
            setArr(newArr);
          }
          setJ(j + 1);
        } else {
          setJ(0);
          setI(i + 1);
        }
      } else {
        setIsSorting(false);
        setIsSorted(true);
        clearTimeout(timeoutRef.current);
        return;
      }

      drawArray(newArr, j, j + 1, true);
      timeoutRef.current = setTimeout(bubbleSortStep, sortDelay);
    };

    timeoutRef.current = setTimeout(bubbleSortStep, sortDelay);
    return () => clearTimeout(timeoutRef.current);
  }, [isSorting, i, j, arr, sortDelay]);

  useEffect(() => {
    initializeArray();
    if (autoStart) startSorting();
  }, [autoStart, arraySize]);

  const handleQuizComplete = (userScore) => {
    setScore(userScore);
    if (userScore >= 8) {
      alert('✅ Quiz Passed! You unlocked the next algorithms.');
      setQuizPassed(true);
    } else {
      alert('❌ You need at least 8/10 to pass.');
    }
    setShowQuiz(false);
  };

  return (
    <div className="visualizer-container">
      <h2 style={{ textAlign: 'center' }}>Bubble Sort Visualizer</h2>

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
        Bubble Sort is a basic comparison-based sorting algorithm.
        It repeatedly compares adjacent elements and swaps them if needed.
        The process continues until no swaps are required, indicating the list is sorted. <br />
        While simple, its <strong>O(n²)</strong> complexity makes it inefficient for large datasets.
      </p>

      {isSorted && !quizPassed && !showQuiz && (
        <button className="quiz-button" onClick={() => setShowQuiz(true)}>
          Go to Test
        </button>
      )}

      {showQuiz && (
        <div className="quiz-container">
          <BubbleSortQuiz onComplete={handleQuizComplete} />
        </div>
      )}

      {quizPassed && (
        <div className="unlocked">
          <h3>✅ Merge Sort unlocked!</h3>
          <button onClick={() => navigate('/merge-sort')}>Go to Merge Sort</button>
        </div>
      )}
    </div>
  );
}

export default BubbleSortVisualizer;
