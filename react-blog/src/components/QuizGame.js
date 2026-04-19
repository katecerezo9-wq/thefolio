import React, { useState, useEffect } from 'react';
import { quizData, shuffleArray } from '../utils/quizData';
import './QuizGame.css';

const QuizGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Shuffle questions on load
    setQuestions(shuffleArray([...quizData]));
  }, []);

  const getPointsForDifficulty = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 10;
      case 'medium': return 20;
      case 'hard': return 30;
      default: return 10;
    }
  };

  const selectOption = (index) => {
    if (quizCompleted || showResult) return;
    setSelectedOptionIndex(index);
  };

  const handleSubmit = () => {
    if (selectedOptionIndex === null || quizCompleted) return;

    const currentData = questions[currentQuestionIndex];
    const correct = selectedOptionIndex === currentData.answer;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + getPointsForDifficulty(currentData.difficulty));
      setCurrentStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > maxStreak) setMaxStreak(newStreak);
        return newStreak;
      });
    } else {
      setCurrentStreak(0);
    }

    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setQuestions(shuffleArray([...quizData]));
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setQuizCompleted(false);
    setShowResult(false);
  };

  if (questions.length === 0) {
    return <div>Loading quiz...</div>;
  }

  const currentData = questions[currentQuestionIndex];

  return (
    <section className="quiz-section animate-up">
      <h2 className="quiz-title">Esports & MLBB Challenge</h2>
      {!quizCompleted ? (
        <>
          <p className="quiz-progress">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <div className="quiz-score-display">
            Score: {score} | Streak: {currentStreak}
          </div>

          <div className="quiz-container">
            <h3 className="quiz-question">
              <span>{currentData.question}</span>
              <span className={`difficulty-badge difficulty-${currentData.difficulty}`}>
                {currentData.difficulty.toUpperCase()}
              </span>
            </h3>

            <div className="quiz-options">
              {currentData.options.map((option, index) => (
                <div
                  key={index}
                  className={`quiz-option ${selectedOptionIndex === index ? 'selected' : ''} ${
                    showResult && index === currentData.answer ? 'correct-option' : ''
                  } ${showResult && selectedOptionIndex === index && index !== currentData.answer ? 'wrong-option' : ''}`}
                  onClick={() => selectOption(index)}
                  style={{ pointerEvents: showResult ? 'none' : 'auto' }}
                >
                  <span style={{ marginRight: '10px', fontWeight: 'bold' }}>
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span>{option}</span>
                </div>
              ))}
            </div>

            {showResult && (
              <div className={`quiz-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect ? (
                  <div>
                    <div style={{ fontSize: '1.2em' }}>
                      ✅ Correct! +{getPointsForDifficulty(currentData.difficulty)} points
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '0.9em' }}>
                      {currentData.explanation}
                    </div>
                    <div style={{ marginTop: '5px', color: '#27ae60' }}>
                      Current Streak: {currentStreak} 🔥
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '1.2em' }}>❌ Incorrect!</div>
                    <div style={{ marginTop: '8px', fontSize: '0.9em' }}>
                      {currentData.explanation}
                    </div>
                    <div style={{ marginTop: '8px', fontWeight: 'normal' }}>
                      Correct answer: <strong>{currentData.options[currentData.answer]}</strong>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="quiz-buttons">
              {!showResult ? (
                <button
                  className="quiz-button"
                  onClick={handleSubmit}
                  disabled={selectedOptionIndex === null}
                >
                  Submit Answer
                </button>
              ) : (
                <button className="quiz-button" onClick={handleNext}>
                  Next Question
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="quiz-container">
          <div className="quiz-final">
            <div style={{ fontSize: '1.5em', marginBottom: '15px' }}>
              Final Score: <strong>{score} points</strong>
            </div>
            <div style={{ marginBottom: '10px' }}>
              Maximum Streak: <strong>{maxStreak} 🔥</strong>
            </div>
            <div style={{ marginBottom: '15px' }}>
              Accuracy: <strong>{Math.round((score / (questions.length * 20)) * 100)}%</strong>
            </div>
            <div>
              <em>
                {score >= 270 ? '🏆 Legendary! You\'re an esports encyclopedia!' :
                 score >= 225 ? '🎯 Epic Performance! Solid gaming knowledge!' :
                 score >= 180 ? '👍 Great Job! You\'re on your way to becoming a pro!' :
                 score >= 120 ? '😊 Good Effort! Keep practicing!' :
                 '📚 Nice Try! Time to grind more MLBB matches!'}
              </em>
            </div>
          </div>
          <div className="quiz-restart">
            <button className="quiz-button" onClick={handleRestart}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default QuizGame;