import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AnimatedIntro.css';

interface WeatherStage {
  name: string;
  duration: number;
  weather: 'sunny' | 'cloudy' | 'rainy';
  timeOfDay: 'sunrise' | 'morning' | 'afternoon' | 'evening' | 'sunset';
}

const weatherStages: WeatherStage[] = [
  { name: 'Sunrise', duration: 3000, weather: 'sunny', timeOfDay: 'sunrise' },
  { name: 'Morning', duration: 3000, weather: 'cloudy', timeOfDay: 'morning' },
  { name: 'Afternoon', duration: 3000, weather: 'sunny', timeOfDay: 'afternoon' },
  { name: 'Evening', duration: 3000, weather: 'rainy', timeOfDay: 'evening' },
  { name: 'Sunset', duration: 3000, weather: 'sunny', timeOfDay: 'sunset' },
];

const AnimatedIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [showStage, setShowStage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStage < weatherStages.length - 1) {
        setShowStage(false);
        setTimeout(() => {
          setCurrentStage(currentStage + 1);
          setShowStage(true);
        }, 500);
      } else {
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, weatherStages[currentStage].duration);

    return () => clearTimeout(timer);
  }, [currentStage, onComplete]);

  const stage = weatherStages[currentStage];

  const getBackgroundGradient = (timeOfDay: string) => {
    switch (timeOfDay) {
      case 'sunrise':
        return 'linear-gradient(to bottom, #ff9a56, #ffad56, #ff6b9d)';
      case 'morning':
        return 'linear-gradient(to bottom, #87CEEB, #98D8E8, #B0E0E6)';
      case 'afternoon':
        return 'linear-gradient(to bottom, #4A90E2, #7BB3F0, #87CEEB)';
      case 'evening':
        return 'linear-gradient(to bottom, #2C3E50, #4A6741, #6B7C7C)';
      case 'sunset':
        return 'linear-gradient(to bottom, #ff6b9d, #ff8a56, #ffa726)';
      default:
        return 'linear-gradient(to bottom, #87CEEB, #98D8E8, #B0E0E6)';
    }
  };

  return (
    <div 
      className="intro-container"
      style={{ background: getBackgroundGradient(stage.timeOfDay) }}
    >
      <AnimatePresence mode="wait">
        {showStage && (
          <motion.div
            key={currentStage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="stage-container"
          >
            {/* Sun/Moon */}
            <motion.div
              className={`celestial-body ${stage.timeOfDay}`}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Clouds */}
            {(stage.weather === 'cloudy' || stage.weather === 'rainy') && (
              <div className="clouds-container">
                {[1, 2, 3].map((cloudIndex) => (
                  <motion.div
                    key={cloudIndex}
                    className={`cloud cloud-${cloudIndex}`}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: [0, 20, 0], opacity: 1 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'loop',
                      delay: cloudIndex * 0.5,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Rain */}
            {stage.weather === 'rainy' && (
              <div className="rain-container">
                {Array.from({ length: 50 }).map((_, index) => (
                  <motion.div
                    key={index}
                    className="raindrop"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${0.5 + Math.random() * 0.5}s`,
                    }}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: window.innerHeight, opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Flowers at the bottom */}
            <div className="flowers-container">
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={index}
                  className={`flower ${stage.weather === 'rainy' ? 'wilting' : 'blooming'}`}
                  style={{ left: `${(index + 1) * 12}%` }}
                  initial={{ scale: 0, y: 20 }}
                  animate={{ 
                    scale: stage.weather === 'rainy' ? 0.7 : 1,
                    y: stage.weather === 'rainy' ? 10 : 0,
                    rotate: stage.weather === 'rainy' ? -15 : 0
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: index * 0.2,
                    ease: 'easeOut'
                  }}
                >
                  {/* Flower petals */}
                  <div className="flower-petals">
                    {Array.from({ length: 6 }).map((_, petalIndex) => (
                      <motion.div
                        key={petalIndex}
                        className="petal"
                        style={{
                          transform: `rotate(${petalIndex * 60}deg) translateY(-10px)`,
                        }}
                        animate={{
                          scale: stage.weather === 'rainy' ? [1, 0.8, 1] : [1, 1.1, 1],
                          rotate: stage.weather === 'rainy' ? 
                            `${petalIndex * 60 + Math.random() * 20 - 10}deg` : 
                            `${petalIndex * 60}deg`
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                      />
                    ))}
                  </div>
                  <div className="flower-center" />
                  <div className="flower-stem" />
                </motion.div>
              ))}

              {/* Floating petals affected by weather */}
              {stage.weather === 'rainy' && Array.from({ length: 12 }).map((_, index) => (
                <motion.div
                  key={`petal-${index}`}
                  className="floating-petal"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${60 + Math.random() * 20}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0.5],
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 50 + 20],
                    rotate: [0, Math.random() * 360],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: Math.random() * 2,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>

            {/* Stage title */}
            <motion.div
              className="stage-title"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <h1>{stage.name}</h1>
              <p>CalorEase Weather Forecast</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedIntro;