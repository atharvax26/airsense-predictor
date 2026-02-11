# Windows Installation Fix

If you're seeing errors like "Compiler cl cannot compile programs" or "metadata-generation-failed", follow this guide.

## The Problem

Windows doesn't have a C compiler by default, and some Python packages (numpy, pandas) need to compile C code. This causes installation failures.

## Solution 1: Use Pre-built Wheels (Easiest)

Run the dedicated installer:

```bash
install_backend.bat
```

This installs packages one-by-one with pre-built wheels.

## Solution 2: Manual Installation (Recommended)

Open Command Prompt and run these commands one by one:

```bash
cd backend

# Upgrade pip first
python -m pip install --upgrade pip

# Install packages one by one
python -m pip install flask flask-cors
python -m pip install numpy
python -m pip install pandas
python -m pip install scikit-learn
```

## Solution 3: Use Conda (Alternative)

If you have Anaconda or Miniconda installed:

```bash
cd backend

# Create a new environment
conda create -n aqi python=3.10

# Activate it
conda activate aqi

# Install packages
conda install flask flask-cors numpy pandas scikit-learn
pip install flask-cors
```

Then modify `run_me.bat` to use `conda activate aqi` before running.

## Solution 4: Install Visual Studio Build Tools

If you want to compile from source:

1. Download: https://visualstudio.microsoft.com/visual-cpp-build-tools/
2. Install "Desktop development with C++"
3. Restart computer
4. Try `pip install -r requirements.txt` again

## Verify Installation

After installation, test if it works:

```bash
cd backend
python -c "import flask; import pandas; import numpy; import sklearn; print('All packages installed!')"
```

Expected output: `All packages installed!`

## Quick Test

Test the backend:

```bash
cd backend
python app.py
```

You should see:
```
* Running on http://127.0.0.1:5000
```

## Still Having Issues?

### Error: "No module named 'flask'"

```bash
pip install flask flask-cors
```

### Error: "No module named 'numpy'"

```bash
pip install --only-binary :all: numpy
```

### Error: "No module named 'pandas'"

```bash
pip install --only-binary :all: pandas
```

### Error: "No module named 'sklearn'"

```bash
pip install --only-binary :all: scikit-learn
```

## Alternative: Use requirements-windows.txt

```bash
cd backend
pip install -r requirements-windows.txt
```

This uses version ranges that are more likely to have pre-built wheels.

## Check Your Python Version

```bash
python --version
```

Should be 3.8 or higher. If it's 3.12+, some packages might not have wheels yet. Try Python 3.10 or 3.11.

## Upgrade pip

Old pip versions don't download wheels properly:

```bash
python -m pip install --upgrade pip
```

## Use Python from Microsoft Store

If nothing works, try:

1. Uninstall current Python
2. Install Python from Microsoft Store
3. Try installation again

Microsoft Store Python comes with better Windows compatibility.

## Last Resort: Use Docker

If all else fails, use Docker:

```dockerfile
# Create Dockerfile in backend/
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

Then:
```bash
docker build -t aqi-backend .
docker run -p 5000:5000 aqi-backend
```

## Success Checklist

After fixing, verify:

- [ ] `python -c "import flask"` works
- [ ] `python -c "import numpy"` works
- [ ] `python -c "import pandas"` works
- [ ] `python -c "import sklearn"` works
- [ ] `python app.py` starts without errors
- [ ] Can access http://localhost:5000/health

## Next Steps

Once backend is installed:

1. Run `run_me.bat` to start everything
2. Or manually:
   - Terminal 1: `cd backend && python app.py`
   - Terminal 2: `npm run dev`

## Need More Help?

Check these files:
- `QUICKSTART.md` - Basic setup guide
- `BATCH_FILES_GUIDE.md` - Batch file usage
- `TESTING_GUIDE.md` - Testing instructions

Or create a GitHub issue with:
- Your Python version
- Your Windows version
- The full error message
- What you've tried so far
