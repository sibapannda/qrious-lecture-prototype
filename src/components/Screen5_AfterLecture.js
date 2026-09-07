import React, { useState } from 'react';
import './Screen5_AfterLecture.css';

export const Screen5_AfterLecture = ({ selectedQuestion, onNext }) => {
  const [answer, setAnswer] = useState('');

  const handleContinue = () => {
    onNext(answer);
  };

  return (
    <div className="screen screen-after-lecture">
      <div className="container">
        <div className="header">
          <h1 className="logo">Qrious</h1>
        </div>

        <div className="content">
          <h2 className="heading">講演を聞いた今、<br/>あなたならどう答える？</h2>

          <div className="question-display">
            <div className="emoji">{selectedQuestion.emoji}</div>
            <p className="question-text">{selectedQuestion.title}</p>
          </div>

          <div className="answer-section">
            <textarea
              className="answer-input"
              placeholder="正解じゃなくて、自分なりの答えでOK。"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={handleContinue}>
            次へ →
          </button>
        </div>
      </div>
    </div>
  );
};