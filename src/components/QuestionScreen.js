import React from 'react';
import Options from './Options';

export default function QuestionScreen({ question }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}
