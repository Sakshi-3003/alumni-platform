# Deployment Guide - Quick Hosting for Hackathon

## 🚀 Fastest Deployment Options

### Option 1: Free Tier Deployment (Recommended for Hackathon)

#### Step 1: Deploy Database (MongoDB Atlas)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a free cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Save this for backend deployment

#### Step 2: Deploy Backend (Render.com - FREE)

1. **Push code to GitHub first:**
```bash
cd c:\Users\sakshi\Desktop\hackoverflow
git init
git add .
git commit -m "Initial commit"
# Create repo on GitHub, then:
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

2. **Deploy on Render:**
   - Go to https://render.com
   - Sign up (free)
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Select `backend` folder
   - Settings:
     ```
     Name: alumni-platform-api
     Environment: Node
     Build Command: npm install && npm run build
     Start Command: npm start
     ```
   - Add Environment Variables:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your-random-secret-key-change-this
     JWT_EXPIRE=7d
     FRONTEND_URL=https://your-frontend-url.vercel.app
     NODE_ENV=production
     PORT=5000
     ```
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Copy the URL (e.g., `https://alumni-platform-api.onrender.com`)

#### Step 3: Deploy Frontend (Vercel - FREE)

1. **Update frontend environment:**
   
Create `frontend/.env.production`:
```bash
VITE_API_URL=https://your-backend-url.onrender.com/api
```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "Import Project"
   - Select your GitHub repo
   - Settings:
     ```
     Framework Preset: Vite
     Root Directory: frontend
     Build Command: npm run build
     Output Directory: dist
     ```
   - Add Environment Variable:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```
   - Click "Deploy"
   - Wait 2-3 minutes
   - Copy the URL (e.g., `https://alumni-platform.vercel.app`)

3. **Update Backend CORS:**
   - Go back to Render dashboard
   - Update `FRONTEND_URL` environment variable with your Vercel URL
   - Save (it will redeploy)

## 🎯 Alternative: Quick Local Demo Link

If deployment takes too long, use **ngrok** for quick demo:

1. **Install ngrok:**
```bash
# Download from https://ngrok.com/download
# Or: choco install ngrok (if you have chocolatey)
```

2. **Expose your local server:**
```bash
# Backend (in one terminal)
ngrok http 5000

# Frontend (in another terminal)  
ngrok http 5173
```

3. **Share the ngrok URLs** - they'll look like:
   - Backend: `https://abc123.ngrok.io`
   - Frontend: `https://xyz789.ngrok.io`

## 📋 Quick Deployment Checklist

### Before Deploying:

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas account created
- [ ] Environment variables prepared
- [ ] Remove any hardcoded localhost URLs

### For Backend:
- [ ] Build command works: `npm run build`
- [ ] Start command works: `npm start`
- [ ] All environment variables set
- [ ] CORS configured for frontend URL

### For Frontend:
- [ ] VITE_API_URL points to deployed backend
- [ ] Build command works: `npm run build`
- [ ] No localhost references in code

## 🔗 Your Deployment URLs

After deployment, you'll have:

```
Frontend: https://alumni-platform.vercel.app
Backend API: https://alumni-platform-api.onrender.com
Database: MongoDB Atlas (cloud)
```

Add these to your hackathon submission!

## ⚡ Super Quick Option (If time is critical)

**Use Railway.app** - Deploys both in one go:

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repo
5. Railway auto-detects both frontend and backend
6. Add environment variables in dashboard
7. Get both URLs instantly

**Railway gives you:**
- `https://your-app.railway.app` (frontend)
- `https://your-api.railway.app` (backend)
- Free MongoDB plugin (click "Add Plugin" → MongoDB)

## 🎥 For Demo Video

If you need a video demo instead of live deployment:

1. **Screen Record**: Use OBS Studio or Windows Game Bar
2. **Show features**: Registration → Jobs → Mentorship
3. **Upload to**: YouTube (unlisted) or Loom
4. **Share link** in hackathon submission

## 💡 Tips

- **Render free tier**: Backend sleeps after 15 min inactivity (wakes in 30s on first request)
- **Vercel**: Instant and always active
- **ngrok**: Great for quick demos but URL changes every restart
- **Railway**: Easiest but has monthly hours limit on free tier

## 🆘 If Deployment Fails

Share these instead:
1. **GitHub Repository URL**
2. **Demo Video (Loom/YouTube)**
3. **Screenshots of working features**
4. **README with setup instructions**

Most hackathons accept these alternatives!

---

**Need help deploying? Let me know which option you want to try!**
