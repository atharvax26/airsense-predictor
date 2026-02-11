# Deployment Guide

Guide to deploy the AQI Prediction Dashboard to production.

## Architecture Overview

```
Frontend (Vercel/Netlify)
    ↓ HTTPS
Backend (Render/Railway/Heroku)
    ↓
ML Model (Pickle files)
```

## Option 1: Vercel (Frontend) + Render (Backend)

### Deploy Backend to Render

1. **Create Render Account**: https://render.com

2. **Create New Web Service**:
   - Connect your GitHub repository
   - Select "Python" environment
   - Root directory: `backend`
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app`

3. **Add gunicorn to requirements.txt**:
```bash
cd backend
echo "gunicorn==21.2.0" >> requirements.txt
git add requirements.txt
git commit -m "Add gunicorn for production"
git push
```

4. **Environment Variables** (in Render dashboard):
   - None required for basic setup

5. **Note the URL**: e.g., `https://your-app.onrender.com`

### Deploy Frontend to Vercel

1. **Create Vercel Account**: https://vercel.com

2. **Import Project**:
   - Connect GitHub repository
   - Framework: Vite
   - Root directory: `./`

3. **Environment Variables**:
   - Key: `VITE_API_URL`
   - Value: `https://your-app.onrender.com` (your Render URL)

4. **Deploy**: Click Deploy

5. **Note the URL**: e.g., `https://your-app.vercel.app`

### Update CORS in Backend

Update `backend/app.py`:
```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:5173",
    "https://your-app.vercel.app"  # Add your Vercel URL
])
```

## Option 2: Netlify (Frontend) + Railway (Backend)

### Deploy Backend to Railway

1. **Create Railway Account**: https://railway.app

2. **New Project**:
   - Deploy from GitHub repo
   - Select your repository
   - Railway auto-detects Python

3. **Configure**:
   - Root directory: `backend`
   - Start command: `gunicorn app:app`

4. **Generate Domain**: Railway provides a URL

5. **Environment Variables**: None needed

### Deploy Frontend to Netlify

1. **Create Netlify Account**: https://netlify.com

2. **New Site from Git**:
   - Connect GitHub
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment Variables**:
   - `VITE_API_URL`: Your Railway backend URL

4. **Deploy**

## Option 3: All-in-One (Heroku)

### Deploy Backend to Heroku

1. **Create Heroku Account**: https://heroku.com

2. **Install Heroku CLI**:
```bash
# Windows
winget install Heroku.HerokuCLI

# Mac
brew tap heroku/brew && brew install heroku
```

3. **Create Procfile** in backend/:
```
web: gunicorn app:app
```

4. **Deploy**:
```bash
cd backend
heroku login
heroku create your-app-name
git subtree push --prefix backend heroku main
```

5. **Note URL**: `https://your-app-name.herokuapp.com`

### Deploy Frontend

Use Vercel or Netlify as described above.

## Post-Deployment Checklist

### Backend
- [ ] Health endpoint works: `curl https://your-backend/health`
- [ ] Predict endpoint works with test data
- [ ] CORS configured for frontend domain
- [ ] Logs show no errors
- [ ] Response time < 2 seconds

### Frontend
- [ ] Site loads without errors
- [ ] Can make predictions successfully
- [ ] Theme toggle works
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Environment variables set correctly

### Integration
- [ ] Frontend can reach backend
- [ ] Predictions return real data
- [ ] Error handling works
- [ ] Toast notifications appear
- [ ] All three cities work

## Monitoring

### Backend Monitoring

**Render/Railway/Heroku** provide built-in logs:
- Check for errors
- Monitor response times
- Track API usage

### Frontend Monitoring

Consider adding:
- Google Analytics
- Sentry for error tracking
- Vercel Analytics

## Custom Domain (Optional)

### Frontend Domain

**Vercel:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

**Netlify:**
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

### Backend Domain

**Render/Railway:**
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS CNAME record

## SSL/HTTPS

All platforms (Vercel, Netlify, Render, Railway, Heroku) provide free SSL certificates automatically.

## Environment Variables Summary

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.com
```

### Backend
No environment variables needed for basic setup.

For advanced setup, consider:
```
FLASK_ENV=production
SECRET_KEY=your-secret-key
ALLOWED_ORIGINS=https://your-frontend.com
```

## Scaling Considerations

### Backend
- **Free tier**: Good for testing, may sleep after inactivity
- **Paid tier**: Always on, better performance
- **Caching**: Add Redis for frequently requested predictions
- **Database**: Store predictions for analytics

### Frontend
- Static hosting scales automatically
- CDN distribution included
- No scaling concerns

## Cost Estimates

### Free Tier (Hobby Projects)
- Vercel: Free
- Netlify: Free
- Render: Free (with limitations)
- Railway: $5/month credit
- **Total**: $0-5/month

### Production Tier
- Vercel Pro: $20/month
- Render Standard: $7/month
- **Total**: ~$27/month

## Backup Strategy

### Code
- Already backed up in GitHub

### Model Files
- Stored in repository
- Consider separate storage for large models (S3, Google Cloud Storage)

### Data
- CSV file in repository
- For production, use proper database

## Rollback Plan

If deployment fails:

1. **Revert Git Commit**:
```bash
git revert HEAD
git push
```

2. **Redeploy Previous Version**:
   - Vercel/Netlify: Use dashboard to rollback
   - Render/Railway: Redeploy previous commit

## Security Best Practices

1. **API Rate Limiting**: Add Flask-Limiter
```python
from flask_limiter import Limiter

limiter = Limiter(app, default_limits=["100 per hour"])
```

2. **Input Validation**: Already implemented in backend

3. **HTTPS Only**: Enforced by hosting platforms

4. **Environment Variables**: Never commit .env files

5. **CORS**: Only allow your frontend domain

## Performance Optimization

### Backend
- Use gunicorn with multiple workers
- Enable gzip compression
- Cache predictions

### Frontend
- Already optimized by Vite build
- Images optimized
- Code splitting enabled

## Troubleshooting Deployment

### Backend Issues

**"Application Error"**
- Check logs in hosting dashboard
- Verify all dependencies in requirements.txt
- Check Python version compatibility

**"Module not found"**
- Ensure requirements.txt is complete
- Check build logs

**"Port binding error"**
- Use `app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))`

### Frontend Issues

**"Failed to fetch"**
- Check VITE_API_URL is correct
- Verify backend is running
- Check CORS configuration

**"Build failed"**
- Check for TypeScript errors locally
- Verify all dependencies in package.json

## Maintenance

### Regular Tasks
- Monitor error logs weekly
- Check API response times
- Update dependencies monthly
- Review and optimize costs

### Updates
```bash
# Update backend dependencies
cd backend
pip list --outdated
pip install --upgrade package-name

# Update frontend dependencies
npm outdated
npm update
```

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **Flask Deployment**: https://flask.palletsprojects.com/en/latest/deploying/

## Success Metrics

Track these after deployment:
- Uptime percentage (aim for 99.9%)
- Average response time (< 1 second)
- Error rate (< 1%)
- User engagement
- Prediction accuracy feedback

## Next Steps After Deployment

1. Share the URL with users
2. Gather feedback
3. Monitor performance
4. Plan feature enhancements
5. Consider adding analytics
6. Set up automated backups
7. Create status page
