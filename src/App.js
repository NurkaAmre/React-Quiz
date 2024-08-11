import './index.css';
import { useReducer, useEffect } from 'react';
import Header from './Header';
import Main from './components/Main';

const initialState = {
  questions: [],
  status: 'loading',
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.questions, status: 'idle' };
    case 'SET_ERROR':
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numQuestions = state.questions.length;

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
        <p>1/15</p>
        <p>Questions</p>
      </Main>
    </div>
  );
}

export default App;
