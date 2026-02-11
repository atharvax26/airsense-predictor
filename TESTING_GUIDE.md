# Testing Guide

Complete guide to test the integrated AQI Prediction system.

## Prerequisites Check

Before starting, verify you have:

```bash
# Check Python version (need 3.8+)
python --version

# Check Node.js version (need 18+)
node --version

# Check npm
npm --version
```

## Test 1: Backend API (Standalone)

### Start Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Test Health Endpoint
Open a new terminal:
```bash
curl http://localhost:5000/health
```

Expected output:
```json
{"status":"healthy"}
```

### Test Prediction Endpoint

**Test Delhi:**
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"city":"Delhi","year":2025,"month":6}'
```

**Test Mumbai:**
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"city":"Mumbai","year":2025,"month":3}'
```

**Test Bengaluru:**
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"city":"Bengaluru","year":2026,"month":12}'
```

Expected response format:
```json
{
  "aqi": 156.23,
  "category": "Moderate",
  "city": "Delhi",
  "year": 2025,
  "month": 6
}
```

### Test Error Handling

**Invalid city:**
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"city":"InvalidCity","year":2025,"month":6}'
```

Expected: Error message about invalid city

**Invalid month:**
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"city":"Delhi","year":2025,"month":13}'
```

Expected: Error message about month range

## Test 2: Frontend (Standalone)

### Start Frontend
Open a new terminal:
```bash
# From project root
npm install
npm run dev
```

### Manual UI Testing

1. **Open Browser**: Go to http://localhost:5173
2. **Wait for Intro**: Animation should play
3. **Check UI Elements**:
   - Header with "AQI Prediction Dashboard"
   - Theme toggle button
   - Two tabs: "AQI Dashboard" and "Weather Dashboard"
   - Prediction form with dropdowns
   - Category guide on the right

## Test 3: Full Integration

### Prerequisites
- Backend running on http://localhost:5000
- Frontend running on http://localhost:5173

### Test Scenarios

#### Scenario 1: Successful Prediction
1. Open http://localhost:5173
2. Select "Delhi" from city dropdown
3. Select "2025" from year dropdown
4. Select "June" from month dropdown
5. Click "Predict AQI"
6. **Expected**: 
   - Loading state appears
   - Toast notification shows success
   - Prediction card displays with AQI value
   - Category badge shows (Good/Moderate/Poor/etc.)

#### Scenario 2: Different Cities
Repeat above with:
- Mumbai + 2026 + March
- Bengaluru + 2025 + December

**Expected**: Different AQI values for different cities

#### Scenario 3: Error Handling
1. Don't select a city
2. Select year and month
3. Click "Predict AQI"
4. **Expected**: Toast error "City Required"

#### Scenario 4: Backend Down
1. Stop the backend server (Ctrl+C in backend terminal)
2. Try to make a prediction
3. **Expected**: Toast error "Failed to connect to prediction service"
4. Restart backend and try again
5. **Expected**: Should work again

## Test 4: Browser Console Check

### Open Developer Tools
- Chrome/Edge: F12 or Ctrl+Shift+I
- Firefox: F12
- Safari: Cmd+Option+I

### Check Console Tab
Should see:
- No red errors
- Vite connection messages
- Successful API calls when predicting

### Check Network Tab
1. Make a prediction
2. Look for POST request to `/predict`
3. Check:
   - Status: 200 OK
   - Request payload has city, year, month
   - Response has aqi, category, etc.

## Test 5: Different Browsers

Test in multiple browsers:
- ✅ Chrome
- ✅ Firefox
- ✅ Edge
- ✅ Safari (Mac)

All should work identically.

## Test 6: Responsive Design

Test different screen sizes:
1. Desktop (1920x1080)
2. Tablet (768x1024)
3. Mobile (375x667)

Use browser dev tools to simulate:
- Chrome: Ctrl+Shift+M (Toggle device toolbar)
- Firefox: Ctrl+Shift+M (Responsive Design Mode)

## Test 7: Theme Toggle

1. Click theme toggle button (top right)
2. **Expected**: UI switches between light/dark mode
3. All elements should be readable in both modes

## Test 8: Performance

### Backend Response Time
```bash
time curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"city":"Delhi","year":2025,"month":6}'
```

**Expected**: < 1 second

### Frontend Load Time
1. Open browser dev tools
2. Go to Network tab
3. Reload page
4. Check "Load" time at bottom
5. **Expected**: < 3 seconds

## Test 9: Data Validation

### Test Edge Cases

**Far Future Year:**
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"city":"Delhi","year":2050,"month":6}'
```
**Expected**: Should still return prediction

**All Months:**
Test each month (1-12) for one city
**Expected**: All should return valid predictions

## Test 10: Concurrent Requests

Open multiple browser tabs and make predictions simultaneously.
**Expected**: All should work without conflicts

## Common Issues & Solutions

### Issue: "Connection refused" error
**Solution**: Backend not running. Start with `python app.py`

### Issue: "CORS error" in browser console
**Solution**: Make sure Flask-CORS is installed: `pip install flask-cors`

### Issue: "Module not found" in Python
**Solution**: Install requirements: `pip install -r requirements.txt`

### Issue: Frontend shows old data
**Solution**: Hard refresh browser (Ctrl+Shift+R)

### Issue: Port already in use
**Solution**: 
- Backend: Change port in app.py
- Frontend: Vite will auto-select different port

## Success Criteria

✅ Backend health check returns 200
✅ All three cities return predictions
✅ Frontend loads without errors
✅ Predictions display correctly
✅ Error handling works
✅ Theme toggle works
✅ Responsive on mobile
✅ No console errors
✅ Network requests succeed
✅ Performance is acceptable

## Automated Testing (Future)

Consider adding:
- Backend: pytest for API tests
- Frontend: Vitest for component tests
- E2E: Playwright for full flow tests

## Reporting Issues

If you find bugs:
1. Note the exact steps to reproduce
2. Check browser console for errors
3. Check backend terminal for errors
4. Note your OS, browser, Python/Node versions
5. Create a GitHub issue with details
