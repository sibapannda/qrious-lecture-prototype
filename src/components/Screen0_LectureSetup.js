import React, { useState } from 'react';
import './Screen0_LectureSetup.css';

export const Screen0LectureSetup = ({ onLectureSetup }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [generated, setGenerated] = useState(false);

  // タイトル・概要から、問いに使えそうなキーワードを拾う
  const extractKeywords = (text) => {
    const cleaned = text
      .replace(/[、。！？,.!?「」『』（）()]/g, ' ')
      .split(/\s+/)
      .map((word) => word.trim())
      .filter((word) => word.length >= 2);

    const stopWords = [
      'について',
      'という',
      'ために',
      'そして',
      'しかし',
      'これから',
      'どんな',
      '講演',
      '話します',
      '考えます',
      '紹介します',
      '学びます',
    ];

    const unique = cleaned.filter(
      (word, index, array) =>
        !stopWords.includes(word) &&
        array.indexOf(word) === index
    );

    return unique.slice(0, 5);
  };

  const generateQuestions = () => {
    if (!title.trim() || !description.trim()) {
      alert('講演タイトルと講演概要を入力してください');
      return;
    }

    const keywords = extractKeywords(
      `${title} ${description}`
    );

    const mainTopic = keywords[0] || title;
    const topic2 = keywords[1] || mainTopic;
    const topic3 = keywords[2] || mainTopic;

    const generatedQuestions = [
      {
        id: 1,
        emoji: '📱',
        title: `${mainTopic}は、私たちの普段の生活とどこでつながっている？`,
      },
      {
        id: 2,
        emoji: '🌏',
        title: `${mainTopic}が世界で注目されているのはなぜ？`,
      },
      {
        id: 3,
        emoji: '🔗',
        title: `${mainTopic}と${topic2}は、どう関係している？`,
      },
      {
        id: 4,
        emoji: '👀',
        title: `${topic2}について、実はあまり知られていないことは何？`,
      },
      {
        id: 5,
        emoji: '🚀',
        title: `${mainTopic}がさらに進んだら、10年後の社会はどう変わる？`,
      },
      {
        id: 6,
        emoji: '💼',
        title: `${topic3}に関わる仕事には、どんなものがある？`,
      },
      {
        id: 7,
        emoji: '⚖️',
        title: `${mainTopic}が広がることで、逆に生まれる問題はある？`,
      },
      {
        id: 8,
        emoji: '🙋',
        title: `${mainTopic}は、中高生の自分にも関係する？`,
      },
      {
        id: 9,
        emoji: '💰',
        title: `${mainTopic}は、企業やお金の動きとどうつながっている？`,
      },
      {
        id: 10,
        emoji: '🤔',
        title: `${mainTopic}について、専門家の間でも意見が分かれることはある？`,
      },
      {
        id: 11,
        emoji: '🇯🇵',
        title: `${mainTopic}について、日本は世界の中でどんな立場にいる？`,
      },
      {
        id: 12,
        emoji: '💡',
        title: `${mainTopic}と${topic3}を組み合わせると、どんな新しい可能性がある？`,
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

  const deleteQuestion = (id) => {
    setQuestions(
      questions.filter((question) => question.id !== id)
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
      alert('問いを4個以上残してください');
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
          <div className="setup-heading">
            <p className="setup-label">
              FOR SPEAKERS
            </p>

            <h2>講演をつくる</h2>

            <p>
              講演内容から、生徒それぞれの
              「気になる」への入口をつくります。
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="lecture-title">
              講演タイトル
            </label>

            <input
              id="lecture-title"
              type="text"
              placeholder="例：台湾の半導体産業とAI時代の世界経済"
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
              placeholder="例：台湾の半導体産業、AIの進化、日本の半導体政策、スマートフォンなど身近な製品との関係について話します。"
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
            ✨ 気になる問いを生成
          </button>

          {!generated && (
            <p className="generate-hint">
              講演内容をもとに、異なる角度から
              12個の「気になる」をつくります。
            </p>
          )}

          {generated && (
            <div className="generated-section">

              <div className="generated-header">
                <div>
                  <h3>生成された問い</h3>
                  <p>
                    生徒が「なんか気になる」と
                    思えそうな問いを残してください。
                  </p>
                </div>

                <span className="question-count">
                  {questions.length} questions
                </span>
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

                    <button
                      type="button"
                      className="delete-question-button"
                      onClick={() =>
                        deleteQuestion(question.id)
                      }
                      aria-label="問いを削除"
                    >
                      ×
                    </button>
                  </div>
                ))}

              </div>

              <button
                type="button"
                className="regenerate-button"
                onClick={generateQuestions}
              >
                ↻ 別の問いを生成
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={handleStart}
              >
                この講演を公開する →
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
