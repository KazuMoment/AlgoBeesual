import { useState } from 'react';

const questions = [
  {
    question: 'What is the worst-case time complexity of Merge Sort?',
    options: ['O(n log n)', 'O(n^2)', 'O(n)'],
    answer: 0,
  },
  {
    question: 'What is the main strategy used in Merge Sort?',
    options: ['Greedy', 'Divide and Conquer', 'Backtracking'],
    answer: 1,
  },
  {
    question: 'Is Merge Sort a stable sorting algorithm?',
    options: ['Yes', 'No', 'Sometimes'],
    answer: 0,
  },
  {
    question: 'Which of the following is true about Merge Sort?',
    options: ['It sorts in-place', 'It uses extra space', 'It works only for small arrays'],
    answer: 1,
  },
  {
    question: 'What is the best-case time complexity of Merge Sort?',
    options: ['O(n log n)', 'O(n^2)', 'O(log n)'],
    answer: 0,
  },
  {
    question: 'Which operation is expensive in Merge Sort?',
    options: ['Splitting the array', 'Merging arrays', 'Comparing elements'],
    answer: 1,
  },
  {
    question: 'How much extra space does Merge Sort typically require?',
    options: ['O(n)', 'O(1)', 'O(log n)'],
    answer: 0,
  },
  {
    question: 'Which sorting algorithm is most similar in concept to Merge Sort?',
    options: ['Quick Sort', 'Bubble Sort', 'Insertion Sort'],
    answer: 0,
  },
  {
    question: 'Merge Sort is most efficient for...',
    options: ['Small datasets', 'Already sorted data', 'Large datasets'],
    answer: 2,
  },
  {
    question: 'What happens after recursively dividing the array in Merge Sort?',
    options: ['It shuffles the parts', 'It merges them in sorted order', 'It deletes them'],
    answer: 1,
  },
];

function MergeSortQuiz({ onComplete }) {
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
      <h3>Merge Sort Quiz</h3>
      <p>{questions[current].question}</p>
      {questions[current].options.map((opt, i) => (
        <button key={i} onClick={() => handleAnswer(i)}>
          {opt}
        </button>
      ))}
    </div>
  );
}

export default MergeSortQuiz;
