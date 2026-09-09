import React from 'react';
import './Screen1_Start.css';

export const Screen1Start = ({ lecture, onNext }) => {
  return (
    <div className="screen screen-start">
      <div className="container">
        <div className="content">
          <div className="header">
            <h1 className="logo">Qrious</h1>
          </div>

          <div className="lecture-info">
            <p className="label">今日の講演</p>

            <h2 className="lecture-title">
              「{lecture.title}」
            </h2>
          </div>

          <div className="description">
            <p>{lecture.description}</p>
          </div>

          <button
            className="btn-primary"
            onClick={onNext}
          >
            気になる問いを探す →
          </button>
        </div>
      </div>
    </div>
  );
};
