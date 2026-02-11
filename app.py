
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model and dependencies
with open('aqi_random_forest_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('city_mapping.pkl', 'rb') as f:
    city_mapping = pickle.load(f)

with open('historical_features.pkl', 'rb') as f:
    historical_features = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        city = data['city']
        year = int(data['year'])
        month = int(data['month'])
        
        # Validate inputs
        if city not in city_mapping:
            return jsonify({'error': f'Invalid city: {city}'}), 400
        
        if not (1 <= month <= 12):
            return jsonify({'error': 'Month must be between 1 and 12'}), 400
        
        # Encode city
        city_encoded = city_mapping[city]
        quarter = (month - 1) // 3 + 1
        
        # Get historical averages
        hist_data = historical_features[
            (historical_features['City'] == city) & 
            (historical_features['Month'] == month)
        ]
        
        if len(hist_data) == 0:
            return jsonify({'error': f'No data for {city} in month {month}'}), 400
        
        # Create input
        input_data = pd.DataFrame({
            'City_Encoded': [city_encoded],
            'Year': [year],
            'Month': [month],
            'Quarter': [quarter],
            'PM2.5_hist_avg': [hist_data['PM2.5_hist_avg'].values[0]],
            'PM10_hist_avg': [hist_data['PM10_hist_avg'].values[0]],
            'NO2_hist_avg': [hist_data['NO2_hist_avg'].values[0]],
            'NH3_hist_avg': [hist_data['NH3_hist_avg'].values[0]],
            'SO2_hist_avg': [hist_data['SO2_hist_avg'].values[0]],
            'CO_hist_avg': [hist_data['CO_hist_avg'].values[0]],
            'O3_hist_avg': [hist_data['O3_hist_avg'].values[0]],
            'AQI_hist_avg': [hist_data['AQI_hist_avg'].values[0]]
        })
        
        # Predict
        predicted_aqi = float(model.predict(input_data)[0])
        
        # Categorize
        if predicted_aqi <= 50:
            category = "Good"
        elif predicted_aqi <= 100:
            category = "Satisfactory"
        elif predicted_aqi <= 200:
            category = "Moderate"
        elif predicted_aqi <= 300:
            category = "Poor"
        elif predicted_aqi <= 400:
            category = "Very Poor"
        else:
            category = "Severe"
        
        return jsonify({
            'aqi': round(predicted_aqi, 2),
            'category': category,
            'city': city,
            'year': year,
            'month': month
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
