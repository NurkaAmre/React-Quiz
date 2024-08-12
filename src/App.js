import './index.css';
import { useReducer, useEffect } from 'react';
import Header from './Header';
import Loader from './Loader';
import Error from './Error';
import Main from './components/Main';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';

const initialState = {
  questions: [],
  status: 'loading', // error, ready, active, finished
  error: null,
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.questions, status: 'ready' };
    case 'SET_ERROR':
      return { ...state, status: 'error', error: action.error };
    case 'START_QUIZ':
      return { ...state, status: 'active' };
    case 'ACTIVE_QUESTION':
      return { ...state, status: 'active', currentQuestion: action.question };
    case 'NEW_ANSWER':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.index,
        points:
          action.index === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case 'FINISH_QUIZ':
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case 'RESTART_QUIZ':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };
    default:
      return state;
  }
}

function App() {
  const [{ questions, status, index, answer, points, highScore }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    fetch('http://localhost:3001/questions')
      .then((response) => response.json())
      .then((questions) => {
        console.log(questions);
        dispatch({ type: 'SET_QUESTIONS', questions });
      })
      .catch((error) => {
        dispatch({ type: 'SET_ERROR', error });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              answer={answer}
              maxPoints={maxPoints}
            />
            <QuestionScreen
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
            />
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
