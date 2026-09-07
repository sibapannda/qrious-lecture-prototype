import React, { useState } from 'react';
import './Screen6_NewInsights.css';

const INSIGHT_OPTIONS = [
  'もっと知りたいことができた',
  '意外と自分に関係あると思った',
  '知らなかった世界を知れた',
  '自分が好きかもしれないものに気づいた',
  '特にない',
];

export const Screen6_NewInsights = ({ onNext }) => {
  const [selectedInsights, setSelectedInsights] = useState(new Set());
  const [newInterest, setNewInterest] = useState('');

  const handleToggleInsight = (insight) => {
    const newSet = new Set(selectedInsights);

    if (insight === '特にない') {
      if (newSet.has('特にない')) {
        // Uncheck "特にない"
        newSet.delete('特にない');
      } else {
        // Check "特にない" and clear all others
        newSet.clear();
        newSet.add('特にない');
      }
    } else {
      // For regular options
      if (newSet.has('特にない')) {
        // If "特にない" is selected, clear it first
        newSet.delete('特にない');
      }

      // Toggle the selected option
      if (newSet.has(insight)) {
        newSet.delete(insight);
      } else {
        newSet.add(insight);
      }
    }

    setSelectedInsights(newSet);
  };

  const handleComplete = () => {
    onNext({
      insights: Array.from(selectedInsights),
      newInterest,
    });
  };

  return (
    <div className="screen screen-insights">
      <div className="container">
        <div className="header">
          <h1 className="logo">Qrious</h1>
        </div>

        <div className="content">
          <h2 className="heading">講演を聞く前にはなかった<br/>『気になる』はある？</h2>

          <div className="options-section">
            {INSIGHT_OPTIONS.map((option) => (
              <label key={option} className="checkbox-option">
                <input
                  type="checkbox"
                  checked={selectedInsights.has(option)}
                  onChange={() => handleToggleInsight(option)}
                />
                <span className="checkbox-text">{option}</span>
              </label>
            ))}
          </div>

          <div className="interest-section">
            <label htmlFor="interest-input" className="interest-label">
              新しく気になったこと
            </label>
            <textarea
              id="interest-input"
              className="interest-input"
              placeholder="講演を聞いて、新しく気になったことや、もっと知りたくなったことはありますか？"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={handleComplete}>
            完了
          </button>
        </div>
      </div>
    </div>
  );
};