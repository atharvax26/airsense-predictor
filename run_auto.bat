@echo off
title AQI Dashboard - Auto Launcher
color 0A

echo.
echo ================================================
echo       AQI PREDICTION DASHBOARD (AUTO)
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

REM Start frontend and capture output to find actual port
echo Starting Frontend...
start "AQI Frontend" cmd /k "cd /d "%SCRIPT_DIR%" && color 0E && title AQI Frontend && npm run dev"

REM Wait for frontend to start
echo Waiting for frontend to initialize...
timeout /t 12 /nobreak >nul

REM Try common Vite ports
echo.
echo Detecting frontend port...
echo.

REM Check port 8080 first (most common alternative)
curl -s http://localhost:8080 >nul 2>&1
if not errorlevel 1 (
    echo Found frontend on port 8080
    start http://localhost:8080
    set "FRONTEND_PORT=8080"
    goto :found
)

REM Check port 5173 (default)
curl -s http://localhost:5173 >nul 2>&1
if not errorlevel 1 (
    echo Found frontend on port 5173
    start http://localhost:5173
    set "FRONTEND_PORT=5173"
    goto :found
)

REM Check port 5174
curl -s http://localhost:5174 >nul 2>&1
if not errorlevel 1 (
    echo Found frontend on port 5174
    start http://localhost:5174
    set "FRONTEND_PORT=5174"
    goto :found
)

REM Check port 3000
curl -s http://localhost:3000 >nul 2>&1
if not errorlevel 1 (
    echo Found frontend on port 3000
    start http://localhost:3000
    set "FRONTEND_PORT=3000"
    goto :found
)

echo Could not detect frontend port automatically
echo Please check the "AQI Frontend" window for the actual URL
set "FRONTEND_PORT=unknown"

:found
echo.
echo ================================================
echo          DASHBOARD IS RUNNING!
echo ================================================
echo.
echo Backend:  http://localhost:5000
if "%FRONTEND_PORT%"=="unknown" (
    echo Frontend: Check the frontend terminal window
) else (
    echo Frontend: http://localhost:%FRONTEND_PORT%
)
echo.
echo Two windows are open - keep them running!
echo Check the frontend window if browser didn't open.
echo.
pause
