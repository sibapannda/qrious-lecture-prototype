import React, { useState } from 'react';
import './Screen0_LectureSetup.css';

export const Screen0LectureSetup = ({ onLectureSetup }) => {
  const [lectureTitle, setLectureTitle] = useState('');
  const [lectureDescription, setLectureDescription] = useState('');
  const [questions, setQuestions] = useState([
    { id: 0, emoji: '', title: '' },
    { id: 1, emoji: '', title: '' },
    { id: 2, emoji: '', title: '' },
    { id: 3, emoji: '', title: '' },
  ]);

  const handleQuestionEmojiChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].emoji = value;
    setQuestions(newQuestions);
  };

  const handleQuestionTitleChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].title = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length, emoji: '', title: '' },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length > 4) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleStartLecture = () => {
    // バリデーション
    if (!lectureTitle.trim()) {
      alert('講演タイトルを入力してください');
      return;
    }

    if (!lectureDescription.trim()) {
      alert('講演概要を入力してください');
      return;
    }

    // 最低4個の問いが必要で、すべて絵文字と文章が埋まっていること
    const filledQuestions = questions.filter(
      (q) => q.emoji.trim() && q.title.trim()
    );

    if (filledQuestions.length < 4) {
      alert('問いを最低4個入力してください（絵文字と文章の両方が必須）');
      return;
    }

    // 講演データを作成
    const lectureData = {
      title: lectureTitle,
      description: lectureDescription,
      questions: filledQuestions,
    };

    // 親コンポーネントに渡す
    onLectureSetup(lectureData);
  };

  return (
    <div className="screen screen-lecture-setup">
      <div className="container">
        <div className="content">
          <div className="header">
            <h1 className="logo">Qrious</h1>
          </div>

          <div className="setup-section">
            <h2 className="section-title">講演設定</h2>

            <div className="form-group">
              <label htmlFor="lecture-title" className="form-label">
                講演タイトル
              </label>
              <input
                id="lecture-title"
                type="text"
                className="form-input"
                placeholder="例：宇宙開発は私たちの生活をどう変える？"
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lecture-description" className="form-label">
                講演概要
              </label>
              <textarea
                id="lecture-description"
                className="form-textarea"
                placeholder="例：宇宙産業、人工衛星、民間企業の参入などについて考える講演です。"
                value={lectureDescription}
                onChange={(e) => setLectureDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                問い候補（最低4個、4個以上登録可能）
              </label>

              <div className="questions-list">
                {questions.map((question, index) => (
                  <div key={question.id} className="question-input-group">
                    <div className="question-input-row">
                      <input
                        type="text"
                        className="emoji-input"
                        placeholder="🛰️"
                        maxLength="2"
                        value={question.emoji}
                        onChange={(e) =>
                          handleQuestionEmojiChange(index, e.target.value)
                        }
                      />
                      <textarea
                        className="question-title-input"
                        placeholder="例：GPSって宇宙とどう関係している？"
                        value={question.title}
                        onChange={(e) =>
                          handleQuestionTitleChange(index, e.target.value)
                        }
                      />
                      {questions.length > 4 && (
                        <button
                          className="btn-remove-question"
                          onClick={() => handleRemoveQuestion(index)}
                          title="この問いを削除"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="btn-add-question"
                onClick={handleAddQuestion}
              >
                + 問いを追加
              </button>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={handleStartLecture}
          >
            この講演でQriousを始める →
          </button>
        </div>
      </div>
    </div>
  );
};
