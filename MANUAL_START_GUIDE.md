# Manual Start Guide

If the automated batch files aren't working, follow this manual guide.

## Step-by-Step Manual Start

### Step 1: Test Backend

1. Open Command Prompt
2. Navigate to your project:
   ```
   cd path\to\airsense-predictor
   ```
3. Run the backend test:
   ```
   test_backend.bat
   ```
4. You should see:
   ```
   * Running on http://127.0.0.1:5000
   ```
5. **Keep this window open!**

### Step 2: Test Frontend

1. Open a **NEW** Command Prompt window
2. Navigate to your project:
   ```
   cd path\to\airsense-predictor
   ```
3. Run the frontend test:
   ```
   test_frontend.bat
   ```
4. You should see:
   ```
   Local: http://localhost:8080/
   ```
5. **Keep this window open!**

### Step 3: Open Browser

1. Open your browser
2. Go to: http://localhost:8080
3. You should see the AQI Dashboard!

## Troubleshooting Each Step

### Backend Won't Start

**Error: "No module named 'flask'"**
```bash
cd backend
pip install flask flask-cors numpy pandas scikit-learn
```

**Error: "Port 5000 is already in use"**
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill that process (replace PID with actual number)
taskkill /F /PID <PID>
```

**Error: "FileNotFoundError: aqi_random_forest_model.pkl"**
- Make sure you're in the right directory
- Check if the .pkl files exist in backend folder

### Frontend Won't Start

**Error: "npm: command not found"**
- Install Node.js from https://nodejs.org/

**Error: "Cannot find module"**
```bash
npm install
```

**Error: "Port 5173 is already in use"**
- Vite will automatically use the next available port (5174, 5175, etc.)
- Check the terminal for the actual URL

### Browser Shows Error

**"Failed to connect to prediction service"**
- Backend is not running
- Go back to Step 1 and start backend

**Blank page or loading forever**
- Check browser console (F12)
- Look for errors
- Make sure frontend terminal shows no errors

## Alternative: Use Separate Terminals

### Terminal 1 - Backend
```bash
cd airsense-predictor\backend
python app.py
```

### Terminal 2 - Frontend
```bash
cd airsense-predictor
npm run dev
```

### Browser
```
http://localhost:8080
```

## Verify Everything is Working

### Check Backend
Open: http://localhost:5000/health

Should show:
```json
{"status":"healthy"}
```

### Check Frontend
Open: http://localhost:8080

Should show the AQI Dashboard interface

### Test Prediction
1. Select a city (Delhi, Mumbai, or Bengaluru)
2. Select year (2025 or later)
3. Select month (1-12)
4. Click "Predict AQI"
5. Should show prediction result

## Common Issues

### Issue: Backend starts but frontend can't connect

**Check .env file:**
```bash
# Should contain:
VITE_API_URL=http://localhost:5000
```

**Restart frontend:**
1. Press Ctrl+C in frontend terminal
2. Run `npm run dev` again

### Issue: Both start but browser shows nothing

**Hard refresh browser:**
- Chrome/Edge: Ctrl+Shift+R
- Firefox: Ctrl+F5

**Clear browser cache:**
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

### Issue: Everything works but predictions fail

**Check backend terminal for errors**

**Test API directly:**
```bash
curl -X POST http://localhost:5000/predict ^
  -H "Content-Type: application/json" ^
  -d "{\"city\":\"Delhi\",\"year\":2025,\"month\":6}"
```

Should return JSON with AQI prediction.

## Success Checklist

- [ ] Backend terminal shows "Running on http://127.0.0.1:5000"
- [ ] Frontend terminal shows "Local: http://localhost:8080/"
- [ ] http://localhost:5000/health returns {"status":"healthy"}
- [ ] http://localhost:8080 shows the dashboard
- [ ] Can select city, year, month
- [ ] Clicking "Predict AQI" shows results
- [ ] No errors in browser console (F12)

## Quick Reference

| Component | URL | Command |
|-----------|-----|---------|
| Backend | http://localhost:5000 | `cd backend && python app.py` |
| Frontend | http://localhost:8080 | `npm run dev` |
| Health Check | http://localhost:5000/health | `curl http://localhost:5000/health` |

## Need More Help?

1. Run `diagnose.bat` to check your setup
2. Check `WINDOWS_INSTALL_FIX.md` for installation issues
3. Check `TESTING_GUIDE.md` for detailed testing
4. Create a GitHub issue with:
   - What step failed
   - Error messages
   - Screenshots if possible
