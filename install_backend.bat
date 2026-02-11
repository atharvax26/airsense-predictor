@echo off
echo ========================================
echo   Backend Dependencies Installer
echo ========================================
echo.

cd backend

echo Step 1: Upgrading pip...
python -m pip install --upgrade pip
if errorlevel 1 (
    echo [ERROR] Failed to upgrade pip
    pause
    exit /b 1
)
echo [OK] pip upgraded
echo.

echo Step 2: Installing Flask and Flask-CORS...
python -m pip install flask flask-cors
if errorlevel 1 (
    echo [ERROR] Failed to install Flask
    pause
    exit /b 1
)
echo [OK] Flask installed
echo.

echo Step 3: Installing NumPy (this may take a minute)...
python -m pip install numpy
if errorlevel 1 (
    echo [ERROR] Failed to install NumPy
    echo Trying with pre-built wheels only...
    python -m pip install --only-binary :all: numpy
    if errorlevel 1 (
        echo [ERROR] NumPy installation failed
        echo.
        echo Please try manually:
        echo   pip install numpy
        pause
        exit /b 1
    )
)
echo [OK] NumPy installed
echo.

echo Step 4: Installing Pandas (this may take a minute)...
python -m pip install pandas
if errorlevel 1 (
    echo [ERROR] Failed to install Pandas
    echo Trying with pre-built wheels only...
    python -m pip install --only-binary :all: pandas
    if errorlevel 1 (
        echo [ERROR] Pandas installation failed
        pause
        exit /b 1
    )
)
echo [OK] Pandas installed
echo.

echo Step 5: Installing scikit-learn (this may take a minute)...
python -m pip install scikit-learn
if errorlevel 1 (
    echo [ERROR] Failed to install scikit-learn
    echo Trying with pre-built wheels only...
    python -m pip install --only-binary :all: scikit-learn
    if errorlevel 1 (
        echo [ERROR] scikit-learn installation failed
        pause
        exit /b 1
    )
)
echo [OK] scikit-learn installed
echo.

echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo All backend dependencies are installed.
echo You can now run: run_me.bat
echo.

cd ..
pause
