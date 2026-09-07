import React from 'react';
import './Screen7_NotFound.css';

export const Screen7_NotFound = ({ onReset }) => {
  return (
    <div className="screen screen-not-found">
      <div className="container">
        <div className="content">
          <div className="header">
            <h1 className="logo">Qrious</h1>
          </div>

          <div className="message-box">
            <div className="icon">🤔</div>
            <h2>気になる問いが見つからなかったんだね</h2>
            <p>それもいいと思います。<br/>
              興味って急に目覚めることもあります。</p>
          </div>

          <div className="info-box">
            <p>講演を聞きながら、<br/>
              何か「これ気になる！」ってことが<br/>
              出てきたら、<br/>
              そのときに教えてもらえると嬉しいです。</p>
          </div>

          <button className="btn-primary" onClick={onReset}>
            講演スタート画面に戻る
          </button>
        </div>
      </div>
    </div>
  );
};