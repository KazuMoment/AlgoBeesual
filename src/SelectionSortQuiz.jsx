// SelectionSortQuiz.js
import { useState } from 'react';

const questions = [
  {
    question: 'What is the worst-case time complexity of Selection Sort?',
    options: ['O(n^2)', 'O(n log n)', 'O(n)'],
    answer: 0,
  },
  {
    question: 'Selection Sort is based on which sorting paradigm?',
    options: ['Divide and Conquer', 'Greedy', 'Dynamic Programming'],
    answer: 1,
  },
  {
    question: 'Which of the following is true about Selection Sort?',
    options: ['It is a stable sort', 'It requires additional memory', 'It does not require additional memory'],
    answer: 2,
  },
  {
    question: 'How many swaps does Selection Sort perform in the worst case?',
    options: ['O(n)', 'O(n^2)', 'O(log n)'],
    answer: 0,
  },
  {
    question: 'Is Selection Sort stable by default?',
    options: ['Yes', 'No', 'Sometimes'],
    answer: 1,
  },
  {
    question: 'What is the best-case time complexity of Selection Sort?',
    options: ['O(n^2)', 'O(n)', 'O(n log n)'],
    answer: 0,
  },
  {
    question: 'Which is a major disadvantage of Selection Sort?',
    options: ['It is unstable', 'It is not easy to implement', 'It has high time complexity'],
    answer: 2,
  },
  {
    question: 'How does Selection Sort find the minimum element?',
    options: ['Recursively', 'Linearly', 'Using a heap'],
    answer: 1,
  },
  {
    question: 'What happens after the minimum element is found?',
    options: ['It is deleted', 'It is swapped with the first unsorted element', 'Nothing'],
    answer: 1,
  },
  {
    question: 'What is the space complexity of Selection Sort?',
    options: ['O(1)', 'O(n)', 'O(log n)'],
    answer: 0,
  },
];

function SelectionSortQuiz({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));

  const handleOptionClick = (optionIdx) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[current] = optionIdx;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      const finalScore = selectedAnswers.reduce(
        (acc, answer, idx) => acc + (answer === questions[idx].answer ? 1 : 0),
        0
      );
      setScore(finalScore);
      setShowResults(true);
      onComplete(finalScore);
    }
  };

  const handleExit = () => {
    onComplete(0);
  };

  return (
    <div style={{ padding: '2rem', background: '#f9f9f9', minHeight: '100vh' }}>
      <div
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '2rem',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        {showResults ? (
          <h3 style={{ textAlign: 'center' }}>Thank you for completing the test!</h3>
        ) : (
          <>
            <h4 style={{ marginBottom: '1rem' }}>
              Question {current + 1} of {questions.length}
            </h4>
            <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
              {questions[current].question}
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginTop: '1rem',
              }}
            >
              {questions[current].options.map((option, idx) => {
                const isSelected = selectedAnswers[current] === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    style={{
                      cursor: 'pointer',
                      padding: '12px 16px',
                      borderRadius: '6px',
                      border: isSelected ? '2px solid #0d6efd' : '1px solid #ccc',
                      backgroundColor: isSelected ? '#e7f1ff' : '#f8f9fa',
                      transition: '0.2s ease-in-out',
                    }}
                  >
                    {option}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <button
                onClick={handleExit}
                style={{
                  padding: '0.4rem 0.8rem',
                  backgroundColor: '#e0e0e0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Exit this Test
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[current] === null}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor:
                    selectedAnswers[current] === null ? '#aaa' : '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: selectedAnswers[current] === null ? 'not-allowed' : 'pointer',
                }}
              >
                {current === questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SelectionSortQuiz;
