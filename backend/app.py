from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load the ML model (create a simplified version since the original uses the notebook)
def create_simple_model():
    """Create a simple mock model for demonstration"""
    import joblib
    from sklearn.ensemble import RandomForestRegressor
    from sklearn.preprocessing import StandardScaler, LabelEncoder
    from sklearn.pipeline import Pipeline
    from sklearn.compose import ColumnTransformer
    
    # Create a simple model for demonstration
    # In a real implementation, you would load the actual trained model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    
    # Create mock training data to fit the model
    mock_data = pd.DataFrame({
        'Gender': ['male', 'female'] * 50,
        'Age': np.random.randint(18, 80, 100),
        'Height': np.random.normal(170, 15, 100),
        'Weight': np.random.normal(70, 15, 100),
        'Duration': np.random.randint(10, 120, 100),
        'Heart_Rate': np.random.randint(60, 180, 100),
        'Body_Temp': np.random.normal(37, 0.5, 100),
    })
    
    # Create mock target (calories burnt)
    mock_target = (mock_data['Duration'] * 8 + 
                  mock_data['Weight'] * 0.5 + 
                  mock_data['Heart_Rate'] * 0.3 +
                  np.random.normal(0, 20, 100))
    
    # Create preprocessing pipeline
    from sklearn.preprocessing import LabelEncoder
    le = LabelEncoder()
    mock_data['Gender_encoded'] = le.fit_transform(mock_data['Gender'])
    
    # Fit the model
    features = ['Gender_encoded', 'Age', 'Height', 'Weight', 'Duration', 'Heart_Rate', 'Body_Temp']
    model.fit(mock_data[features], mock_target)
    
    return model, le

# Initialize model
model, label_encoder = create_simple_model()

@app.route('/predict', methods=['POST'])
def predict_calories():
    try:
        data = request.json
        
        # Extract features from request
        gender = data.get('gender')
        age = float(data.get('age'))
        height = float(data.get('height'))
        weight = float(data.get('weight'))
        duration = float(data.get('duration'))
        heart_rate = float(data.get('heart_rate'))
        body_temp = float(data.get('body_temp'))
        
        # Encode gender
        gender_encoded = 1 if gender == 'male' else 0
        
        # Create feature array
        features = np.array([[gender_encoded, age, height, weight, duration, heart_rate, body_temp]])
        
        # Make prediction
        prediction = model.predict(features)[0]
        
        # Ensure positive result and round to reasonable number
        prediction = max(0, round(prediction, 1))
        
        return jsonify({
            'prediction': prediction,
            'success': True
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 400

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)