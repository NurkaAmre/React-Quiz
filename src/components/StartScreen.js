import React from 'react';

export default function StartScreen({ numQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <button>Start Quiz</button>
    </div>
  );
}
