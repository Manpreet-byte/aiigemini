# Firebase Authentication Setup Guide

This guide will help you integrate Firebase Authentication into your Gemini Chat application.

## Step 1: Install Firebase

```bash
npm install firebase
```

## Step 2: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Enable Google Analytics (optional)

## Step 3: Enable Authentication Methods

1. In your Firebase project, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** sign-in provider
4. Add your domain to authorized domains

## Step 4: Get Firebase Config

1. Go to **Project Settings** > **General**
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Copy the Firebase configuration object

## Step 5: Create Firebase Config File

Create a file `src/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
```

## Step 6: Update AuthPage.jsx

Replace the TODO comments in `src/AuthPage.jsx`:

```javascript
import { auth, googleProvider } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';

// In handleSubmit function:
if (isLogin) {
  // Login
  const userCredential = await signInWithEmailAndPassword(
    auth,
    formData.email,
    formData.password
  );
  onAuthSuccess({
    email: userCredential.user.email,
    name: userCredential.user.displayName || userCredential.user.email.split('@')[0]
  });
} else {
  // Sign up
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    formData.email,
    formData.password
  );
  
  // Update profile with name
  await updateProfile(userCredential.user, {
    displayName: formData.name
  });
  
  onAuthSuccess({
    email: userCredential.user.email,
    name: formData.name
  });
}

// In handleGoogleSignIn function:
const result = await signInWithPopup(auth, googleProvider);
onAuthSuccess({
  email: result.user.email,
  name: result.user.displayName
});
```

## Step 7: Add Persistent Login (Optional)

Update `src/App.jsx` to check for existing auth state:

```javascript
import { useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          email: currentUser.email,
          name: currentUser.displayName || currentUser.email.split('@')[0]
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user ? (
        <AIChat user={user} onLogout={handleLogout} />
      ) : (
        <AuthPage onAuthSuccess={setUser} />
      )}
    </>
  );
}
```

## Environment Variables (Recommended)

Create a `.env` file in your project root:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Then update `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Additional Features

### Password Reset

```javascript
import { sendPasswordResetEmail } from 'firebase/auth';

const handlePasswordReset = async (email) => {
  await sendPasswordResetEmail(auth, email);
  alert('Password reset email sent!');
};
```

### Email Verification

```javascript
import { sendEmailVerification } from 'firebase/auth';

// After sign up:
await sendEmailVerification(userCredential.user);
```

## Security Rules

Remember to set up Firebase Security Rules for your Firestore/Storage if you plan to store user data.

## Testing

The current implementation has mock authentication that works without Firebase. Once you implement Firebase:

1. Test email/password sign up
2. Test email/password login
3. Test Google sign-in
4. Test logout
5. Test persistent login (refresh page)

## Support

For more information, visit:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth/web/start)
