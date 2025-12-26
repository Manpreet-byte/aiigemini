# ✅ Vercel Deployment Checklist

## Pre-Deployment (Do Once)

- [ ] **GitHub**: Create repo and push code
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR_USERNAME/aiigemini.git
  git push -u origin main
  ```

- [ ] **Vercel Account**: Sign up at [vercel.com](https://vercel.com)

- [ ] **Gemini API Key**: Get from [Google AI Studio](https://aistudio.google.com/app/apikey)

- [ ] **Firebase Project**: Already set up (myaiii)

## Deployment (5 mins)

1. Go to [vercel.com](https://vercel.com) → "Add New Project"
2. Select your GitHub repo
3. Add **Environment Variables** (see below)
4. Click "Deploy" ✓

### Environment Variables to Add:

```
GEMINI_API_KEY = your_gemini_key_here
VITE_API_BASE_URL = /api
VITE_FIREBASE_API_KEY = your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN = myaiii.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = myaiii
VITE_FIREBASE_STORAGE_BUCKET = myaiii.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = 975491646257
VITE_FIREBASE_APP_ID = 1:975491646257:web:b5e9162dd5587865126610
```

## Post-Deployment

- [ ] **Firebase Auth Domain**: Add `your-project.vercel.app` to Firebase → Auth → Authorized Domains
- [ ] **Test**: Open your Vercel URL, log in, send a message
- [ ] **Monitor**: Check Vercel Dashboard for errors/performance

## What's Deployed

```
vercel.com/your-username/your-project
├── / → React frontend (from dist/)
├── /api/chat → Serverless text chat
└── /api/vision → Serverless image analysis
```

## If Issues:

| Issue | Solution |
|-------|----------|
| API calls fail | Check env vars in Vercel Dashboard; redeploy |
| Firebase login fails | Add your Vercel domain to Firebase Authorized Domains |
| Build fails | Run `npm run build` locally to test |
| Rollback needed | Vercel Dashboard → Deployments → select older version |

---

**Questions?** See `VERCEL_DEPLOYMENT.md` for full guide.
