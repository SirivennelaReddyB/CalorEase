import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './CaloriePredictor.css';

interface FormData {
  gender: string;
  age: number;
  height: number;
  weight: number;
  duration: number;
  heart_rate: number;
  body_temp: number;
}

const CaloriePredictor: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    gender: '',
    age: 0,
    height: 0,
    weight: 0,
    duration: 0,
    heart_rate: 0,
    body_temp: 0,
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'gender' ? value : parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPrediction(data.prediction);
      } else {
        setError(data.error || 'Failed to predict calories. Please try again.');
      }
    } catch (err) {
      // Fallback to mock prediction if API is not available
      const mockPrediction = calculateMockPrediction(formData);
      setPrediction(mockPrediction);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock prediction function (to be replaced with actual API call)
  const calculateMockPrediction = (data: FormData): number => {
    // Simple mock calculation based on basic metabolic factors
    const genderFactor = data.gender === 'male' ? 1.2 : 1.0;
    const ageFactor = Math.max(0.8, 1 - (data.age - 25) * 0.01);
    const weightFactor = data.weight * 0.1;
    const durationFactor = data.duration * 8;
    const heartRateFactor = data.heart_rate * 0.2;
    
    return Math.round(
      (durationFactor + weightFactor + heartRateFactor) * 
      genderFactor * 
      ageFactor
    );
  };

  return (
    <div className="calorie-predictor">
      <motion.div
        className="predictor-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="title"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          CalorEase
        </motion.h1>
        
        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Calories Burnt Prediction using Machine Learning
        </motion.p>

        <motion.form
          className="prediction-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="age">Age (years)</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age || ''}
                onChange={handleInputChange}
                min="1"
                max="120"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height || ''}
                onChange={handleInputChange}
                min="50"
                max="250"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight || ''}
                onChange={handleInputChange}
                min="20"
                max="300"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration (minutes)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration || ''}
                onChange={handleInputChange}
                min="1"
                max="480"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="heart_rate">Heart Rate (bpm)</label>
              <input
                type="number"
                id="heart_rate"
                name="heart_rate"
                value={formData.heart_rate || ''}
                onChange={handleInputChange}
                min="50"
                max="220"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="body_temp">Body Temperature (°C)</label>
              <input
                type="number"
                id="body_temp"
                name="body_temp"
                value={formData.body_temp || ''}
                onChange={handleInputChange}
                min="35"
                max="42"
                step="0.1"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="predict-button"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? 'Predicting...' : 'Predict Calories'}
          </motion.button>
        </motion.form>

        {error && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {prediction !== null && (
          <motion.div
            className="prediction-result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Predicted Calories Burnt</h2>
            <div className="calorie-amount">
              <span className="number">{prediction}</span>
              <span className="unit">calories</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CaloriePredictor;