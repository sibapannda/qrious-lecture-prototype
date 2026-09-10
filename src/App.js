import React, { useState } from 'react';
import { Screen0LectureSetup } from './components/Screen0_LectureSetup';
import { Screen1Start } from './components/Screen1_Start';
import { Screen2SelectQuestion } from './components/Screen2_SelectQuestion';
import { Screen3ConfirmQuestion } from './components/Screen3_ConfirmQuestion';
import { Screen4DuringLecture } from './components/Screen4_DuringLecture';
import { Screen5AfterLecture } from './components/Screen5_AfterLecture';
import { Screen6NewInsights } from './components/Screen6_NewInsights';
import { Screen7NotFound } from './components/Screen7_NotFound';
import './styles/theme.css';
import './App.css';

function App() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');

  if (mode === 'host') {
    return <HostApp />;
  }

  if (mode === 'student') {
    return <StudentApp />;
  }

  return <RoleSelect />;
}

/* =========================
   最初の役割選択画面
========================= */

const RoleSelect = () => {
  return (
    <div className="role-select-page">
      <div className="role-select-container">

        <div className="role-select-header">
          <h1 className="role-select-logo">Qrious</h1>

          <h2 className="role-select-title">
            「気になる」から、
            <br />
            講演はもっと自分ごとになる。
          </h2>

          <p className="role-select-description">
            あなたの立場を選んでください
          </p>
        </div>

        <div className="role-cards">

          <button
            className="role-card"
            onClick={() => {
              window.location.href = '/?mode=host';
            }}
          >
            <div className="role-icon">🎤</div>

            <div className="role-card-text">
              <span className="role-card-label">
                講演者・先生向け
              </span>

              <strong className="role-card-title">
                講演をつくる
              </strong>

              <span className="role-card-description">
                講演内容を設定して、
                生徒の「気になる」をつくる
              </span>
            </div>

            <span className="role-arrow">→</span>
          </button>

          <button
            className="role-card"
            onClick={() => {
              window.location.href = '/?mode=student';
            }}
          >
            <div className="role-icon">🎓</div>

            <div className="role-card-text">
              <span className="role-card-label">
                生徒向け
              </span>

              <strong className="role-card-title">
                講演に参加する
              </strong>

              <span className="role-card-description">
                気になる問いを見つけて、
                講演を聞いてみる
              </span>
            </div>

            <span className="role-arrow">→</span>
          </button>

        </div>
      </div>
    </div>
  );
};

/* =========================
   講演者側
========================= */

const HostApp = () => {
  const [publishedLecture, setPublishedLecture] = useState(null);

  const handleLectureSetup = (lectureData) => {
    setPublishedLecture(lectureData);
  };

  if (!publishedLecture) {
    return (
      <Screen0LectureSetup
        onLectureSetup={handleLectureSetup}
      />
    );
  }

  const lectureString = encodeURIComponent(
    JSON.stringify(publishedLecture)
  );

  const studentUrl =
    `${window.location.origin}/?mode=student&lecture=${lectureString}`;

  const copyStudentUrl = async () => {
    try {
      await navigator.clipboard.writeText(studentUrl);
      alert('生徒用URLをコピーしました！');
    } catch (error) {
      alert('URLをコピーできませんでした');
    }
  };

  return (
    <div className="host-published-page">
      <div className="host-published-card">

        <h1 className="host-logo">Qrious</h1>

        <div className="host-success-icon">
          ✓
        </div>

        <h2>講演の準備ができました！</h2>

        <div className="host-lecture-box">
          <span>講演タイトル</span>
          <strong>{publishedLecture.title}</strong>
        </div>

        <p className="host-description">
          生徒用URLを共有すると、
          この講演のQriousに参加できます。
        </p>

        <textarea
          className="student-url-box"
          readOnly
          value={studentUrl}
        />

        <button
          className="host-primary-button"
          onClick={copyStudentUrl}
        >
          🔗 生徒用URLをコピー
        </button>

        <button
          className="host-secondary-button"
          onClick={() => {
            window.location.href = studentUrl;
          }}
        >
          生徒画面をプレビュー →
        </button>

        <button
          className="host-text-button"
          onClick={() => {
            setPublishedLecture(null);
          }}
        >
          講演設定をやり直す
        </button>

      </div>
    </div>
  );
};

/* =========================
   生徒側
========================= */

const StudentApp = () => {
  const params = new URLSearchParams(window.location.search);
  const lectureParam = params.get('lecture');

  let lecture = null;

  if (lectureParam) {
    try {
      lecture = JSON.parse(lectureParam);
    } catch (error) {
      console.error(
        '講演データを読み込めませんでした',
        error
      );
    }
  }

  if (!lecture) {
    return (
      <div className="student-empty-page">
        <div className="student-empty-card">

          <h1 className="student-empty-logo">
            Qrious
          </h1>

          <div className="student-empty-icon">
            🔗
          </div>

          <h2>
            講演がまだ設定されていません
          </h2>

          <p>
            講演者・先生から共有された
            <br />
            QriousのURLを開いてください。
          </p>

          <button
            className="student-back-button"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            トップに戻る
          </button>

        </div>
      </div>
    );
  }

  return (
    <StudentExperience
      lecture={lecture}
    />
  );
};

/* =========================
   生徒の講演体験
========================= */

const StudentExperience = ({ lecture }) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [lectureNotes, setLectureNotes] = useState('');
  const [lectureAnswer, setLectureAnswer] = useState('');

  const handleScreen1Next = () => {
    setCurrentScreen(2);
  };

  const handleScreen2SelectQuestion = (question) => {
    setSelectedQuestion(question);
    setCurrentScreen(3);
  };

  const handleScreen2NoQuestionFound = () => {
    setCurrentScreen(7);
  };

  const handleScreen3Next = () => {
    setCurrentScreen(4);
  };

  const handleScreen4Next = (notes) => {
    setLectureNotes(notes);
    setCurrentScreen(5);
  };

  const handleScreen5Next = (answer) => {
    setLectureAnswer(answer);
    setCurrentScreen(6);
  };

  const handleScreen6Complete = (data) => {
    console.log('Experience completed:', {
      lecture,
      question: selectedQuestion,
      notes: lectureNotes,
      answer: lectureAnswer,
      insights: data,
    });

    setCurrentScreen(8);
  };

  const handleReset = () => {
    setCurrentScreen(1);
    setSelectedQuestion(null);
    setLectureNotes('');
    setLectureAnswer('');
  };

  return (
    <div className="app">

      {currentScreen === 1 && (
        <Screen1Start
          lecture={lecture}
          onNext={handleScreen1Next}
        />
      )}

      {currentScreen === 2 && (
        <Screen2SelectQuestion
          questions={lecture.questions}
          onSelectQuestion={handleScreen2SelectQuestion}
          onNoQuestionFound={handleScreen2NoQuestionFound}
        />
      )}

      {currentScreen === 3 && selectedQuestion && (
        <Screen3ConfirmQuestion
          selectedQuestion={selectedQuestion}
          onNext={handleScreen3Next}
        />
      )}

      {currentScreen === 4 && selectedQuestion && (
        <Screen4DuringLecture
          selectedQuestion={selectedQuestion}
          onNext={handleScreen4Next}
        />
      )}

      {currentScreen === 5 && selectedQuestion && (
        <Screen5AfterLecture
          selectedQuestion={selectedQuestion}
          onNext={handleScreen5Next}
        />
      )}

      {currentScreen === 6 && (
        <Screen6NewInsights
          onNext={handleScreen6Complete}
        />
      )}

      {currentScreen === 7 && (
        <Screen7NotFound
          onReset={handleReset}
        />
      )}

      {currentScreen === 8 && (
        <Screen8Completed
          onReset={handleReset}
        />
      )}

    </div>
  );
};

/* =========================
   完了
========================= */

const Screen8Completed = ({ onReset }) => {
  return (
    <div className="completed-page">
      <div className="completed-card">

        <h1 className="completed-logo">
          Qrious
        </h1>

        <div className="completed-check">
          ✓
        </div>

        <h2>
          ご参加ありがとうございました！
        </h2>

        <p>
          新しい「気になる」を
          <br />
          見つけることができましたか？
        </p>

        <button
          className="completed-button"
          onClick={onReset}
        >
          もう一度試す
        </button>

      </div>
    </div>
  );
};

export default App;
