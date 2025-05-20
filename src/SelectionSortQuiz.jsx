// SelectionSortQuiz.js
import  { useState } from 'react';

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

  const handleAnswer = (index) => {
    if (index === questions[current].answer) setScore(score + 1);
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      onComplete(score + (index === questions[current].answer ? 1 : 0));
    }
  };

  return (
    <div className="quiz">
      <h3>Selection Sort Quiz</h3>
      <p>{questions[current].question}</p>
      {questions[current].options.map((opt, i) => (
        <button key={i} onClick={() => handleAnswer(i)}>{opt}</button>
      ))}
    </div>
  );
}

export default SelectionSortQuiz;
