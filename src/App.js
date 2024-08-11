import './index.css';
import { useReducer, useEffect } from 'react';
import Header from './Header';
import Loader from './Loader';
import Error from './Error';
import Main from './components/Main';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';

const initialState = {
  questions: [],
  status: 'loading', // error, ready, active, finished
  error: null,
  index: 0,
  answer: null,
  points: 0,
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
    default:
      return state;
  }
}

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

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
          <QuestionScreen
            question={questions[index]}
            answer={answer}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
