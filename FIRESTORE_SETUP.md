# Firestore Setup Guide

## Common Issues and Solutions

### Issue: AI Not Responding

If the AI is not responding to your messages, check these things:

#### 1. Check Browser Console (F12)
Look for errors like:
- `Error loading messages`
- `Error saving user message`
- `The query requires an index`

#### 2. Create Required Firestore Indexes

Firestore needs indexes for queries with `where()` + `orderBy()`.

**To create indexes:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **myaiii**
3. Click **Firestore Database** in the left menu
4. Click the **Indexes** tab
5. Click **Create Index**

**Required Indexes:**

**Index 1: Messages by chatId**
- Collection ID: `messages`
- Fields to index:
  - `chatId` - Ascending
  - `createdAt` - Ascending
- Query scope: Collection

**Index 2: Chats by userId**
- Collection ID: `chats`
- Fields to index:
  - `userId` - Ascending
  - `updatedAt` - Descending
- Query scope: Collection

#### 3. Alternative: Click Error Link

When you see an index error in the console, Firebase provides a direct link to create the index. Just click it!

Example error:
```
The query requires an index. You can create it here: https://console.firebase.google...
```

Click that link and it will auto-create the index for you!

#### 4. Wait for Index Creation

After creating indexes, wait 1-2 minutes for them to build. You'll see "Building..." then "Enabled" status.

#### 5. Refresh the Page

Once indexes are enabled, refresh your browser page and try sending a message again.

---

## Testing Checklist

✅ Firestore Database is enabled  
✅ Firestore rules allow read/write (test mode)  
✅ Required indexes are created and enabled  
✅ Browser console shows no errors  
✅ Chat ID is created on first load  
✅ Messages are being saved to Firestore  
✅ AI responses appear after sending messages  

---

## Still Having Issues?

1. **Check Firestore Rules** - Make sure they allow read/write
2. **Check API Key** - Ensure Gemini API key is valid
3. **Check Network Tab** - Look for failed API calls
4. **Clear Browser Cache** - Try hard refresh (Ctrl+Shift+R)
5. **Check Console Logs** - Look for detailed error messages

The app now has extensive logging to help debug issues. Open your browser console (F12) and watch for messages starting with:
- `Loading messages for chat:`
- `Saving message to Firestore...`
- `Calling Gemini API...`

This will help you pinpoint exactly where the issue is occurring.
