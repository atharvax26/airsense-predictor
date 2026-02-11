# AQI Prediction Backend

Flask API for Air Quality Index prediction using Random Forest model.

## Setup

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Backend Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /predict

Predict AQI for a given city, year, and month.

**Request Body:**
```json
{
  "city": "Delhi",
  "year": 2025,
  "month": 6
}
```

**Response:**
```json
{
  "aqi": 156.23,
  "category": "Moderate",
  "city": "Delhi",
  "year": 2025,
  "month": 6
}
```

**Available Cities:**
- Delhi
- Mumbai
- Bengaluru

**AQI Categories:**
- Good: 0-50
- Satisfactory: 51-100
- Moderate: 101-200
- Poor: 201-300
- Very Poor: 301-400
- Severe: 400+

### GET /health

Check if the API is running.

**Response:**
```json
{
  "status": "healthy"
}
```

## Model Files

- `aqi_random_forest_model.pkl` - Trained Random Forest model
- `city_mapping.pkl` - City name to encoded value mapping
- `historical_features.pkl` - Historical average features for predictions
- `label_encoder.pkl` - Label encoder for categorical data
- `AQI_DATA.csv` - Historical AQI dataset (2020-2024)

## Testing the API

Using curl:
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"city":"Delhi","year":2025,"month":6}'
```

Using Python:
```python
import requests

response = requests.post('http://localhost:5000/predict', json={
    'city': 'Delhi',
    'year': 2025,
    'month': 6
})

print(response.json())
```
