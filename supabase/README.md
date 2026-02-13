# Supabase Backend Configuration

This folder contains all Supabase-related backend configuration.

## 📂 Contents

### `supabase-schema.sql`

Complete database schema for the profiles table. Execute this in your Supabase SQL Editor to set up:

- Profiles table structure
- Row Level Security (RLS) policies
- Auto-creation triggers for new users
- Updated_at timestamp triggers

**Usage:**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor
2. Copy content from `supabase-schema.sql`
3. Paste and run

### `functions/delete-user/`

Edge Function for secure user account deletion.

**Why Edge Function?**

- Requires `SUPABASE_SERVICE_ROLE_KEY` (admin access)
- Cannot be done from client-side (security risk)
- Must verify JWT token before deletion

---

## Setup Instructions

### 1. Install Supabase CLI

```bash
# macOS/Linux
brew install supabase/tap/supabase

# Windows (PowerShell)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Or via npm
npm install -g supabase
```

### 2. Login to Supabase

```bash
supabase login
```

This will open a browser for authentication.

### 3. Link to Your New Project

```bash
# From project root
cd /path/to/authTemplateApp

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF
```

**Note:** Replace `YOUR_PROJECT_REF` with your actual project ID from the Supabase dashboard URL.

### 4. Deploy Edge Functions

```bash
# Deploy all functions
supabase functions deploy

# Or deploy specific function
supabase functions deploy delete-user
```

### 5. Verify Deployment

1. Go to your Supabase Dashboard
2. Click "Edge Functions" in the sidebar
3. You should see `delete-user` listed
4. Click on it to see logs and test

---

## Testing the Function

### From Dashboard (Recommended)

1. Go to Edge Functions → `delete-user`
2. Click "Invoke Function"
3. Add headers:

   ```json
   {
     "Authorization": "Bearer YOUR_USER_JWT_TOKEN"
   }
   ```

4. Click "Send Request"

### From Terminal

```bash
# Get your JWT token first (login to your app and check browser localStorage)
curl -i --location --request POST \
  'https://YOUR_PROJECT_REF.supabase.co/functions/v1/delete-user' \
  --header 'Authorization: Bearer YOUR_JWT_TOKEN' \
  --header 'Content-Type: application/json'
```

---

## Environment Variables

The function uses these environment variables (automatically available in Edge Functions):

- `SUPABASE_URL` - Your project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Admin key (automatically injected)

**⚠️ NEVER expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code!**

---

## Troubleshooting

**Error: "supabase: command not found"**

- Install Supabase CLI (see step 1)

**Error: "Project not linked"**

- Run `supabase link --project-ref YOUR_PROJECT_ID`

**Error: "Failed to deploy"**

- Check your internet connection
- Verify you're logged in: `supabase projects list`

**Function returns 401 "Invalid token"**

- User JWT token expired (login again)
- Wrong token (check Authorization header)

---

## Project Structure

```txt
supabase/
└── functions/
    └── delete-user/
        └── index.ts          # Main function code
```

---

## Next Steps After Deployment

1. Test the function from Supabase Dashboard
2. Test "Delete Account" button in your app (localhost:5173)
3. Commit the `supabase/` folder to Git
4. Your function is now live! 🎉

---

## Additional Functions (Future)

You can add more Edge Functions for:

- Email notifications
- Payment processing (Stripe webhooks)
- Image processing
- Data exports
- Admin operations

Create new functions with:

```bash
supabase functions new your-function-name
```
