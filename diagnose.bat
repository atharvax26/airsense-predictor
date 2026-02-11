@echo off
echo ========================================
echo   AQI Dashboard Diagnostic Tool
echo ========================================
echo.

echo [1/8] Checking Python installation...
python --version
if errorlevel 1 (
    echo [FAIL] Python not found
) else (
    echo [PASS] Python is installed
)
echo.

echo [2/8] Checking Node.js installation...
node --version
if errorlevel 1 (
    echo [FAIL] Node.js not found
) else (
    echo [PASS] Node.js is installed
)
echo.

echo [3/8] Checking npm installation...
npm --version
if errorlevel 1 (
    echo [FAIL] npm not found
) else (
    echo [PASS] npm is installed
)
echo.

echo [4/8] Checking backend dependencies...
cd backend
python -c "import flask; print('Flask:', flask.__version__)" 2>nul
if errorlevel 1 (
    echo [FAIL] Flask not installed
) else (
    echo [PASS] Flask is installed
)

python -c "import numpy; print('NumPy:', numpy.__version__)" 2>nul
if errorlevel 1 (
    echo [FAIL] NumPy not installed
) else (
    echo [PASS] NumPy is installed
)

python -c "import pandas; print('Pandas:', pandas.__version__)" 2>nul
if errorlevel 1 (
    echo [FAIL] Pandas not installed
) else (
    echo [PASS] Pandas is installed
)

python -c "import sklearn; print('scikit-learn:', sklearn.__version__)" 2>nul
if errorlevel 1 (
    echo [FAIL] scikit-learn not installed
) else (
    echo [PASS] scikit-learn is installed
)
cd ..
echo.

echo [5/8] Checking backend files...
if exist "backend\app.py" (
    echo [PASS] app.py exists
) else (
    echo [FAIL] app.py not found
)

if exist "backend\aqi_random_forest_model.pkl" (
    echo [PASS] Model file exists
) else (
    echo [FAIL] Model file not found
)
echo.

echo [6/8] Checking frontend dependencies...
if exist "node_modules\" (
    echo [PASS] node_modules exists
) else (
    echo [FAIL] node_modules not found - run: npm install
)

if exist "package.json" (
    echo [PASS] package.json exists
) else (
    echo [FAIL] package.json not found
)
echo.

echo [7/8] Testing backend startup...
cd backend
echo Starting Flask for 5 seconds...
start /B python app.py >nul 2>&1
timeout /t 5 /nobreak >nul
curl -s http://localhost:5000/health >nul 2>&1
if errorlevel 1 (
    echo [FAIL] Backend not responding on port 5000
    echo Check if another app is using port 5000
) else (
    echo [PASS] Backend is responding
)
taskkill /F /IM python.exe >nul 2>&1
cd ..
echo.

echo [8/8] Checking ports...
netstat -ano | findstr ":5000" >nul 2>&1
if not errorlevel 1 (
    echo [WARN] Port 5000 is in use
    echo Run: netstat -ano | findstr ":5000" to see what's using it
) else (
    echo [PASS] Port 5000 is available
)

netstat -ano | findstr ":8080" >nul 2>&1
if not errorlevel 1 (
    echo [WARN] Port 8080 is in use
) else (
    echo [PASS] Port 8080 is available
)
echo.

echo ========================================
echo   Diagnostic Complete
echo ========================================
echo.
echo If you see any [FAIL] messages above:
echo   - For Python packages: run install_backend.bat
echo   - For node_modules: run npm install
echo   - For port issues: close apps using those ports
echo.
pause
