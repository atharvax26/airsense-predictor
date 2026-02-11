@echo off
echo ========================================
echo   Stopping AQI Dashboard Servers
echo ========================================
echo.

REM Kill Python processes (Flask backend)
echo Stopping Flask backend...
taskkill /F /FI "WINDOWTITLE eq AQI Backend (Flask)*" >nul 2>&1
taskkill /F /IM python.exe /FI "MEMUSAGE gt 10000" >nul 2>&1

REM Kill Node processes (Vite frontend)
echo Stopping Vite frontend...
taskkill /F /FI "WINDOWTITLE eq AQI Frontend (Vite)*" >nul 2>&1
taskkill /F /IM node.exe /FI "MEMUSAGE gt 10000" >nul 2>&1

echo.
echo [OK] Servers stopped!
echo.
pause
