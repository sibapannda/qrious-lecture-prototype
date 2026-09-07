import React, { useState } from 'react';
import { questionSets } from '../data/questions';
import './Screen2_SelectQuestion.css';

export const Screen2SelectQuestion = ({ onSelectQuestion, onNoQuestionFound }) => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const currentSet = questionSets[currentSetIndex];

  const handleSelectQuestion = (question) => {
    setSelectedQuestionId(question.id);
    onSelectQuestion(question);
  };

  const handleShowMoreQuestions = () => {
    setCurrentSetIndex((prev) => (prev + 1) % questionSets.length);
    setSelectedQuestionId(null);
  };

  const handleNoQuestionFound = () => {
    onNoQuestionFound();
  };

  return (
    <div className="screen screen-select-question">
      <div className="container">
        <div className="content">
          <div className="header">
            <h1 className="logo">Qrious</h1>
          </div>

          <h2 className="heading">この講演で、<br/>どれがちょっと気になる？</h2>

          <div className="questions-grid">
            {currentSet.questions.map((question) => (
              <div
                key={question.id}
                className={`question-card ${selectedQuestionId === question.id ? 'selected' : ''}`}
                onClick={() => handleSelectQuestion(question)}
              >
                <div className="emoji">{question.emoji}</div>
                <p className="question-text">{question.title}</p>
              </div>
            ))}
          </div>

          <div className="actions">
            <button className="btn-secondary" onClick={handleNoQuestionFound}>
              どれもピンとこない
            </button>
            <button className="btn-secondary" onClick={handleShowMoreQuestions}>
              ほかの問いを見る
            </button>
          </div>

          <div className="set-indicator">
            セット {currentSetIndex + 1}/{questionSets.length}
          </div>
        </div>
      </div>
    </div>
  );
};