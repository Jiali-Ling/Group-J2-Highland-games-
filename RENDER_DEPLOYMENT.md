# Highland Games - Render Deployment Guide

## Prerequisites
1. GitHub account with repository
2. Render account (free tier available)
3. Project code pushed to GitHub

---

## Step 1: Prepare Project for Deployment

### 1.1 Create `.env.example`
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
SESSION_SECRET="your-super-secret-key-change-in-production"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
NODE_ENV="production"
```

### 1.2 Update `package.json`
Add/verify these scripts:
```json
{
  "scripts": {
    "build": "remix build",
    "start": "remix-serve ./build/index.js",
    "postinstall": "prisma generate"
  }
}
```

### 1.3 Create `render.yaml` (optional)
```yaml
services:
  - type: web
    name: highland-games
    env: node
    region: frankfurt
    plan: free
    buildCommand: npm install && npx prisma generate && npx prisma migrate deploy && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: 18
      - key: NODE_ENV
        value: production
      - key: SESSION_SECRET
        generateValue: true
      - key: ADMIN_EMAIL
        sync: false
      - key: ADMIN_PASSWORD
        sync: false
      - key: DATABASE_URL
        fromDatabase:
          name: highland-games-db
          property: connectionString

databases:
  - name: highland-games-db
    databaseName: highland_games
    user: highland_user
    plan: free
```

---

## Step 2: Create PostgreSQL Database on Render

### 2.1 Go to Render Dashboard
1. Navigate to https://dashboard.render.com
2. Click "New +" → "PostgreSQL"

### 2.2 Configure Database
- **Name**: `highland-games-db`
- **Database**: `highland_games`
- **User**: `highland_user`
- **Region**: Frankfurt (or closest to you)
- **Plan**: Free

### 2.3 Save Connection String
After creation, copy the **Internal Database URL**:
```
postgresql://highland_user:xxxxx@dpg-xxxxx/highland_games
```

---

## Step 3: Deploy Web Service

### 3.1 Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select the highland-games repository

### 3.2 Configure Service
- **Name**: `highland-games`
- **Region**: Frankfurt
- **Branch**: `main`
- **Root Directory**: (leave empty)
- **Runtime**: Node
- **Build Command**: 
  ```bash
  npm install && npx prisma generate && npx prisma migrate deploy && npm run build
  ```
- **Start Command**: 
  ```bash
  npm start
  ```

### 3.3 Advanced Settings
- **Auto-Deploy**: Yes
- **Health Check Path**: `/`
- **Node Version**: 18

---

## Step 4: Environment Variables

Add these environment variables in Render dashboard:

| Key | Value | Notes |
|-----|-------|-------|
| `DATABASE_URL` | `postgresql://...` | From Step 2.3 |
| `SESSION_SECRET` | `[Generate Random]` | Click "Generate" |
| `ADMIN_EMAIL` | `admin@example.com` | Your admin email |
| `ADMIN_PASSWORD` | `your-secure-password` | Your admin password |
| `NODE_ENV` | `production` | Production mode |

### Generate Strong SESSION_SECRET
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Step 5: Database Migration

### 5.1 Manual Migration (First Time)
After deployment, open Shell in Render:

```bash
npx prisma migrate deploy
npx prisma db seed
```

### 5.2 Automatic Migration
The build command includes `prisma migrate deploy`, so future deployments will auto-migrate.

---

## Step 6: Update Prisma Schema for PostgreSQL

Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Rest of schema remains the same...
```

### Changes needed:
- Change `provider` from `"sqlite"` to `"postgresql"`
- No other changes required (Prisma handles differences)

---

## Step 7: Domain & SSL

### 7.1 Custom Domain (Optional)
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed
4. SSL certificate is automatic

### 7.2 Free Render Domain
Your app will be available at:
```
https://highland-games.onrender.com
```

---

## Step 8: Monitoring & Logs

### 8.1 View Logs
- Dashboard → Your Service → Logs
- Real-time log streaming
- Download logs for analysis

### 8.2 Metrics
- Dashboard → Your Service → Metrics
- CPU/Memory usage
- Request count
- Response times

### 8.3 Health Checks
Render automatically pings your app every 5 minutes on free tier.

---

## Step 9: Testing Deployment

### 9.1 Test Endpoints
```bash
# Health check
curl https://highland-games.onrender.com/

# Get events
curl https://highland-games.onrender.com/events

# Test login page
curl https://highland-games.onrender.com/auth
```

### 9.2 Test User Flow
1. Visit your deployed URL
2. Register account
3. Complete profile
4. Create team
5. Register for event
6. Test admin approval

---

## Common Issues & Solutions

### Issue 1: Build Fails
**Cause**: Missing dependencies or Prisma client
**Solution**: 
```bash
# Ensure build command includes:
npm install && npx prisma generate && npm run build
```

### Issue 2: Database Connection Error
**Cause**: Wrong DATABASE_URL
**Solution**: 
- Use **Internal Database URL** from Render PostgreSQL
- Format: `postgresql://user:pass@host/db`

### Issue 3: Migration Fails
**Cause**: Schema incompatibility
**Solution**:
```bash
# In Render Shell
npx prisma migrate reset --force
npx prisma db seed
```

### Issue 4: Session Issues
**Cause**: Missing or weak SESSION_SECRET
**Solution**: Generate strong secret (32+ characters)

### Issue 5: App Crashes After Deploy
**Cause**: Missing environment variables
**Solution**: Check all required env vars are set

---

## Cost Breakdown

### Free Tier Limits
- **Web Service**: 750 hours/month (one free instance)
- **PostgreSQL**: 90 days, then $7/month
- **Bandwidth**: 100GB/month
- **Build Minutes**: 500 minutes/month

### Paid Options
| Service | Free | Starter | Standard |
|---------|------|---------|----------|
| Web Service | $0 | $7/mo | $25/mo |
| PostgreSQL | 90 days | $7/mo | $20/mo |
| RAM | 512MB | 512MB | 2GB |
| CPU | Shared | Shared | Dedicated |

**Estimated Monthly Cost** (after free trial):
- Development: $0 (within free tier limits)
- Production (small): $14/month (web + db)
- Production (medium): $45/month (standard tier)

---

## Scaling Strategy

### 1. Vertical Scaling
Upgrade instance size:
- Starter: 512MB RAM
- Standard: 2GB RAM
- Pro: 4GB+ RAM

### 2. Horizontal Scaling
Add more instances (requires paid plan):
- Load balancing automatic
- Session sharing via database

### 3. Database Scaling
- Connection pooling (Prisma built-in)
- Read replicas (paid feature)
- Increase storage/CPU

### 4. CDN Integration
Use Cloudflare for static assets:
- Free SSL
- Global CDN
- DDoS protection

---

## CI/CD Pipeline

### Automatic Deployment
Every push to `main` branch triggers:
1. Git pull
2. Build (`npm install && npm run build`)
3. Prisma migration (`prisma migrate deploy`)
4. Service restart
5. Health check

### Manual Deployment
1. Dashboard → Service → Manual Deploy
2. Or: Push to GitHub

---

## Backup & Recovery

### Database Backups
Render PostgreSQL (paid plans):
- Automatic daily backups
- Point-in-time recovery
- Backup retention: 7 days

### Manual Backup
```bash
# Export data
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

---

## Security Checklist

- ✅ HTTPS enabled (automatic)
- ✅ Environment variables secured
- ✅ Strong SESSION_SECRET
- ✅ Database credentials encrypted
- ✅ CORS configured properly
- ✅ Rate limiting (add middleware)
- ✅ Input validation
- ✅ SQL injection prevention (Prisma)

---

## Post-Deployment Tasks

1. **Test all features**
   - User registration
   - Login/logout
   - Event registration
   - Admin approval
   - GDPR requests

2. **Configure monitoring**
   - Set up error tracking (Sentry)
   - Configure uptime monitoring
   - Set up alerts

3. **Documentation**
   - Update README with live URL
   - Document API endpoints
   - Create user guide

4. **Analytics** (optional)
   - Google Analytics
   - Plausible (GDPR-friendly)
   - Custom logging

---

## Support & Resources

- **Render Docs**: https://render.com/docs
- **Remix Docs**: https://remix.run/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Community**: Render Discord, Remix Discord

---

## Deployment Checklist

Before going live:

- [ ] Code pushed to GitHub
- [ ] PostgreSQL database created
- [ ] Environment variables set
- [ ] Database migrated
- [ ] Seed data loaded
- [ ] SSL certificate active
- [ ] Custom domain configured (optional)
- [ ] All features tested
- [ ] Error monitoring setup
- [ ] Backups configured
- [ ] Admin account secured
- [ ] Privacy policy updated
- [ ] Terms of service added

---

## Quick Deploy Commands

```bash
# 1. Update schema for PostgreSQL
# Edit prisma/schema.prisma: provider = "postgresql"

# 2. Commit changes
git add .
git commit -m "Configure for Render deployment"
git push origin main

# 3. In Render Shell (after first deploy)
npx prisma migrate deploy
npx prisma db seed

# 4. Test
curl https://highland-games.onrender.com/
```

---

## Migration from SQLite to PostgreSQL

If you have existing SQLite data:

```bash
# 1. Export SQLite data
sqlite3 prisma/dev.db .dump > dump.sql

# 2. Convert to PostgreSQL format
# (Manual conversion needed for syntax differences)

# 3. Import to PostgreSQL
psql $DATABASE_URL < converted.sql
```

Or use Prisma migrations for clean start:
```bash
npx prisma migrate reset --force
npx prisma db seed
```

---

## Success!

Your Highland Games application is now live on Render! 🎉

Access it at: `https://highland-games.onrender.com`

Admin Login: `admin@example.com` / `[your-password]`
