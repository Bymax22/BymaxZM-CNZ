# Vercel Deployment Environment Setup

This guide covers all environment variables required to deploy CNZ to Vercel with Supabase PostgreSQL backend.

## Prerequisites

- Vercel account with CNZ repository connected
- Supabase project created with database deployed
- Supabase connection string copied (with URL-encoded password and `sslmode=require`)

## Environment Variables Required

### 1. **DATABASE_URL** (Critical)
Connection string to Supabase PostgreSQL database.

**Value Format:**
```
postgresql://postgres:[URL_ENCODED_PASSWORD]@[PROJECT_ID].pooling.supabase.co:6543/postgres?sslmode=require&schema=public
```

**How to Get It:**
1. Go to Supabase Dashboard → Project Settings → Database
2. Copy the **Pooling Connection String** (not the direct connection)
3. Replace `[YOUR-PASSWORD]` with your actual database password (URL-encode it)
4. Example:
   ```
   postgresql://postgres:myPass%40word123@abc12345.pooling.supabase.co:6543/postgres?sslmode=require&schema=public
   ```

**Important Notes:**
- Use **pooling URL** (port 6543), NOT the direct connection (port 5432)
- URL-encode special characters in password (e.g., `@` → `%40`, `#` → `%23`)
- Include `sslmode=require` and `schema=public` parameters
- This is a secret — store securely in Vercel dashboard

---

### 2. **NEXTAUTH_URL**
Public URL of your deployed application.

**Value Format:**
```
https://yourdomain.vercel.app
```

**How to Get It:**
1. Deploy to Vercel once (even without this set)
2. Copy the preview URL from Vercel dashboard
3. Use your custom domain if configured

**Example:**
```
https://cnz.vercel.app
```

---

### 3. **NEXTAUTH_SECRET**
Random secret key for NextAuth session encryption.

**How to Generate:**
Run this command locally:
```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/

**Example:**
```
iJk8mN2pQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWx=
```

**Important Notes:**
- This must be cryptographically secure
- Keep it secret — never commit to git
- Same value across all environments (dev, preview, production)

---

### 4. **NEXTAUTH_CALLBACK_URL** (Optional, but Recommended)
Explicit callback URL after authentication.

**Value Format:**
```
https://yourdomain.vercel.app/api/auth/callback/credentials
```

**Usage:**
- Set this if NextAuth callbacks are not working correctly
- Helps with OAuth redirect flows

---

### 5. **NODE_ENV**
Environment mode.

**Recommended Value:**
```
production
```

**Note:**
Vercel automatically sets this to `production` for production deployments and `development` for preview deployments.

---

### 6. **LOG_LEVEL** (Optional)
Logging detail level.

**Recommended Value:**
```
info
```

**Options:**
- `debug` — verbose logging (development)
- `info` — standard logging (production)
- `warn` — warnings only
- `error` — errors only

---

## Step-by-Step Setup in Vercel Dashboard

### 1. Navigate to Environment Variables
1. Go to https://vercel.com/dashboard
2. Select your CNZ project
3. Click **Settings** → **Environment Variables**

### 2. Add Each Variable

#### Add DATABASE_URL
1. **Name:** `DATABASE_URL`
2. **Value:** (your Supabase pooling connection string)
3. **Environments:** Select all (Production, Preview, Development)
4. Click **Add**

#### Add NEXTAUTH_URL
1. **Name:** `NEXTAUTH_URL`
2. **Value:** `https://yourdomain.vercel.app`
3. **Environments:** Select all
4. Click **Add**

#### Add NEXTAUTH_SECRET
1. **Name:** `NEXTAUTH_SECRET`
2. **Value:** (your generated secret)
3. **Environments:** Select **Production** only (or all if using same secret everywhere)
4. Click **Add**

#### Add NEXTAUTH_CALLBACK_URL (Optional)
1. **Name:** `NEXTAUTH_CALLBACK_URL`
2. **Value:** `https://yourdomain.vercel.app/api/auth/callback/credentials`
3. **Environments:** Select all
4. Click **Add**

#### Add NODE_ENV
1. **Name:** `NODE_ENV`
2. **Value:** `production`
3. **Environments:** Select **Production**
4. Click **Add**

#### Add LOG_LEVEL
1. **Name:** `LOG_LEVEL`
2. **Value:** `info`
3. **Environments:** Select all
4. Click **Add**

### 3. Verify and Deploy
1. After adding all variables, click **Redeploy** on the latest deployment
2. Vercel will rebuild and restart the application with the new environment variables
3. Monitor deployment logs for errors

---

## Local Development Setup

Create a `.env.local` file in `apps/web/`:

```bash
# .env.local (local development only)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/cnz_dev"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-local-secret-key-here"
NEXTAUTH_CALLBACK_URL="http://localhost:3000/api/auth/callback/credentials"
NODE_ENV="development"
LOG_LEVEL="debug"
```

**Note:** Never commit `.env.local` to git (it's in `.gitignore`).

---

## Testing Environment Variables

### 1. Test Database Connection
After deploying, check logs:
```bash
vercel logs
```

Look for messages confirming Prisma client initialization (no connection errors).

### 2. Test Authentication
1. Navigate to your deployed app: `https://yourdomain.vercel.app`
2. Go to `/register` and create a test account
3. Check that the user is saved to Supabase (verify in Supabase Dashboard → Table Editor)
4. Go to `/login` and log in with the test account
5. Verify session is established (check NextAuth session cookie)

### 3. Test API Routes
```bash
# Test projects route (public, no auth required)
curl https://yourdomain.vercel.app/api/projects

# Test login (POST)
curl -X POST https://yourdomain.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"yourpassword"}'
```

---

## Troubleshooting

### Issue: "NEXTAUTH_SECRET is not configured"
**Solution:** Add `NEXTAUTH_SECRET` to Vercel environment variables (see Step 2 above).

### Issue: "Can't reach database" or Connection Timeout
**Possible Causes:**
1. Wrong DATABASE_URL format
2. Password not URL-encoded
3. Supabase project not running

**Solutions:**
1. Double-check Supabase pooling URL format
2. URL-encode special characters: `@` → `%40`, `#` → `%23`, `&` → `%26`
3. Verify Supabase project status in dashboard (green dot = running)
4. Test connection locally first using the same DATABASE_URL

### Issue: Login Endpoint Returns 500 Error
**Check Logs:**
```bash
vercel logs --follow
```

Look for database query errors or Prisma errors.

**Common Causes:**
1. Prisma schema mismatch (tables don't exist in Supabase)
2. Missing environment variable
3. Database user permissions (RLS enabled incorrectly)

**Solution:**
- Verify all tables exist in Supabase (Table Editor)
- Verify RLS is disabled for `auth` schema tables
- Re-apply `init.sql` if needed

### Issue: CORS Errors When Calling API Routes
**Solution:** If calling from different domain, API routes should handle CORS in route handler:
```typescript
export async function GET(request: NextRequest) {
  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

---

## Next Steps After Deployment

1. **Enable Supabase RLS (Optional but Recommended)**
   - If you want per-user data isolation, enable Row Level Security in Supabase
   - Create policies to restrict access to authenticated users' own data

2. **Set Up Custom Domain (Optional)**
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain (e.g., `cnz.example.com`)
   - Update `NEXTAUTH_URL` to use custom domain

3. **Monitor Performance**
   - Vercel Analytics: Monitor API response times
   - Supabase Metrics: Monitor database query performance
   - Set up alerts for errors and slowdowns

4. **Scale as Needed**
   - Supabase: Upgrade plan if needed for higher database load
   - Vercel: Serverless function concurrency auto-scales; no action needed

---

## Reference: Environment Variables Checklist

- [ ] `DATABASE_URL` — Supabase pooling connection string
- [ ] `NEXTAUTH_URL` — Your Vercel app URL
- [ ] `NEXTAUTH_SECRET` — Generated random secret
- [ ] `NEXTAUTH_CALLBACK_URL` — (Optional) Explicit callback URL
- [ ] `NODE_ENV` — Set to `production` for production
- [ ] `LOG_LEVEL` — Set to `info` for production

---

## Additional Resources

- [NextAuth.js Configuration](https://next-auth.js.org/configuration/options)
- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase Connection Strings](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)

