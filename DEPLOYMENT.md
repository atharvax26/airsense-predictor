# Deployment Guide

Quick guide to deploy the AQI Prediction Dashboard to production.

## Recommended Setup

**Frontend**: Vercel (free tier)
**Backend**: Render (free tier)

## Deploy Backend to Render

1. Create account at https://render.com
2. Create New Web Service
3. Connect your GitHub repository
4. Configure:
   - Environment: Python
   - Root directory: `backend`
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app`

4. Add gunicorn to requirements.txt:
```bash
cd backend
echo "gunicorn==21.2.0" >> requirements.txt
```

5. Note your backend URL: `https://your-app.onrender.com`

## Deploy Frontend to Vercel

1. Create account at https://vercel.com
2. Import your GitHub repository
3. Configure:
   - Framework: Vite
   - Root directory: `./`
4. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: Your Render backend URL
5. Deploy

## Update CORS

Update `backend/app.py`:
```python
CORS(app, origins=[
    "http://localhost:8080",
    "https://your-app.vercel.app"  # Add your Vercel URL
])
```

## Post-Deployment

Test your deployed app:
- Visit your Vercel URL
- Make a prediction
- Check that it connects to the backend

## Cost

Both Vercel and Render offer free tiers suitable for this project.

## Alternative Platforms

- Frontend: Netlify, GitHub Pages
- Backend: Railway, Heroku, PythonAnywhere
