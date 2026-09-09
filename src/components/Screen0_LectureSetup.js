import React, { useState } from 'react';
import './Screen0_LectureSetup.css';

export const Screen0LectureSetup = ({ onLectureSetup }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [generated, setGenerated] = useState(false);

  const generateQuestions = () => {
    if (!title.trim() || !description.trim()) {
      alert('講演タイトルと講演概要を入力してください');
      return;
    }

    // プロトタイプ用の仮自動生成
    // 今後ここをAIによる生成に置き換えられる
    const generatedQuestions = [
      {
        id: 1,
        emoji: '🤔',
        title: `「${title}」って、私たちの生活とどう関係している？`,
      },
      {
        id: 2,
        emoji: '🌏',
        title: `このテーマは、世界ではどんな影響を与えている？`,
      },
      {
        id: 3,
        emoji: '🔮',
        title: `この分野がもっと進んだら、未来はどう変わる？`,
      },
      {
        id: 4,
        emoji: '💡',
        title: `このテーマの「意外と知られていないこと」って何だろう？`,
      },
      {
        id: 5,
        emoji: '💼',
        title: `このテーマに関わる仕事には、どんなものがある？`,
      },
      {
        id: 6,
        emoji: '💰',
        title: `このテーマは、お金やビジネスとどうつながっている？`,
      },
      {
        id: 7,
        emoji: '👀',
        title: `中高生の自分にも関係することってある？`,
      },
      {
        id: 8,
        emoji: '🚀',
        title: `10年後、このテーマはどうなっていると思う？`,
      },
    ];

    setQuestions(generatedQuestions);
    setGenerated(true);
  };

  const updateQuestion = (id, value) => {
    setQuestions(
      questions.map((question) =>
        question.id === id
          ? { ...question, title: value }
          : question
      )
    );
  };

  const handleStart = () => {
    const validQuestions = questions.filter(
      (question) => question.title.trim() !== ''
    );

    if (!title.trim() || !description.trim()) {
      alert('講演タイトルと講演概要を入力してください');
      return;
    }

    if (validQuestions.length < 4) {
      alert('問いを4個以上用意してください');
      return;
    }

    onLectureSetup({
      title: title.trim(),
      description: description.trim(),
      questions: validQuestions,
    });
  };

  return (
    <div className="screen screen-lecture-setup">
      <div className="setup-container">
        <h1 className="logo">Qrious</h1>

        <div className="setup-card">
          <h2>講演設定</h2>

          <div className="form-group">
            <label htmlFor="lecture-title">
              講演タイトル
            </label>

            <input
              id="lecture-title"
              type="text"
              placeholder="例：半導体から見る、世界のこれから"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setGenerated(false);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lecture-description">
              講演概要
            </label>

            <textarea
              id="lecture-description"
              placeholder="どんな内容の講演なのか、簡単に入力してください"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setGenerated(false);
              }}
            />
          </div>

          <button
            type="button"
            className="generate-button"
            onClick={generateQuestions}
          >
            ✨ 気になる問いを自動生成
          </button>

          {!generated && (
            <p className="generate-hint">
              タイトルと概要から、中高生向けの
              「ちょっと気になる問い」を作ります。
            </p>
          )}

          {generated && (
            <div className="generated-section">
              <div className="generated-header">
                <h3>生成された問い</h3>
                <p>必要なら自由に編集できます</p>
              </div>

              <div className="generated-questions">
                {questions.map((question) => (
                  <div
                    className="generated-question"
                    key={question.id}
                  >
                    <span className="question-emoji">
                      {question.emoji}
                    </span>

                    <textarea
                      value={question.title}
                      onChange={(e) =>
                        updateQuestion(
                          question.id,
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="regenerate-button"
                onClick={generateQuestions}
              >
                ↻ もう一度生成
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={handleStart}
              >
                この講演でQriousを始める →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
