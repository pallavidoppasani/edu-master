# 🚀 EduMaster Deployment Guide

Complete step-by-step guide to deploy EduMaster to production using Render (Backend) and Vercel (Frontend).

---

## 📋 Prerequisites

- [x] GitHub account
- [x] Code pushed to GitHub repository
- [x] Render account (free tier available)
- [x] Vercel account (free tier available)

---

## Part 1: Deploy Backend to Render

### Step 1: Create PostgreSQL Database on Render

1. Go to [https://render.com](https://render.com) and sign in
2. Click **"New +"** → **"PostgreSQL"**
3. Configure database:
   - **Name**: `edumaster-db`
   - **Database**: `edumaster`
   - **User**: `edumaster`
   - **Region**: Choose closest to you
   - **Plan**: Free
4. Click **"Create Database"**
5. Wait for database to be created (2-3 minutes)
6. **IMPORTANT**: Copy the **"External Database URL"** - you'll need this!
   - It looks like: `postgres://user:password@host/database`

### Step 2: Deploy Backend Service

1. On Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository:
   - Click **"Connect GitHub"**
   - Select your repository: `Brainstorm-collab/Edumaster`
   - Click **"Connect"**
3. Configure the service:
   - **Name**: `edumaster-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command**: `node server.js`
   - **Plan**: Free

4. Add Environment Variables (click **"Advanced"** → **"Add Environment Variable"**):
   ```
   DATABASE_URL = <paste your External Database URL from Step 1>
   JWT_SECRET = your-super-secret-key-change-this-123456789
   NODE_ENV = production
   PORT = 5000
   ```

5. Click **"Create Web Service"**
6. Wait for deployment (5-10 minutes)
7. Once deployed, copy your backend URL:
   - It will be something like: `https://edumaster-backend.onrender.com`

### Step 3: Seed the Database

1. In Render dashboard, go to your backend service
2. Click **"Shell"** tab
3. Run the seed command:
   ```bash
   npx prisma db seed
   ```
4. Wait for seeding to complete
5. Verify by checking logs

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend

1. Create a `.env.production` file in the root directory:
   ```
   VITE_API_URL=https://edumaster-backend.onrender.com/api
   ```
   (Replace with your actual Render backend URL)

2. Commit and push this change:
   ```bash
   git add .
   git commit -m "chore: add production environment config"
   git push
   ```

### Step 2: Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository:
   - Click **"Import Git Repository"**
   - Select `Brainstorm-collab/Edumaster`
   - Click **"Import"**

4. Configure Project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variable:
   - Click **"Environment Variables"**
   - Add:
     ```
     Name: VITE_API_URL
     Value: https://edumaster-backend.onrender.com/api
     ```
     (Replace with your actual Render backend URL)

6. Click **"Deploy"**
7. Wait for deployment (3-5 minutes)
8. Once deployed, you'll get a URL like: `https://edumaster-xyz.vercel.app`

---

## Part 3: Update Backend CORS

### Important: Allow Frontend Domain

1. Go to your Render backend service
2. Click **"Environment"** tab
3. Add new environment variable:
   ```
   FRONTEND_URL = https://edumaster-xyz.vercel.app
   ```
   (Replace with your actual Vercel URL)

4. Update `backend/server.js` CORS configuration:
   ```javascript
   const cors = require('cors');
   app.use(cors({
       origin: process.env.FRONTEND_URL || 'http://localhost:5174',
       credentials: true
   }));
   ```

5. Commit and push:
   ```bash
   git add backend/server.js
   git commit -m "fix: update CORS for production"
   git push
   ```

6. Render will auto-deploy the changes

---

## 🎉 Testing Your Deployment

### Test Backend
Visit: `https://edumaster-backend.onrender.com/api/health`
Should return: `{"status":"ok"}`

### Test Frontend
1. Visit your Vercel URL: `https://edumaster-xyz.vercel.app`
2. Try logging in with demo credentials:
   - **Student**: `student0@edumaster.com` / `password123`
   - **Instructor**: `john@edumaster.com` / `password123`
   - **Admin**: `admin@edumaster.com` / `password123`

---

## 🔧 Troubleshooting

### Backend Issues

**Database Connection Error**
- Verify DATABASE_URL is correct
- Check database is running on Render
- Ensure migrations ran successfully

**500 Errors**
- Check Render logs: Dashboard → Your Service → Logs
- Verify all environment variables are set
- Check if Prisma client is generated

### Frontend Issues

**API Errors / CORS**
- Verify VITE_API_URL is correct
- Check backend CORS settings
- Ensure backend is running

**Build Failures**
- Check Vercel build logs
- Verify all dependencies are in package.json
- Ensure no TypeScript errors

### Database Not Seeded

Run seed manually in Render Shell:
```bash
npx prisma db seed
```

---

## 📱 Custom Domain (Optional)

### For Vercel (Frontend)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### For Render (Backend)
1. Go to Service Settings → Custom Domain
2. Add your custom domain
3. Update CORS and frontend env vars

---

## 🔄 Continuous Deployment

Both Render and Vercel are now set up for automatic deployment:
- **Push to GitHub** → Automatically deploys to production
- **Check deployment status** in respective dashboards

---

## 💰 Cost Breakdown

### Free Tier Limits
- **Render**: 750 hours/month (enough for 1 service)
- **Vercel**: 100 GB bandwidth, unlimited deployments
- **PostgreSQL**: 1 GB storage, 97 hours/month

### Upgrade Recommendations
- If app sleeps (Render free tier), upgrade to $7/month
- For production, consider paid PostgreSQL ($7/month)

---

## 🎯 Next Steps

1. ✅ Set up custom domain
2. ✅ Configure email service for notifications
3. ✅ Set up monitoring (Sentry, LogRocket)
4. ✅ Add analytics (Google Analytics)
5. ✅ Set up backups for database

---

## 📞 Support

If you encounter issues:
1. Check Render logs
2. Check Vercel deployment logs
3. Verify environment variables
4. Test API endpoints manually

---

## 🎊 Congratulations!

Your EduMaster LMS is now live on the internet! 🚀

- **Frontend**: https://edumaster-xyz.vercel.app
- **Backend**: https://edumaster-backend.onrender.com
