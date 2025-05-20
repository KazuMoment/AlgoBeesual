import { useState } from 'react';

const InsertionSortQuiz = ({ onComplete }) => {
  const questions = [
    {
      question: 'What is the average-case time complexity of Insertion Sort?',
      options: ['O(n)', 'O(n log n)', 'O(n^2)'],
      answer: 'O(n^2)',
    },
    {
      question: 'Insertion Sort is best suited for:',
      options: ['Large datasets', 'Reversed lists', 'Small or nearly sorted datasets'],
      answer: 'Small or nearly sorted datasets',
    },
    {
      question: 'What technique does Insertion Sort use?',
      options: ['Divide and conquer', 'Greedy method', 'Incremental insertion'],
      answer: 'Incremental insertion',
    },
    {
      question: 'Which of the following is true about Insertion Sort?',
      options: ['It is unstable', 'It is adaptive', 'It requires extra space'],
      answer: 'It is adaptive',
    },
    {
      question: 'What is the best-case time complexity of Insertion Sort?',
      options: ['O(n)', 'O(n^2)', 'O(log n)'],
      answer: 'O(n)',
    },
    {
      question: 'Insertion Sort performs comparisons:',
      options: ['Only once per element', 'Until the correct position is found', 'After the sort is done'],
      answer: 'Until the correct position is found',
    },
    {
      question: 'Which data structure is mainly used in Insertion Sort?',
      options: ['Heap', 'Array', 'Queue'],
      answer: 'Array',
    },
    {
      question: 'What is the worst-case scenario for Insertion Sort?',
      options: ['Already sorted list', 'Random order', 'Reversely sorted list'],
      answer: 'Reversely sorted list',
    },
    {
      question: 'Is Insertion Sort a stable algorithm?',
      options: ['Yes', 'No', 'Only for integers'],
      answer: 'Yes',
    },
    {
      question: 'Which sorting algorithm is closest in behavior to Insertion Sort?',
      options: ['Merge Sort', 'Bubble Sort', 'Selection Sort'],
      answer: 'Bubble Sort',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleOptionClick = (option) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = option;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = selectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].answer ? 1 : 0);
      }, 0);
      setShowResults(true);
      onComplete(score);
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
              Question {currentQuestion + 1} of {questions.length}
            </h4>
            <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
              {questions[currentQuestion].question}
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginTop: '1rem',
              }}
            >
              {questions[currentQuestion].options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQuestion] === option;
                return (
                  <div
                    key={idx}
                    onClick={() => handleOptionClick(option)}
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
                disabled={selectedAnswers[currentQuestion] === null}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor:
                    selectedAnswers[currentQuestion] === null ? '#aaa' : '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: selectedAnswers[currentQuestion] === null ? 'not-allowed' : 'pointer',
                }}
              >
                {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InsertionSortQuiz;
