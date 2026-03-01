import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import AssessmentScreen from './components/AssessmentScreen';
import ResultScreen from './components/ResultScreen';
import { FACTORS } from './data/factors';
import './App.css';

const bgUrl = `${process.env.PUBLIC_URL}/city-bg.jpg`;

function App() {
  const [screen, setScreen] = useState('home'); // home | assessment | result
  const [selections, setSelections] = useState({});
  const [selectionLabels, setSelectionLabels] = useState({});
  const [comments, setComments] = useState({});

  const handleSelect = (factorId, value, label) => {
    setSelections((prev) => ({ ...prev, [factorId]: value }));
    setSelectionLabels((prev) => ({ ...prev, [factorId]: label }));
  };

  const handleComment = (factorId, text) => {
    setComments((prev) => ({ ...prev, [factorId]: text }));
  };

  const handleReset = () => {
    setSelections({});
    setSelectionLabels({});
    setComments({});
    setScreen('home');
  };

  const handleRandomise = () => {
    const randomSelections = {};
    const randomLabels = {};
    FACTORS.forEach((factor) => {
      const randomOption = factor.options[Math.floor(Math.random() * factor.options.length)];
      randomSelections[factor.id] = randomOption.value;
      randomLabels[factor.id] = randomOption.label;
    });
    setSelections(randomSelections);
    setSelectionLabels(randomLabels);
    setScreen('result');
  };

  let content;
  if (screen === 'home') {
    content = <HomeScreen onStart={() => setScreen('assessment')} onRandomise={handleRandomise} />;
  } else if (screen === 'assessment') {
    content = (
      <AssessmentScreen
        selections={selections}
        selectionLabels={selectionLabels}
        onSelect={handleSelect}
        onFinish={() => setScreen('result')}
        onBack={() => setScreen('home')}
        onRandomise={handleRandomise}
        comments={comments}
        onComment={handleComment}
      />
    );
  } else {
    content = (
      <ResultScreen
        selections={selections}
        selectionLabels={selectionLabels}
        onSelect={handleSelect}
        onReset={handleReset}
        onBack={() => setScreen('assessment')}
        comments={comments}
        onComment={handleComment}
      />
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Grayscale mountain background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)',
          opacity: 0.3,
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {content}
      </div>
    </div>
  );
}

export default App;
