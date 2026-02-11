# AirSense Predictor - AQI Prediction Dashboard

A full-stack Air Quality Index (AQI) prediction system with machine learning backend and interactive React frontend.

## 🌟 Features

- **Real-time AQI Predictions** - ML-powered predictions using Random Forest model
- **Interactive Dashboard** - Beautiful UI with charts and visualizations
- **Multiple Cities** - Support for Delhi, Mumbai, and Bengaluru
- **Historical Data Analysis** - Based on 2020-2024 AQI data
- **Weather Integration** - Additional weather dashboard
- **Dark/Light Mode** - Theme toggle support

## 🏗️ Project Structure

```
airsense-predictor/
├── backend/              # Flask API with ML model
│   ├── app.py           # Flask server
│   ├── *.pkl            # Trained model files
│   ├── AQI_DATA.csv     # Historical dataset
│   └── requirements.txt # Python dependencies
├── src/                 # React frontend
│   ├── components/      # UI components
│   ├── lib/            # Utilities and API client
│   └── pages/          # Page components
└── ...
```

## 🚀 Getting Started

### Quick Start (Windows)

**Easiest way - Just double-click:**
```
run_me.bat
```

This automatically:
- Checks dependencies
- Installs what's needed
- Starts both backend and frontend
- Opens your browser

See [BATCH_FILES_GUIDE.md](BATCH_FILES_GUIDE.md) for details.

### Manual Setup

#### Prerequisites

- Node.js & npm (v18+)
- Python 3.8+
- pip

#### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to project root:
```bash
cd ..
```

2. Install npm dependencies:
```bash
npm install
```

3. Create `.env` file (or copy from `.env.example`):
```bash
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:8080`

## 📡 API Usage

### Predict AQI

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"city":"Delhi","year":2025,"month":6}'
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

### Available Cities
- Delhi
- Mumbai
- Bengaluru

### AQI Categories
- **Good** (0-50): Minimal impact
- **Satisfactory** (51-100): Minor breathing discomfort
- **Moderate** (101-200): Breathing discomfort for sensitive groups
- **Poor** (201-300): Breathing discomfort for most people
- **Very Poor** (301-400): Respiratory illness on prolonged exposure
- **Severe** (400+): Affects healthy people, serious impact on those with existing diseases

## 🛠️ Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Recharts (for visualizations)
- React Query

### Backend
- Flask
- Flask-CORS
- scikit-learn
- pandas
- numpy

## 📊 Model Information

The prediction model uses:
- **Algorithm**: Random Forest Regression
- **Training Data**: Historical AQI data from 2020-2024
- **Features**: City, Year, Month, Quarter, Historical pollutant averages (PM2.5, PM10, NO2, NH3, SO2, CO, O3)
- **Output**: Predicted AQI value and category

## 🧪 Testing

Run frontend tests:
```bash
npm test
```

Test backend API:
```bash
cd backend
python -c "import requests; print(requests.post('http://localhost:5000/predict', json={'city':'Delhi','year':2025,'month':6}).json())"
```

## 📦 Deployment

### Frontend
Deploy to Vercel, Netlify, or any static hosting:
```bash
npm run build
```

### Backend
Deploy to Heroku, Render, Railway, or any Python hosting platform.

**Important**: Update `VITE_API_URL` in frontend to point to your deployed backend URL.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Historical AQI data from Indian pollution monitoring stations
- Built with React and Flask
- UI components from shadcn/ui
