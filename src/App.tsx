import React, { useState } from 'react';
import { Difficulty, fetchQuizQuestions, QuestionState } from './API';
import QuestionCard from './components/QuestionCard';
import { AnswerObject } from './Utils';
import { GlobalStyle, Wrapper } from './App.styles';


const TOTAL_QUESTION = 10;

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTION, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      //user answer
      const answer = e.currentTarget.value;

      //check user answer
      const correct = questions[number].correct_answer === answer;

      //add score if answer id correct
      if (correct)
        setScore(score + 1);

      //save answer in array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    } catch (error) {
      console.log("checkAnswer -> error", error)
    }
  };

  const renderBtnStart = () => {
    return gameOver || userAnswers.length === TOTAL_QUESTION ? (
      <button className="start" onClick={startTrivia}>
        Start
      </button>
    ) : null;
  };

  const renderBtnNext = () => {
    return (!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION - 1) ?
      <button className="next" onClick={nextQuestion}>
        Next question
      </button> : null
  };

  const nextQuestion = () => {
    //move on to the next question if not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTION) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }

  };

  return <>
    <GlobalStyle />
    <Wrapper>
      <h1>REACT QUIZ</h1>
      {renderBtnStart()}
      {gameOver ? null : <p className="score">Score: {score}</p>}
      {loading && <p>Loading question ...</p>}
      {!loading && !gameOver && questions.length > 0 &&
        (
          <QuestionCard
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTION}
          />
        )
      }
      {renderBtnNext()}
    </Wrapper>
  </>;
}

export default App;
