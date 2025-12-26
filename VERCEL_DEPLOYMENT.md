# Vercel Deployment Guide

## What's Changed

Your project now has **Vercel serverless API routes** instead of a separate backend server:

- **Frontend**: Deployed to Vercel (auto-built from `src/` and `dist/`)
- **Backend APIs**: Vercel serverless functions in `/api` folder
  - `/api/chat` → `/api/chat.js` (text chat proxy)
  - `/api/vision` → `/api/vision.js` (image analysis proxy)

## Prerequisites

1. **Vercel Account**: [Sign up free](https://vercel.com)
2. **GitHub Account**: Push your code to GitHub (Vercel deploys from Git)
3. **Environment Variables**: API keys for Gemini and Firebase

## Step-by-Step Deployment

### 1. Push Code to GitHub

```bash
cd /home/sama/projects/aiii

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: AI chatbot with Vercel deployment"

# Create new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/aiigemini.git
git branch -M main
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..." → "Project"**
3. Select your GitHub repository (`aiigemini`)
4. Vercel auto-detects it's a Vite + Node project ✓

### 3. Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
GEMINI_API_KEY=your_gemini_api_key_here
VITE_API_BASE_URL=/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=myaiii.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myaiii
VITE_FIREBASE_STORAGE_BUCKET=myaiii.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=975491646257
VITE_FIREBASE_APP_ID=1:975491646257:web:b5e9162dd5587865126610
```

> **Note**: Replace Firebase values with your actual credentials from Firebase Console.

### 4. Update Firebase Authorized Domains

Firebase security requires you to add your Vercel domain:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project → **Authentication** → **Settings** → **Authorized Domains**
3. Add your Vercel URL: `your-project-name.vercel.app`
4. Also add `localhost` if testing locally

### 5. Deploy

Click **"Deploy"** in Vercel Dashboard.

Vercel will:
- ✅ Build frontend: `npm run build` → `dist/`
- ✅ Deploy serverless APIs from `/api`
- ✅ Output: `https://your-project-name.vercel.app`

## How It Works

### Local Development

```bash
# Backend on port 3001, Frontend on port 5174
npm run dev:full
```

**Frontend** calls `http://localhost:3001/api/chat` and `/api/vision`

### Vercel Production

```
https://your-project-name.vercel.app/
  ├── Frontend (React app)
  ├── /api/chat → Serverless function
  └── /api/vision → Serverless function
```

**Frontend** calls `/api/chat` and `/api/vision` (relative URLs)

## Troubleshooting

### "GEMINI_API_KEY not configured"
- ✅ Check Vercel Environment Variables are saved
- ✅ Redeploy after adding env vars: `git push` → auto-deploy

### "Firebase domain not authorized"
- ✅ Add your `*.vercel.app` domain to Firebase → Authentication → Authorized Domains

### API calls failing (CORS)
- ✅ Vercel serverless functions automatically handle CORS
- ✅ Check Network tab in DevTools to see actual response

### Build fails
- ✅ Run locally: `npm run build` to test
- ✅ Check Vercel build logs (Project → Deployments)

## Rolling Back

If something breaks:
```bash
# Go to Vercel Dashboard → Deployments → select previous version → "Redeploy"
```

## Next Steps

1. **Monitor**: Vercel Dashboard shows build status, deployments, analytics
2. **Custom Domain**: Add your domain in Project Settings → Domains
3. **Analytics**: Monitor API usage and errors
4. **Logs**: Check `vercel logs --tail` in CLI

---

**Your project is now serverless, auto-scaling, and production-ready!** 🚀
