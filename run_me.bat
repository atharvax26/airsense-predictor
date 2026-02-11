@echo off
echo ========================================
echo   AQI Prediction Dashboard Launcher
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Python and Node.js are installed
echo.

REM Check if backend dependencies are installed
echo Checking backend dependencies...
cd backend
python -c "import flask" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Installing backend dependencies...
    echo [INFO] Upgrading pip first...
    python -m pip install --upgrade pip
    echo [INFO] Installing packages (this may take 2-3 minutes)...
    python -m pip install flask flask-cors
    python -m pip install numpy
    python -m pip install pandas
    python -m pip install scikit-learn
    if errorlevel 1 (
        echo [ERROR] Failed to install backend dependencies
        echo [INFO] Trying alternative installation method...
        python -m pip install --only-binary :all: numpy pandas scikit-learn
        if errorlevel 1 (
            echo [ERROR] Installation failed. Please install manually:
            echo   cd backend
            echo   pip install flask flask-cors numpy pandas scikit-learn
            pause
            exit /b 1
        )
    )
    echo [OK] Backend dependencies installed successfully
) else (
    echo [OK] Backend dependencies are installed
)
cd ..

REM Check if frontend dependencies are installed
echo Checking frontend dependencies...
if not exist "node_modules\" (
    echo [INFO] Installing frontend dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo [OK] Frontend dependencies are installed
)

echo.
echo ========================================
echo   Starting Backend and Frontend...
echo ========================================
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C in each window to stop the servers
echo.

REM Start backend in a new window
start "AQI Backend (Flask)" cmd /k "cd /d "%~dp0backend" && echo Starting Flask Backend... && python app.py"

REM Wait a bit for backend to start
echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

REM Start frontend in a new window
start "AQI Frontend (Vite)" cmd /k "cd /d "%~dp0" && echo Starting Vite Frontend... && npm run dev"

REM Wait a bit for frontend to start
echo Waiting for frontend to start...
timeout /t 8 /nobreak >nul

REM Open browser
echo.
echo Opening browser...
timeout /t 3 /nobreak >nul
start http://localhost:5173

echo.
echo ========================================
echo   Dashboard is running!
echo ========================================
echo.
echo Two windows have been opened:
echo   1. Backend (Flask) - Keep this running
echo   2. Frontend (Vite) - Keep this running
echo.
echo Your browser should open automatically.
echo If not, go to: http://localhost:5173
echo.
echo To stop the servers:
echo   - Close both terminal windows, or
echo   - Press Ctrl+C in each window
echo.
pause
