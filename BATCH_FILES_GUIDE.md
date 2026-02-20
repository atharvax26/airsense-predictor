# Batch Files Guide

Easy automation scripts for Windows to run the AQI Dashboard.

## 📁 Available Scripts

### 1. `run_simple.bat` - Start Everything

**What it does:**
- ✅ Checks if Python and Node.js are installed
- ✅ Checks backend dependencies
- ✅ Installs frontend dependencies (if needed)
- ✅ Starts Flask backend in a new window
- ✅ Starts Vite frontend in a new window
- ✅ Opens your browser automatically

**How to use:**
1. Double-click `run_simple.bat`
2. Wait for both servers to start
3. Browser opens automatically to http://localhost:8080
4. Start using the dashboard!

**What you'll see:**
- Two command windows will open:
  - "AQI Backend" - Flask server running
  - "AQI Frontend" - Vite dev server running
- Your default browser opens to the dashboard

### 2. `stop_servers.bat` - Stop Everything

**What it does:**
- ✅ Stops the Flask backend
- ✅ Stops the Vite frontend
- ✅ Closes server windows

**How to use:**
1. Double-click `stop_servers.bat`
2. All servers stop immediately

**Alternative ways to stop:**
- Close both terminal windows manually
- Press Ctrl+C in each window

### 3. `install_backend.bat` - Install Backend Dependencies

**What it does:**
- ✅ Upgrades pip
- ✅ Installs Flask and Flask-CORS
- ✅ Installs NumPy, Pandas, scikit-learn

**When to use:**
- First time setup
- After pulling new code
- If backend dependencies are missing

### 4. `diagnose.bat` - Troubleshooting Tool

**What it does:**
- ✅ Checks Python and Node.js installation
- ✅ Verifies all dependencies
- ✅ Tests backend startup
- ✅ Checks if ports are available

**When to use:**
- Something isn't working
- Need to verify installation
- Debugging issues

## 🚀 Quick Start

### First Time Setup

1. Make sure you have installed:
   - Python 3.8+ from https://www.python.org/
   - Node.js 18+ from https://nodejs.org/

2. Install backend dependencies:
   - Double-click `install_backend.bat`

3. Double-click `run_simple.bat`

4. Wait for installation (first time only):
   - Frontend dependencies install (~2-3 minutes)

5. Dashboard opens in your browser!

### Daily Use

Just double-click `run_simple.bat` - everything starts automatically!

## 🔧 Troubleshooting

### "Python is not installed or not in PATH"

**Solution:**
1. Install Python from https://www.python.org/
2. During installation, check "Add Python to PATH"
3. Restart your computer
4. Try again

### "Node.js is not installed or not in PATH"

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart your computer
3. Try again

### "Failed to install backend dependencies"

**Solution - Use dedicated installer:**
```bash
install_backend.bat
```

**Alternative - Manual installation:**
```bash
cd backend
python -m pip install --upgrade pip
python -m pip install flask flask-cors
python -m pip install numpy
python -m pip install pandas
python -m pip install scikit-learn
```

**See detailed fix guide:**
Check `WINDOWS_INSTALL_FIX.md` for comprehensive solutions.

### "Failed to install frontend dependencies"

**Solution:**
```bash
npm cache clean --force
npm install
```

### Servers don't stop with stop_servers.bat

**Solution:**
1. Open Task Manager (Ctrl+Shift+Esc)
2. Find "Python" and "Node.js" processes
3. Right-click → End Task

### Port already in use

**Backend (Port 5000):**
- Another app is using port 5000
- Stop that app or change port in `backend/app.py`

**Frontend (Port 8080):**
- Vite will automatically use next available port (8081, 8082, etc.)
- Check the terminal for the actual port

### Browser doesn't open automatically

**Solution:**
- Manually open: http://localhost:8080
- Check if popup blocker is preventing it

## 📝 What Happens Behind the Scenes

### run_simple.bat Flow

```
1. Check Python installed → ✓
2. Check Node.js installed → ✓
3. Check backend dependencies → Must be pre-installed
4. Check frontend dependencies → Install if needed
5. Start backend in new window → Port 5000
6. Wait 5 seconds
7. Start frontend in new window → Port 8080
8. Wait 10 seconds
9. Open browser → http://localhost:8080
10. Done!
```

### File Locations

```
airsense-predictor/
├── run_simple.bat       ← Double-click this to start
├── stop_servers.bat     ← Double-click this to stop
├── install_backend.bat  ← Install backend dependencies
├── diagnose.bat         ← Troubleshooting tool
├── backend/
│   └── app.py          ← Flask server
└── src/
    └── ...             ← React frontend
```

## 🎯 Tips

### Keep Windows Open
- Don't close the terminal windows while using the dashboard
- They show important logs and errors

### Check Logs
- Backend window shows Flask logs
- Frontend window shows Vite logs
- Look here if something goes wrong

### Restart Servers
1. Run `stop_servers.bat`
2. Run `run_simple.bat` again

### Update Dependencies
If you pull new code from GitHub:
1. Run `install_backend.bat` for backend updates
2. Delete `node_modules` folder
3. Run `run_simple.bat` (will reinstall frontend)

## 🔄 Manual Commands (Alternative)

If batch files don't work, use these commands:

**Start Backend:**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

**Start Frontend (new terminal):**
```bash
npm install
npm run dev
```

## 📊 System Requirements

- **OS**: Windows 10/11
- **Python**: 3.8 or higher
- **Node.js**: 18 or higher
- **RAM**: 2GB minimum
- **Disk**: 500MB for dependencies

## 🆘 Still Having Issues?

1. Check QUICKSTART.md for detailed setup
2. Check TESTING_GUIDE.md for testing steps
3. Look at terminal windows for error messages
4. Create a GitHub issue with:
   - Error message
   - Python version (`python --version`)
   - Node version (`node --version`)
   - Windows version

## 🎉 Success Indicators

You know it's working when:
- ✅ Two terminal windows are open
- ✅ Backend shows: "Running on http://127.0.0.1:5000"
- ✅ Frontend shows: "Local: http://localhost:8080/"
- ✅ Browser opens to the dashboard
- ✅ You can select city and make predictions

## 🔐 Security Note

These batch files only run on your local machine. They don't:
- ❌ Send data anywhere
- ❌ Modify system files
- ❌ Install anything globally
- ❌ Require admin rights

Everything runs locally and safely!
