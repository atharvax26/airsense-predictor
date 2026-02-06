

# AQI Prediction Dashboard

## Overview
A professional Air Quality Index prediction application with a clean dashboard interface, prediction capabilities, and data visualization.

## Architecture Approach
Since this platform runs React/TypeScript with Supabase backend, we'll implement:
- **Frontend**: React dashboard with Tailwind CSS styling
- **Backend**: Supabase Edge Function for prediction logic
- **AI-Powered Predictions**: Using Lovable AI to generate intelligent AQI predictions based on historical patterns
- **Visualization**: Recharts for trend charts (already installed)

---

## Features

### 1. Dashboard Home
- Clean, professional layout with AQI status cards
- Current AQI overview with color-coded categories
- Quick stats showing recent trends

### 2. Prediction Input Form
- Year selector (2024-2030)
- Month dropdown (January-December)
- Location selector (optional - for demo purposes)
- Submit button to trigger prediction

### 3. Prediction Results Display
- **Predicted AQI Value** - Large, prominent number
- **AQI Category Badge** - Color-coded (Good/Moderate/Poor/Severe/Hazardous)
- **Health Advisory** - Contextual message based on AQI level
- **Confidence indicator** - Shows prediction reliability

### 4. Historical Data Visualization
- Line chart showing AQI trends over time
- Bar chart comparing monthly averages
- Interactive tooltips with detailed values

### 5. AQI Categories Reference
- Visual guide explaining each AQI level (0-500 scale)
- Health implications for each category
- Recommended actions

---

## Sample Data
Pre-loaded historical AQI data for demonstration (2020-2025), including seasonal patterns and realistic variations.

---

## Design Style
- Professional dashboard aesthetic
- Color scheme based on AQI standards (green → yellow → orange → red → purple)
- Card-based layout with shadows
- Responsive for mobile and desktop
- Clean typography, minimal animations

