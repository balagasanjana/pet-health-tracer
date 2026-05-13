# Deployment Guide - Render

This guide walks you through deploying **pet-health-tracer** to Render.

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **MongoDB Atlas Account**: Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) for a free MongoDB instance
3. **GitHub Account**: Repository already pushed (✓ Done)

---

## Step 1: Set Up MongoDB Atlas (Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster
3. Create a database user with username and password
4. Whitelist your IP or use `0.0.0.0/0` (allows all IPs)
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/pet`
6. Copy this string - you'll need it for Render environment variables

---

## Step 2: Deploy Backend on Render

### Option A: Manual Deploy

1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Fill in the details:
   - **Name**: `pet-health-tracer-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. Click **Advanced** and add environment variables:
   ```
   MONGO_URI = mongodb+srv://username:password@cluster.mongodb.net/pet
   NODE_ENV = production
   CORS_ORIGIN = https://your-frontend-url.onrender.com
   ```

6. Click **Create Web Service**
7. Wait for deployment to complete
8. Copy the backend URL (e.g., `https://pet-health-tracer-backend.onrender.com`)

---

## Step 3: Deploy Frontend on Render

1. In Render Dashboard, click **New +** → **Static Site**
2. Connect your GitHub repository
3. Fill in the details:
   - **Name**: `pet-health-tracer-frontend`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

4. Click **Advanced** and add environment variable:
   ```
   REACT_APP_API_URL = https://pet-health-tracer-backend.onrender.com
   ```

5. Click **Create Static Site**
6. Wait for deployment to complete
7. Your frontend will be live at the Render-provided URL

---

## Step 4: Update Your Code for Production

### Backend (`backend/index.js`)
Make sure your backend uses the correct PORT and CORS settings:

```javascript
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: CORS_ORIGIN }));

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
```

### Frontend (`client/src/App.js` or API calls)
Update your API calls to use the environment variable:

```javascript
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// In your API calls:
axios.get(`${API_URL}/api/auth/...`)
```

---

## Step 5: Configure Environment Variables in Render

For both services, you need to set environment variables in Render dashboard:

### Backend Environment Variables:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pet
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.onrender.com
```

### Frontend Environment Variables:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

---

## Step 6: GitHub Integration (Optional but Recommended)

1. Go to Render Dashboard → **Settings** → **Git Integration**
2. Connect your GitHub repository
3. Enable auto-deploy on push
4. Now every push to your `main` branch will automatically redeploy

---

## Common Issues & Solutions

### Issue: Backend won't connect to MongoDB
- **Solution**: Check MongoDB Atlas connection string format
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify `MONGO_URI` environment variable is set correctly

### Issue: CORS errors in frontend
- **Solution**: Update `CORS_ORIGIN` environment variable in backend
- Make sure it matches your frontend Render URL exactly (with `https://`)

### Issue: Frontend can't reach backend API
- **Solution**: Check `REACT_APP_API_URL` environment variable
- Ensure it's set to your backend Render URL
- Verify API endpoints match between frontend and backend

### Issue: Cold start delays
- **Solution**: This is normal on Render's free tier. Services spin down after 15 min of inactivity.
- Upgrade to paid plans to avoid cold starts

---

## Monitoring & Logs

1. Go to your service on Render Dashboard
2. Click **Logs** tab to see real-time logs
3. Click **Events** to see deployment history
4. Monitor for errors and debug accordingly

---

## Next Steps

- ✅ Test your app at the Render-provided URLs
- ✅ Update your GitHub README with deployment links
- ✅ Consider upgrading to paid plan if you need better uptime
- ✅ Set up custom domain (optional, in Render settings)

---

## Troubleshooting Commands

If you need to test locally before deploying:

```bash
# Backend
cd backend
MONGO_URI=your-mongodb-uri npm start

# Frontend (in another terminal)
cd client
REACT_APP_API_URL=http://localhost:5000 npm start
```

---

**Your app is now deployed! 🚀**
