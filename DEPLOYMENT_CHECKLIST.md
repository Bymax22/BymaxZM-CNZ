# CNZ Deployment Checklist — Vercel + Supabase

## Pre-Deployment

### Backend Infrastructure
- [ ] Supabase project created and running
- [ ] Database schema applied (`init.sql` executed in Supabase SQL Editor)
- [ ] All tables visible in Supabase Table Editor (30+ tables, 9 enums)
- [ ] RLS disabled on auth schema tables (or custom policies configured)
- [ ] Database user created with appropriate permissions
- [ ] Supabase pooling connection string copied (port 6543, `sslmode=require`)

### Frontend & Codebase
- [ ] All TypeScript errors resolved (no implicit `any`)
- [ ] Service worker (`public/sw.js`) created and tested locally
- [ ] Offline fallback page (`public/offline.html`) in place
- [ ] API routes created in `apps/web/app/api/auth/` and `apps/web/app/api/projects/`
- [ ] Prisma singleton client created (`lib/prisma.ts`)
- [ ] All components have proper TypeScript interfaces
- [ ] `.env.local` created for local development (not committed)
- [ ] All tests passing (run `turbo run test`)
- [ ] Code committed and pushed to `origin/main`

### Vercel Setup
- [ ] Vercel account created
- [ ] CNZ repository connected to Vercel project
- [ ] Project settings reviewed (region, framework detection correct)

---

## Environment Variables in Vercel

### 1. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:

| Variable | Value | Environments |
|----------|-------|--------------|
| `DATABASE_URL` | Supabase pooling connection string | All |
| `NEXTAUTH_URL` | `https://yourdomain.vercel.app` | All |
| `NEXTAUTH_SECRET` | Generated random secret | All |
| `NEXTAUTH_CALLBACK_URL` | `https://yourdomain.vercel.app/api/auth/callback/credentials` | All (optional) |
| `NODE_ENV` | `production` | Production |
| `LOG_LEVEL` | `info` | All |

### 2. Verification
- [ ] All environment variables visible in Vercel dashboard
- [ ] No typos in variable names (NextAuth is case-sensitive)
- [ ] Secret values properly hidden (masked in UI)

---

## Deployment

### 1. First Deployment
- [ ] Push final changes to `origin/main`
- [ ] Vercel automatically detects and builds
- [ ] Monitor build logs for errors
  - Look for Prisma schema validation errors
  - Check for missing dependencies
  - Verify TypeScript compilation succeeds

### 2. Deployment Verification
```bash
# Check deployment status
vercel status

# View live logs
vercel logs --follow

# Test production endpoints
curl https://yourdomain.vercel.app/api/projects
```

- [ ] Build completes successfully (no errors)
- [ ] Deployment shows "Ready" status
- [ ] No errors in production logs

---

## Post-Deployment Testing

### 1. Test API Endpoints (Public)
```bash
# Get projects (should return paginated list)
curl https://yourdomain.vercel.app/api/projects

# Get projects with pagination
curl "https://yourdomain.vercel.app/api/projects?page=1&limit=5"
```
- [ ] Returns HTTP 200 with projects data
- [ ] Pagination parameters work correctly
- [ ] No database connection errors in logs

### 2. Test Authentication Flow
**Step A: Register**
```bash
curl -X POST https://yourdomain.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"testuser@example.com",
    "password":"TestPass123!",
    "firstName":"Test",
    "lastName":"User"
  }'
```
- [ ] Returns HTTP 200 with user data (no password in response)
- [ ] User created in Supabase (verify in Table Editor)

**Step B: Login**
```bash
curl -X POST https://yourdomain.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"testuser@example.com",
    "password":"TestPass123!"
  }'
```
- [ ] Returns HTTP 200 with token/session
- [ ] `lastLogin` timestamp updated in Supabase

**Step C: Login Failure (Wrong Password)**
```bash
curl -X POST https://yourdomain.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"testuser@example.com",
    "password":"WrongPassword"
  }'
```
- [ ] Returns HTTP 401 (Unauthorized)
- [ ] No password information leaked in error message

### 3. Test Frontend
- [ ] Navigate to `https://yourdomain.vercel.app`
- [ ] Hero section displays correctly
- [ ] Navigation menu functional
- [ ] Click "Get Involved" → verify form loads
- [ ] Click "Projects" → verify projects list loads
- [ ] Go to `/register` → create test account
- [ ] Go to `/login` → log in with test account
- [ ] After login, verify session cookie present
- [ ] All pages render without TypeScript errors

### 4. Test Service Worker (Production)
- [ ] Visit `https://yourdomain.vercel.app`
- [ ] Open DevTools → Application → Service Workers
- [ ] Verify service worker registered (status = "activated and running")
- [ ] Go offline (DevTools → Network → Offline)
- [ ] Refresh page → should see offline fallback
- [ ] Core app assets should be cached (visible in Cache Storage)

### 5. Test Database Queries
- [ ] Check Supabase Dashboard → Logs for query activity
- [ ] Verify queries are executing correctly (no permission errors)
- [ ] Monitor query performance (should be < 100ms for simple queries)

---

## Monitoring & Maintenance

### Daily
- [ ] Check Vercel Dashboard for deployment status
- [ ] Review error logs for uncaught exceptions
- [ ] Monitor Supabase for slow queries or connection issues

### Weekly
- [ ] Review Vercel Analytics for performance metrics
- [ ] Check Supabase metrics (query count, connection count)
- [ ] Scan logs for warnings

### Monthly
- [ ] Review and optimize database queries
- [ ] Update dependencies (security patches)
- [ ] Analyze user registration/login patterns
- [ ] Back up Supabase database (if manual backups enabled)

---

## Troubleshooting During Deployment

### Build Fails: "Prisma validation error"
**Solution:**
- Verify `apps/server/prisma/schema.prisma` uses v6 format (`url = env("DATABASE_URL")`)
- Run `npx prisma generate` locally to verify schema is valid

### Build Fails: "Cannot find module @/lib/prisma"
**Solution:**
- Verify `apps/web/lib/prisma.ts` exists
- Check `apps/web/tsconfig.json` has `"@": "."` path mapping

### Deployment Succeeds but API returns 500
**Solution:**
- Check logs: `vercel logs --follow`
- Verify `DATABASE_URL` is correct and pooling URL (port 6543)
- Verify all tables exist in Supabase
- Test locally with same DATABASE_URL

### Service Worker Not Registering
**Solution:**
- Verify `public/sw.js` exists (check Vercel build output)
- Check browser console for registration errors
- Service worker only works over HTTPS (Vercel provides HTTPS by default)

### Login Returns 401 Even with Correct Password
**Solution:**
- Verify `nextauth` or `auth` table exists in Supabase
- Check user record exists with hashed password
- Verify bcryptjs is installed in `apps/web/package.json`

---

## Rollback Procedure

If deployment has critical issues:

### Option 1: Rollback to Previous Deployment
1. Go to Vercel Dashboard → Deployments
2. Find the previous stable deployment
3. Click "..." → "Promote to Production"
4. Verify previous version is now live

### Option 2: Manual Rollback
1. Revert last commit: `git revert HEAD`
2. Push to `origin/main`
3. Vercel automatically redeploys with previous code

---

## Scaling Considerations

### Database Scaling (Supabase)
- Monitor connection count in Supabase → Logs
- If > 80% of max connections, upgrade plan
- Consider enabling pgBouncer connection pooling

### Serverless Function Scaling (Vercel)
- Vercel auto-scales serverless functions
- Monitor function execution time in Vercel Analytics
- If consistently > 5 seconds, optimize queries or move to async job

### CDN/Static Asset Caching (Vercel)
- Vercel automatically serves static assets via CDN
- Set cache headers in `next.config.js` for optimal caching

---

## Post-Launch Tasks

- [ ] Set up monitoring alerts (Vercel Alerts, PagerDuty, etc.)
- [ ] Configure custom domain (if not already done)
- [ ] Enable SSL/TLS (Vercel provides free SSL)
- [ ] Set up analytics (Google Analytics, Vercel Analytics)
- [ ] Create runbook for common issues
- [ ] Document backup/restore procedures
- [ ] Schedule regular security audits

---

## Quick Reference: Key Endpoints

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/auth/register` | POST | No | Create new user account |
| `/api/auth/login` | POST | No | User login |
| `/api/projects` | GET | No | Fetch all public projects |
| `/api/projects` | POST | Yes | Create new project |

---

## Contact & Support

- **Vercel Status:** https://www.vercelstatus.com/
- **Supabase Status:** https://status.supabase.com/
- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **NextAuth Docs:** https://next-auth.js.org/

