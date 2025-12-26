# GitHub Deployment Guide

Both frontend and backend are ready to be deployed to GitHub as separate repositories.

## Frontend Repository Setup

**Local Status:** ✅ Git initialized and committed
- Location: `/home/sama/projects/aiii`
- Branch: `main`
- Commit: "Initial commit: AI Chatbot frontend with responsive design, Firebase integration, and API proxy"

**Steps to Deploy Frontend:**

1. **Create GitHub Repository** (on github.com)
   - Go to https://github.com/new
   - Repository name: `aiigemini-frontend`
   - Description: "React + Firebase AI Chatbot with Responsive Design and Gemini Integration"
   - Visibility: Public (recommended for portfolio) or Private
   - Do NOT initialize with README, .gitignore, or license (we have them)
   - Click "Create repository"

2. **Add Remote and Push**
   ```bash
   cd /home/sama/projects/aiii
   git remote add origin https://github.com/YOUR_USERNAME/aiigemini-frontend.git
   git branch -M main
   git push -u origin main
   ```

3. **Verify**
   - Visit https://github.com/YOUR_USERNAME/aiigemini-frontend
   - You should see all frontend files

---

## Backend Repository Setup

**Local Status:** ✅ Git initialized and committed
- Location: `/tmp/aiigemini-backend`
- Branch: `master` (you can rename to `main` if preferred)
- Commit: "Initial commit: Express.js backend with Gemini API proxy endpoints"

**Steps to Deploy Backend:**

1. **Create GitHub Repository** (on github.com)
   - Go to https://github.com/new
   - Repository name: `aiigemini-backend`
   - Description: "Express.js Backend Server with Gemini AI API Proxy"
   - Visibility: Public or Private
   - Do NOT initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Add Remote and Push**
   ```bash
   cd /tmp/aiigemini-backend
   git remote add origin https://github.com/YOUR_USERNAME/aiigemini-backend.git
   git branch -M main
   git push -u origin main
   ```

3. **Verify**
   - Visit https://github.com/YOUR_USERNAME/aiigemini-backend
   - You should see all backend files (package.json, src/index.js, README.md, etc.)

---

## What Gets Deployed

### Frontend (`aiigemini-frontend`)
```
src/
  - AIChat.jsx (main chat component)
  - Chat.css (responsive styles)
  - ChatHistory.css
  - App.jsx
  - main.jsx
  - index.css
api/
  - chat.js (Vercel serverless)
  - vision.js (Vercel serverless)
public/
package.json
vite.config.js
vercel.json
VERCEL_DEPLOYMENT.md
DEPLOYMENT_CHECKLIST.md
.env.example
.gitignore
README.md
```

### Backend (`aiigemini-backend`)
```
src/
  - index.js (Express server)
package.json
package-lock.json
.env.example
.gitignore
README.md
```

---

## Next Steps After GitHub Deployment

### Option A: Deploy Frontend to Vercel
1. Go to https://vercel.com/new
2. Import `aiigemini-frontend` repository
3. Add environment variables (Firebase keys)
4. Deploy

### Option B: Deploy Backend to Render/Railway/Heroku
1. Backend can run on any Node.js hosting:
   - Render.com
   - Railway.app
   - Heroku
   - AWS EC2
   - DigitalOcean

---

## Environment Variables Needed

### Frontend (`.env` in root)
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:3001/api
```

### Backend (`.env` in backend root)
```
GEMINI_API_KEY=your_gemini_api_key
PORT=3001
NODE_ENV=development
```

---

## Useful Commands

### Frontend
```bash
cd /home/sama/projects/aiii

# View git status
git status

# View commit history
git log --oneline

# Make changes and push
git add .
git commit -m "Your message"
git push
```

### Backend
```bash
cd /tmp/aiigemini-backend

# View git status
git status

# View commit history
git log --oneline

# Make changes and push
git add .
git commit -m "Your message"
git push
```

---

## Troubleshooting

**Error: "fatal: remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/repo.git
```

**Error: "Permission denied (publickey)"**
- Make sure you have SSH keys set up: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
- Or use HTTPS URL instead of SSH

**Branch is "master" instead of "main"**
```bash
git branch -M main
```

---

## Summary

✅ **Frontend:** Ready at `/home/sama/projects/aiii`
✅ **Backend:** Ready at `/tmp/aiigemini-backend`
✅ **Both:** Git initialized, committed, and awaiting remote URLs

**Next Action:** Create two repositories on GitHub and run the push commands above.
