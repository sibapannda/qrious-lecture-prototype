import React, { useState } from 'react';
import './Screen2_SelectQuestion.css';

export const Screen2SelectQuestion = ({
  questions,
  onSelectQuestion,
  onNoQuestionFound,
}) => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  // 受け取った問いを4個ずつに分ける
  const questionSets = [];

  for (let i = 0; i < questions.length; i += 4) {
    questionSets.push(questions.slice(i, i + 4));
  }

  const currentSet = questionSets[currentSetIndex] || [];

  const handleShowMoreQuestions = () => {
    setCurrentSetIndex(
      (prev) => (prev + 1) % questionSets.length
    );
  };

  return (
    <div className="screen screen-select-question">
      <div className="container">
        <div className="content">

          <div className="header">
            <h1 className="logo">Qrious</h1>
          </div>

          <h2 className="heading">
            この講演で、
            <br />
            どれがちょっと気になる？
          </h2>

          <div className="questions-grid">
            {currentSet.map((question) => (
              <button
                key={question.id}
                className="question-card"
                onClick={() => onSelectQuestion(question)}
              >
                <div className="emoji">
                  {question.emoji}
                </div>

                <p className="question-text">
                  {question.title}
                </p>
              </button>
            ))}
          </div>

          <div className="actions">
            <button
              className="btn-secondary"
              onClick={onNoQuestionFound}
            >
              どれもピンとこない
            </button>

            {questionSets.length > 1 && (
              <button
                className="btn-secondary"
                onClick={handleShowMoreQuestions}
              >
                ほかの問いを見る
              </button>
            )}
          </div>

          {questionSets.length > 1 && (
            <div className="set-indicator">
              {currentSetIndex + 1} / {questionSets.length}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
