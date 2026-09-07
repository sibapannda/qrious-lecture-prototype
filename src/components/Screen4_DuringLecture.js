import React, { useState } from 'react';
import './Screen4_DuringLecture.css';

export const Screen4DuringLecture = ({ selectedQuestion, onNext }) => {
  const [memo, setMemo] = useState('');

  const handleContinue = () => {
    onNext(memo);
  };

  return (
    <div className="screen screen-during-lecture">
      <div className="container">
        <div className="header">
          <h1 className="logo">Qrious</h1>
        </div>

        <div className="content">
          <div className="label">あなたが探していること</div>

          <div className="question-display-small">
            <div className="emoji">{selectedQuestion.emoji}</div>
            <p className="question-text">{selectedQuestion.title}</p>
          </div>

          <div className="memo-section">
            <label htmlFor="memo-input" className="memo-label">
              これ関係ありそう、と思ったこと
            </label>
            <textarea
              id="memo-input"
              className="memo-input"
              placeholder="講演を聞きながら、気づいたことや関連しそうなこと、質問などを自由にメモしてください"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={handleContinue}>
            次へ →
          </button>

          <div className="notice">
            <p>講演中は、この画面を閉じていてOK。</p>
          </div>
        </div>
      </div>
    </div>
  );
};