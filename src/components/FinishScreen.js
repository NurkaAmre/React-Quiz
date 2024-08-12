import React from 'react';

export default function FinishScreen({ points, maxPoints, highScore }) {
  const percentage = (points / maxPoints) * 100;

  let emoji;

  if (percentage === 100) {
    emoji = '🎉';
  } else if (percentage >= 80 && percentage < 100) {
    emoji = '👏';
  } else if (percentage >= 50 && percentage < 80) {
    emoji = '👍';
  } else if (percentage >= 0 && percentage < 50) {
    emoji = '🥲';
  } else {
    emoji = '🤬';
  }
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points} </strong>out of{' '}
        <strong>{maxPoints}</strong>
      </p>
      <p className="highscore">Highscore : {highScore} points</p>
    </>
  );
}
