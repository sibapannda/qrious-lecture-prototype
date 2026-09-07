import React from 'react';
import './Screen1_Start.css';

export const Screen1_Start = ({ onNext }) => {
  return (
    <div className="screen screen-start">
      <div className="container">
        <div className="content">
          <div className="header">
            <h1 className="logo">Qrious</h1>
          </div>

          <div className="lecture-info">
            <p className="label">今日の講演</p>
            <h2 className="lecture-title">「半導体から見る、世界のこれから」</h2>
          </div>

          <div className="description">
            <p>「知らない世界にも、<br/>あなたが『ちょっと気になる』<br/>入口があるかも。」</p>
          </div>

          <button className="btn-primary" onClick={onNext}>
            気になる問いを探す →
          </button>
        </div>
      </div>
    </div>
  );
};