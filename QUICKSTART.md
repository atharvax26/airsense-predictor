# Quick Start Guide

Get the AQI Prediction Dashboard running in 5 minutes!

## Step 1: Start the Backend (Terminal 1)

```bash
# Navigate to backend
cd backend

# Install dependencies (first time only)
pip install flask flask-cors pandas numpy scikit-learn

# Start the server
python app.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
```

## Step 2: Start the Frontend (Terminal 2)

Open a new terminal window:

```bash
# Navigate to project root (if in backend, go back)
cd ..

# Install dependencies (first time only)
npm install

# Start the dev server
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

## Step 3: Open the App

Open your browser and go to: **http://localhost:5173**

## Step 4: Make a Prediction

1. Select a city (Delhi, Mumbai, or Bengaluru)
2. Choose a year (2025 or later)
3. Pick a month (1-12)
4. Click "Predict AQI"

You should see the predicted AQI value and category!

## Troubleshooting

### Backend Issues

**Error: "ModuleNotFoundError: No module named 'flask'"**
- Solution: Run `pip install -r requirements.txt` in the backend folder

**Error: "Port 5000 is already in use"**
- Solution: Stop other services using port 5000, or change the port in `app.py`

### Frontend Issues

**Error: "Failed to connect to prediction service"**
- Solution: Make sure the backend is running on http://localhost:5000
- Check the `.env` file has `VITE_API_URL=http://localhost:5000`

**Error: "City Required"**
- Solution: Make sure to select a city before clicking Predict

### Still Having Issues?

1. Check both terminals for error messages
2. Verify Python 3.8+ is installed: `python --version`
3. Verify Node.js is installed: `node --version`
4. Try restarting both servers

## Testing the API Directly

Test if the backend is working:

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"city":"Delhi","year":2025,"month":6}'
```

Expected response:
```json
{
  "aqi": 156.23,
  "category": "Moderate",
  "city": "Delhi",
  "year": 2025,
  "month": 6
}
```

## Next Steps

- Explore the Weather Dashboard tab
- Try different cities and time periods
- Check out the AQI category guide
- View historical trends in the charts

Enjoy predicting air quality! 🌍
