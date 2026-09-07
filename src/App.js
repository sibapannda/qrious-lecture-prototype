import React, { useState } from 'react';
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
    // In a real app, this would submit data to a backend
    // For now, we'll show a completion message
    console.log('Experience completed:', {
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
      {currentScreen === 1 && <Screen1Start onNext={handleScreen1Next} />}
      
      {currentScreen === 2 && (
        <Screen2SelectQuestion
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
        <Screen6NewInsights onNext={handleScreen6Complete} />
      )}
      
      {currentScreen === 7 && (
        <Screen7NotFound onReset={handleReset} />
      )}
      
      {currentScreen === 8 && (
        <Screen8Completed onReset={handleReset} />
      )}
    </div>
  );
}

// Screen 8: Completed
const Screen8Completed = ({ onReset }) => {
  return (
    <div className="screen screen-completed">
      <div className="container">
        <div className="content">
          <div className="header">
            <h1 className="logo">Qrious</h1>
          </div>

          <div className="completion-message">
            <div className="checkmark">✓</div>
            <h2>ご参加ありがとうございました！</h2>
            <p>あなたの体験は記録されました。<br/>
              新しい「気になる」を見つけることができましたか？</p>
          </div>

          <button className="btn-primary" onClick={onReset}>
            もう一度試す
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
