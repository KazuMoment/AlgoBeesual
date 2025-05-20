import { useState } from 'react';

const questions = [
  {
    question: 'What is the time complexity of Bubble Sort in the worst case?',
    options: ['O(n)', 'O(n^2)', 'O(n log n)'],
    answer: 'O(n^2)',
  },
  {
    question: 'Bubble Sort is an example of what type of algorithm?',
    options: ['Greedy', 'Comparison-based', 'Dynamic programming'],
    answer: 'Comparison-based',
  },
  {
    question: 'When does Bubble Sort stop iterating?',
    options: [
      'After n iterations',
      'When no swaps are needed in a full pass',
      'After sorting the first half',
    ],
    answer: 'When no swaps are needed in a full pass',
  },
  {
    question: 'How many elements are compared in one full pass of Bubble Sort?',
    options: ['n(n-1)/2', 'n-1', 'Depends on the data'],
    answer: 'n-1',
  },
  {
    question: 'Which of the following is true about Bubble Sort?',
    options: [
      'It is not stable',
      'It is easy to implement',
      'It works well with large datasets',
    ],
    answer: 'It is easy to implement',
  },
  {
    question: 'Bubble Sort compares:',
    options: ['Each element with every other', 'Adjacent elements', 'Only the middle elements'],
    answer: 'Adjacent elements',
  },
  {
    question: 'How many passes will Bubble Sort make to ensure sorting?',
    options: ['n^2', 'n', 'Depends on the input'],
    answer: 'n',
  },
  {
    question: 'Bubble Sort is best suited for:',
    options: ['Already sorted or nearly sorted data', 'Huge datasets', 'Sorting strings only'],
    answer: 'Already sorted or nearly sorted data',
  },
  {
    question: 'Which of the following is true?',
    options: [
      'Bubble Sort uses a stack',
      'Bubble Sort can be optimized with a flag to stop early',
      'Bubble Sort requires extra space',
    ],
    answer: 'Bubble Sort can be optimized with a flag to stop early',
  },
  {
    question: 'Which sorting algorithm is generally faster than Bubble Sort?',
    options: ['Merge Sort', 'Insertion Sort', 'All of the above'],
    answer: 'All of the above',
  },
];

const BubbleSortQuiz = ({ onComplete }) => {
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

export default BubbleSortQuiz;