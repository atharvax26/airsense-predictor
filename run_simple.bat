@echo off
title AQI Dashboard Launcher
color 0A

echo.
echo ================================================
echo          AQI PREDICTION DASHBOARD
echo ================================================
echo.

REM Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

echo [1/4] Checking Python...
python --version || (
    echo ERROR: Python not found!
    pause
    exit /b 1
)

echo [2/4] Checking Node.js...
node --version || (
    echo ERROR: Node.js not found!
    pause
    exit /b 1
)

echo [3/4] Checking dependencies...
python -c "import flask, pandas, numpy, sklearn" 2>nul || (
    echo.
    echo Backend dependencies missing!
    echo Run install_backend.bat first
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo.
    echo Frontend dependencies missing!
    echo Installing now...
    call npm install
)

echo [4/4] Starting servers...
echo.

REM Start backend
echo Starting Backend on http://localhost:5000
start "AQI Backend" cmd /k "cd /d "%SCRIPT_DIR%backend" && color 0B && title AQI Backend && python app.py"

REM Wait for backend
echo Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

REM Start frontend  
echo Starting Frontend on http://localhost:5173
start "AQI Frontend" cmd /k "cd /d "%SCRIPT_DIR%" && color 0E && title AQI Frontend && npm run dev"

REM Wait for frontend
echo Waiting for frontend to initialize...
timeout /t 10 /nobreak >nul

REM Open browser
echo.
echo Opening browser...
start http://localhost:5173

echo.
echo ================================================
echo          DASHBOARD IS RUNNING!
echo ================================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Two windows are open - keep them running!
echo Close this window when done.
echo.
pause
