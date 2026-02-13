# Supabase Setup Guide

Complete guide to configure Supabase for this authentication template.

---

## 📋 Table of Contents

1. [Project Creation](#1-project-creation)
2. [Environment Variables](#2-environment-variables)
3. [Database Schema](#3-database-schema)
4. [Google OAuth Configuration](#4-google-oauth-configuration)
5. [URL Configuration](#5-url-configuration)
6. [Edge Functions Deployment](#6-edge-functions-deployment)
7. [Testing](#7-testing)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Project Creation

### Create New Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in:
   - **Project Name:** `auth-template-app` (or your preferred name)
   - **Database Password:** Generate a strong password (save it!)
   - **Region:** Choose closest to your users (e.g., `us-east-1`)
4. Click **"Create New Project"**
5. Wait 2-3 minutes for provisioning

### Get Your Credentials

1. After creation, go to **Settings → API**
2. Copy these values:
   - **Project URL:** `https://YOUR_PROJECT_REF.supabase.co`
   - **Anon/Public Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Service Role Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (keep secret!)

---

## 2. Environment Variables

### Local Development (.env)

Create `.env` file in `frontEnd/` folder:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key_here
```

⚠️ **Never commit `.env` to git!** (already in `.gitignore`)

### Production (Vercel)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add the same variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Apply to: **Production**, **Preview**, **Development**
4. Click **"Save"**

**Alternative:** Use Supabase-Vercel integration:

- Vercel Dashboard → Integrations → Supabase → Connect
- Auto-syncs environment variables

---

## 3. Database Schema

### Create Profiles Table

**Option A: Use the SQL file** (Recommended)

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **"New Query"**
3. Copy content from **`/supabase/supabase-schema.sql`** and paste it
4. Click **"Run"** (▶️ button)

**Option B: Manual SQL** (Copy-paste below)

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **"New Query"**
3. Paste the following SQL:

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at timestamp
DROP TRIGGER IF EXISTS on_profile_updated ON public.profiles;
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

- Click **"Run"** (▶️ button)

- Verify in **Table Editor** → `profiles` table exists

**What this does:**

- Creates `profiles` table with user data
- Enables Row Level Security (RLS)
- Auto-creates profile when user signs up
- Auto-updates `updated_at` timestamp on changes

---

## 4. Google OAuth Configuration

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing one
3. Enable **Google+ API**:
   - APIs & Services → Library → Search "Google+ API" → Enable

### Step 2: Create OAuth 2.0 Credentials

1. Go to **APIs & Services → Credentials**
2. Click **"+ CREATE CREDENTIALS"** → OAuth 2.0 Client ID
3. Configure consent screen (if first time):
   - User Type: **External**
   - App name: `Auth Template App`
   - Support email: your email
   - Developer contact: your email
   - Save and continue through all steps
4. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: `Auth Template - Supabase`
   - **Authorized redirect URIs:** (click "+ ADD URI")

     ```txt
     https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
     ```

5. Click **"Create"**
6. Copy:
   - **Client ID:** `123456789-abcdefg.apps.googleusercontent.com`
   - **Client Secret:** `GOCSPX-abc123...`

### Step 3: Configure in Supabase

1. Go to Supabase Dashboard → **Authentication → Providers**
2. Find **Google** provider
3. Enable it (toggle ON)
4. Paste:
   - **Client ID** (from Google Cloud)
   - **Client Secret** (from Google Cloud)
5. Click **"Save"**

---

## 5. URL Configuration

### Redirect URLs

1. Go to Supabase Dashboard → **Authentication → URL Configuration**
2. Set **Site URL:**

   ```txt
   http://localhost:5173
   ```

3. Add **Redirect URLs:**

```txt
 http://localhost:5173/**
 https://your-app.vercel.app/**
```

⚠️ Replace `your-app.vercel.app` with your actual Vercel domain

**Why this matters:**

- Supabase redirects users here after OAuth login
- Without proper URLs, Google login will fail with `redirect_uri_mismatch`

---

## 6. Edge Functions Deployment

Edge Functions handle sensitive operations (e.g., user deletion) that require admin privileges.

### Current Functions

#### `delete-user`

Securely deletes user account + profile data.

**Why Edge Function?**

- Requires `SUPABASE_SERVICE_ROLE_KEY` (admin access)
- Cannot be done client-side (security risk)
- Verifies JWT token before deletion

---

### Installation

#### Option 1: Homebrew (macOS/Linux)

```bash
brew install supabase/tap/supabase
```

#### Option 2: Scoop (Windows)

```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

#### Option 3: npm

```bash
npm install -g supabase
```

---

### Deployment Steps

1. **Login to Supabase:**

   ```bash
   supabase login
   ```

   Opens browser for authentication.

2. **Link to Your Project:**

   ```bash
   cd /path/to/authTemplateApp
   supabase link --project-ref YOUR_PROJECT_REF
   ```

   Replace `YOUR_PROJECT_REF` with your project ID (from dashboard URL).

3. **Deploy Functions:**

   ```bash
   # Deploy all functions
   supabase functions deploy

   # Or deploy specific function
   supabase functions deploy delete-user
   ```

4. **Verify Deployment:**
   - Go to Supabase Dashboard → **Edge Functions**
   - You should see `delete-user` listed
   - Click on it to view logs and test

---

### Edge Function Code

**Location:** `/supabase/functions/delete-user/index.ts`

```typescript
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role (admin privileges)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    // Verify user's JWT token
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token)

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Delete profile first (FK constraint)
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', user.id)

    if (profileError) {
      console.error('Profile deletion error:', profileError)
      return new Response(
        JSON.stringify({ error: 'Failed to delete profile' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Delete user from auth.users
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      user.id
    )

    if (deleteError) {
      console.error('User deletion error:', deleteError)
      return new Response(JSON.stringify({ error: 'Failed to delete user' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({ success: true, message: 'User deleted successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
```

**How it works:**

1. Validates user's JWT token (from `Authorization` header)
2. Deletes profile record (must go first due to FK constraint)
3. Deletes auth.users record (using Service Role Key)
4. Returns success/error response

---

## 7. Testing

### Test Database Connection

```bash
curl https://YOUR_PROJECT_REF.supabase.co/rest/v1/profiles \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Expected response:**

```json
[]
```

(Empty array if no profiles yet)

### Test Edge Function

1. **Login to your app** `(http://localhost:5173)`
2. **Open browser DevTools** → Console
3. Get your JWT token:

   ```javascript
   localStorage.getItem('sb-YOUR_PROJECT_REF-auth-token')
   ```

4. **Test with curl:**

   ```bash
   curl -i --location --request POST \
     'https://YOUR_PROJECT_REF.supabase.co/functions/v1/delete-user' \
     --header 'Authorization: Bearer YOUR_JWT_TOKEN' \
     --header 'Content-Type: application/json'
   ```

**Expected response:**

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## 8. Troubleshooting

### ❌ "No authorization header"

**Cause:** Missing `Authorization: Bearer <token>` header  
**Fix:** Pass JWT token from `localStorage` (user must be logged in)

### ❌ "Invalid token"

**Cause:** Expired or malformed JWT  
**Fix:** Login again to get fresh token

### ❌ CORS errors in production

**Cause:** Vercel environment variables point to wrong Supabase project  
**Fix:** Update `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel Dashboard

### ❌ "Failed to delete profile"

**Cause:** Profile doesn't exist or RLS policy blocking  
**Fix:** Check RLS policies allow deletion (or disable RLS temporarily for testing)

### ❌ Google OAuth "redirect_uri_mismatch"

**Cause:** Redirect URL not authorized in Google Cloud Console  
**Fix:** Add `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback` to Google OAuth Client

### ❌ "Function not found"

**Cause:** Edge function not deployed  
**Fix:** Run `supabase functions deploy delete-user`

### ❌ Supabase project auto-paused (free tier)

**Cause:** No activity for 7+ days (or 17+ hours in some cases)  
**Fix:** Upgrade to paid plan or keep project active with periodic requests

---

## 📚 Related Files

- **Database Schema:** `/supabase/supabase-schema.sql`
- **Edge Function:** `/supabase/functions/delete-user/index.ts`
- **Supabase Client:** `./db.ts`
- **Supabase Config:** `./config.ts`
- **Profile Service:** `./profileService.ts`

---

## 🔗 Useful Links

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Supabase Docs](https://supabase.com/docs)
- [Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Vercel Dashboard](https://vercel.com/dashboard)

---

## ✅ Setup Checklist

Before deploying to production:

- [ ] Supabase project created
- [ ] `.env` file configured with credentials
- [ ] Database schema executed (profiles table)
- [ ] Google OAuth configured (Client ID + Secret)
- [ ] Redirect URLs configured (localhost + Vercel domain)
- [ ] Edge function deployed (`delete-user`)
- [ ] Vercel environment variables updated
- [ ] tested locally (login, signup, delete account)
- [ ] CSP headers configured in `vercel.json`
- [ ] Production tested (no CORS errors)

---

**Last Updated:** 2026-02-12  
**Project:** react-supabase-auth-starter  
**Supabase Version:** 2.76+
