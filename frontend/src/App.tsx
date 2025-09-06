import React, { useState } from 'react';
import AnimatedIntro from './components/AnimatedIntro';
import CaloriePredictor from './components/CaloriePredictor';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="App">
      {showIntro ? (
        <AnimatedIntro onComplete={handleIntroComplete} />
      ) : (
        <CaloriePredictor />
      )}
    </div>
  );
}

export default App;
