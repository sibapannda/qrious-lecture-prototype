import React from 'react';
import './Screen3_ConfirmQuestion.css';

export const Screen3_ConfirmQuestion = ({ selectedQuestion, onNext }) => {
  return (
    <div className="screen screen-confirm">
      <div className="container">
        <div className="content">
          <div className="header">
            <h1 className="logo">Qrious</h1>
          </div>

          <h2 className="heading">今日、あなたが探す問い</h2>

          <div className="question-display">
            <div className="emoji">{selectedQuestion.emoji}</div>
            <p className="question-text">{selectedQuestion.title}</p>
          </div>

          <div className="message-box">
            <p>答えはまだ分からなくてOK。<br/>
              講演を聞きながら、<br/>
              『これ関係ありそう』を探してみよう。</p>
          </div>

          <button className="btn-primary" onClick={onNext}>
            この問いを持って講演を聞く →
          </button>
        </div>
      </div>
    </div>
  );
};