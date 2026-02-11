@echo off
echo ========================================
echo   Testing Backend Manually
echo ========================================
echo.

cd backend

echo Starting Flask backend...
echo Press Ctrl+C to stop
echo.
echo If you see "Running on http://127.0.0.1:5000" then it's working!
echo.

python app.py

pause
