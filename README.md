# CalorEase
Calories Burnt Prediction using Machine Learning with Animated Weather Intro

## Features

- **Animated Intro Sequence**: Weather-based animations transitioning through sunrise → morning → afternoon → evening → sunset
- **Interactive Animations**: 
  - Moving clouds for cloudy weather
  - Animated raindrops with varying intensity
  - Blooming/wilting flowers with weather-affected petals
- **Modern Web Interface**: React-based frontend with responsive design
- **Machine Learning Predictions**: Python Flask backend for calorie prediction
- **Smooth Transitions**: Framer Motion animations for seamless user experience

## Architecture

### Frontend (React + TypeScript)
- **Animated Intro Component**: Weather-based stages with CSS animations and Framer Motion
- **Calorie Predictor**: Modern form interface for ML predictions
- **Responsive Design**: Mobile-friendly interface

### Backend (Python Flask)
- **ML Model**: Scikit-learn based calorie prediction
- **REST API**: Endpoints for prediction and health checks
- **CORS Enabled**: Supports frontend integration

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- pip (Python package manager)

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Watch the animated intro sequence showcasing weather transitions
4. Fill in your personal details in the prediction form
5. Get your estimated calories burnt prediction

## Animation Details

The intro sequence features:
- **Sunrise**: Warm gradient with sun animation
- **Morning**: Cloudy sky with floating clouds
- **Afternoon**: Clear blue sky with bright sun
- **Evening**: Rainy weather with animated raindrops and wilting flowers
- **Sunset**: Orange/pink gradient with setting sun

Each stage includes:
- Dynamic background gradients based on time of day
- Animated celestial bodies (sun/moon)
- Weather-specific elements (clouds, rain)
- Interactive flower animations that respond to weather conditions
- Smooth transitions between stages using Framer Motion

## Technologies Used

- **Frontend**: React, TypeScript, Framer Motion, CSS3
- **Backend**: Python, Flask, Scikit-learn, Pandas, NumPy
- **ML**: Random Forest Regressor for calorie prediction
- **Styling**: CSS3 animations, responsive design
