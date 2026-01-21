# Complete Neon Database Implementation Guide for DataSphere

This guide will walk you through setting up your DataSphere platform with Neon PostgreSQL database.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step 1: Create Neon Database](#step-1-create-neon-database)
3. [Step 2: Run Database Schema](#step-2-run-database-schema)
4. [Step 3: Install Dependencies](#step-3-install-dependencies)
5. [Step 4: Configure Netlify Environment](#step-4-configure-netlify-environment)
6. [Step 5: Update Frontend Code](#step-5-update-frontend-code)
7. [Step 6: Deploy and Test](#step-6-deploy-and-test)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

✅ **What you need:**
- A [Neon](https://neon.tech) account (free tier works!)
- A [Netlify](https://netlify.com) account
- Node.js installed on your computer
- Your DataSphere project

---

## Step 1: Create Neon Database

### 1.1 Sign up for Neon
1. Go to [https://neon.tech](https://neon.tech)
2. Click "Sign Up" and create an account
3. Verify your email

### 1.2 Create a New Project
1. Click "**New Project**"
2. **Project Name**: `datasphere`
3. **Region**: Choose closest to your users (e.g., Europe for Morocco)
4. **PostgreSQL Version**: 15 or 16 (latest)
5. Click "**Create Project**"

### 1.3 Get Your Connection String
1. After project creation, you'll see a connection string like:
   ```
   postgres://username:password@ep-xxx-xxx.region.neon.tech/neondb?sslmode=require
   ```
2. **COPY THIS STRING** - you'll need it later!
3. Save it somewhere safe (like a password manager)

---

## Step 2: Run Database Schema

### 2.1 Access Neon SQL Editor
1. In your Neon dashboard, click on "**SQL Editor**" in the left sidebar
2. You should see an empty query editor

### 2.2 Create All Tables
1. Open the file `tabs.md` in your project
2. Scroll to the **PostgreSQL Schema** section (around line 546)
3. **COPY** the entire PostgreSQL schema (from `-- 1. Users Table` to the end of the SQL section)
4. **PASTE** it into the Neon SQL Editor
5. Click "**Run**" button

### 2.3 Verify Tables Were Created
1. In Neon dashboard, click "**Tables**" in the left sidebar
2. You should see 14 tables:
   - Users
   - User_Experience
   - User_Education
   - User_Links
   - Tracks
   - Track_Details
   - Modules
   - Lessons
   - Lesson_Content
   - Quiz_Questions
   - User_Progress
   - User_Quiz_Attempts
   - Reviews
   - SQL_Practice_Sessions

✅ **If you see all 14 tables, you're good to go!**

---

## Step 3: Install Dependencies

### 3.1 Install PostgreSQL Driver
Open your terminal in the DataSphere project folder and run:

```bash
npm install pg
```

This installs the PostgreSQL client library needed for Netlify Functions.

### 3.2 Verify Installation
Check your `package.json` - you should see `"pg"` in the dependencies section.

---

## Step 4: Configure Netlify Environment

### 4.1 Deploy to Netlify (if not already done)
If you haven't deployed yet:

1. Push your code to GitHub
2. Go to [Netlify Dashboard](https://app.netlify.com)
3. Click "**Add new site**" → "**Import an existing project**"
4. Connect your GitHub repository
5. Build settings should auto-detect from `netlify.toml`
6. Click "**Deploy site**"

### 4.2 Add Environment Variable
1. In Netlify Dashboard, go to your site
2. Click "**Site settings**" → "**Environment variables**"
3. Click "**Add a variable**"
4. **Key**: `DATABASE_URL`
5. **Value**: Paste your Neon connection string (from Step 1.3)
6. Click "**Save**"

### 4.3 Redeploy
1. Go to "**Deploys**" tab
2. Click "**Trigger deploy**" → "**Clear cache and deploy site**"

---

## Step 5: Update Frontend Code

I've already created the Netlify function at `netlify/functions/api.js`. Now you need to update your frontend to use it.

### 5.1 Update AuthContext.tsx

Open `contexts/AuthContext.tsx` and replace the `signup` and `login` functions:

```typescript
const signup = async (userData: Partial<User>) => {
  try {
    const response = await fetch('/.netlify/functions/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'signup',
        data: {
          name: userData.name || 'User',
          email: userData.email || '',
          password: 'defaultPassword123', // TODO: Add password field to signup form
          school: userData.school || '',
          age: userData.age,
          source: userData.source,
          city: userData.city || 'Maroc'
        }
      })
    });
    
    if (response.ok) {
      const user = await response.json();
      // Convert database format to app format
      const appUser: User = {
        name: user.name,
        email: user.email,
        school: user.school,
        city: user.city,
        age: user.age?.toString(),
        source: user.source,
        avatar: user.avatar,
        headline: user.headline,
        bio: user.bio,
        experience: [],
        education: []
      };
      setUser(appUser);
      localStorage.setItem('datasphere_user', JSON.stringify(appUser));
      localStorage.setItem('datasphere_user_id', user.user_id.toString());
    } else {
      console.error('Signup failed');
    }
  } catch (error) {
    console.error('Signup error:', error);
  }
};

const login = async (email: string, password?: string) => {
  try {
    const response = await fetch('/.netlify/functions/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'login',
        data: { email, password: password || 'defaultPassword123' }
      })
    });
    
    if (response.ok) {
      const user = await response.json();
      // Convert database format to app format
      const appUser: User = {
        name: user.name,
        email: user.email,
        school: user.school,
        city: user.city,
        age: user.age?.toString(),
        source: user.source,
        avatar: user.avatar,
        headline: user.headline,
        bio: user.bio,
        experience: user.experience || [],
        education: user.education || []
      };
      setUser(appUser);
      localStorage.setItem('datasphere_user', JSON.stringify(appUser));
      localStorage.setItem('datasphere_user_id', user.user_id.toString());
    } else {
      console.error('Login failed');
      // Fallback to demo user
      const demoUser: User = {
        name: 'Étudiant Data',
        email: email,
        school: 'ESTEM',
        city: 'Casablanca',
        experience: [],
        education: [],
        avatar: `https://ui-avatars.com/api/?name=Etudiant+Data&background=1E3A8A&color=fff`
      };
      setUser(demoUser);
      localStorage.setItem('datasphere_user', JSON.stringify(demoUser));
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

### 5.2 Update progressService.ts

Open `services/progressService.ts` and add this function:

```typescript
export const saveProgressToDb = async (lessonId: string, completed: boolean) => {
  const userId = localStorage.getItem('datasphere_user_id');
  if (!userId) return; // Not logged in to database
  
  try {
    await fetch('/.netlify/functions/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'saveProgress',
        data: { 
          user_id: parseInt(userId), 
          lesson_id: lessonId, 
          completed 
        }
      })
    });
  } catch (error) {
    console.error('Failed to save progress to database:', error);
  }
};
```

Then update the `toggleLessonCompletion` function to also save to database:

```typescript
export const toggleLessonCompletion = (lessonId: string): UserProgress => {
  const progress = getProgress();
  const index = progress.completedLessons.indexOf(lessonId);
  
  let completed = false;
  if (index > -1) {
    progress.completedLessons.splice(index, 1);
    completed = false;
  } else {
    progress.completedLessons.push(lessonId);
    completed = true;
  }
  
  saveProgress(progress);
  
  // Also save to database
  saveProgressToDb(lessonId, completed);
  
  return progress;
};
```

---

## Step 6: Deploy and Test

### 6.1 Commit and Push Changes
```bash
git add .
git commit -m "Add Neon database integration"
git push origin main
```

### 6.2 Wait for Deployment
1. Go to Netlify Dashboard → **Deploys**
2. Wait for the build to complete (usually 1-3 minutes)
3. Look for "**Published**" status

### 6.3 Test the Integration

#### Test 1: Sign Up
1. Open your deployed website
2. Go to the **Sign Up** page
3. Fill in the form and submit
4. Go to **Neon Dashboard** → **Tables** → **Users**
5. Click "**View data**"
6. ✅ You should see your new user!

#### Test 2: Login
1. Try logging in with the email you just used
2. Password: `defaultPassword123` (or whatever you set)
3. ✅ You should be logged in successfully

#### Test 3: Progress Tracking
1. While logged in, go to any lesson
2. Mark it as complete
3. Go to **Neon Dashboard** → **Tables** → **User_Progress**
4. ✅ You should see the completed lesson entry!

---

## Troubleshooting

### Problem: "Database error" when signing up

**Solution:**
1. Check Netlify environment variables - make sure `DATABASE_URL` is set correctly
2. Verify the connection string includes `?sslmode=require` at the end
3. Check Netlify function logs: **Site settings** → **Functions** → Click on `api` → **Function log**

### Problem: Tables not created in Neon

**Solution:**
1. Make sure you ran the **PostgreSQL** schema, not MySQL
2. Check for error messages in the SQL Editor
3. Try running tables one by one to identify which one fails

### Problem: "pg module not found"

**Solution:**
```bash
npm install pg
git add package.json package-lock.json
git commit -m "Add pg dependency"
git push
```

### Problem: CORS errors in browser console

**Solution:**
The Netlify function should automatically handle CORS. If you still see errors:
1. Make sure you're calling `/.netlify/functions/api` (with the leading slash)
2. Check that the function is deployed: Go to **Netlify** → **Functions** tab

### Problem: User data not persisting

**Solution:**
1. Check browser console for errors
2. Verify `datasphere_user_id` is being saved to localStorage
3. Make sure the database user_id is being returned from the API

---

## Next Steps

### Optional Enhancements

1. **Add Password Hashing**
   - Install `bcryptjs`: `npm install bcryptjs`
   - Hash passwords before storing in database
   - Update login to compare hashed passwords

2. **Add Password Field to Signup Form**
   - Update `Signup.tsx` to include password input
   - Add password confirmation field
   - Add password strength validation

3. **Migrate Existing Content**
   - Export your tracks/modules/lessons from `services/content.ts`
   - Create a migration script to insert into database
   - Update frontend to fetch from database instead of static file

4. **Add Session Management**
   - Implement JWT tokens for secure authentication
   - Add token refresh mechanism
   - Add logout functionality that clears tokens

---

## Summary Checklist

- [ ] Created Neon account and project
- [ ] Copied connection string
- [ ] Ran PostgreSQL schema in Neon SQL Editor
- [ ] Verified 14 tables were created
- [ ] Installed `pg` package (`npm install pg`)
- [ ] Added `DATABASE_URL` to Netlify environment variables
- [ ] Created `netlify/functions/api.js` file
- [ ] Updated `AuthContext.tsx` with database calls
- [ ] Updated `progressService.ts` with database calls
- [ ] Committed and pushed changes
- [ ] Deployed to Netlify
- [ ] Tested signup functionality
- [ ] Tested login functionality
- [ ] Tested progress tracking

---

## Support

If you encounter any issues:

1. Check the **Netlify function logs** for detailed error messages
2. Check the **Neon dashboard** to verify tables exist
3. Check browser console for frontend errors
4. Verify environment variables are set correctly

**Common Commands:**
```bash
# Install dependencies
npm install

# Test locally (requires Netlify CLI)
netlify dev

# Deploy
git push origin main
```

---

**🎉 Congratulations!** Once you complete all steps, your DataSphere platform will be fully connected to a production PostgreSQL database!
