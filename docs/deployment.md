# Deployment Guide

## Render Deployment

### Step 1: Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "PostgreSQL"
3. Configure:
   - Name: `highland-games-db`
   - Database: `highland_games`
   - User: Auto-generated
   - Region: Choose closest to your users
4. Copy the **Internal Database URL** (for use in step 2)

### Step 2: Deploy Web Service

1. In Render Dashboard, click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** `highland-games`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free or Starter

### Step 3: Set Environment Variables

In the Render dashboard, add these environment variables:

- `NODE_ENV` = `production`
- `DATABASE_URL` = `[Your PostgreSQL connection string from Step 1]`
- `SESSION_SECRET` = `[Generate a random string, e.g., openssl rand -base64 32]`
- `ADMIN_EMAIL` = `demo+admin@example.com`
- `ADMIN_PASSWORD` = `DemoPassword123!`

### Step 4: Run Database Migrations

After first deployment, run migrations:

1. Go to your web service in Render
2. Open the Shell/Console
3. Run: `npx prisma migrate deploy`
4. Run: `npm run seed` (optional, to populate demo data)

### Step 5: Update README

Once deployed, update the Live Demo URL in README.md:

```markdown
**Live Demo:** https://your-app-name.onrender.com
```

## Railway Deployment

### Step 1: Create PostgreSQL Database

1. Go to [Railway Dashboard](https://railway.app)
2. Click "New Project"
3. Click "New" → "Database" → "Add PostgreSQL"
4. Copy the connection string from the database service

### Step 2: Deploy Application

1. In Railway, click "New" → "GitHub Repo"
2. Select your repository
3. Railway will auto-detect the `railway.json` configuration

### Step 3: Set Environment Variables

In Railway dashboard, add these variables:

- `DATABASE_URL` = `[Your PostgreSQL connection string]`
- `SESSION_SECRET` = `[Generate a random string]`
- `NODE_ENV` = `production`
- `ADMIN_EMAIL` = `demo+admin@example.com`
- `ADMIN_PASSWORD` = `DemoPassword123!`

### Step 4: Run Database Migrations

1. Open Railway CLI or use the web terminal
2. Run: `npx prisma migrate deploy`
3. Run: `npm run seed` (optional)

### Step 5: Generate Domain

1. In Railway, go to your service settings
2. Click "Generate Domain" to get a public URL
3. Update README with the Railway URL

## Post-Deployment Checklist

- [ ] Database migrations completed successfully
- [ ] Environment variables set correctly
- [ ] Application starts without errors
- [ ] Can access homepage
- [ ] Can register new user
- [ ] Can login with demo accounts
- [ ] Admin panel accessible
- [ ] GDPR privacy page works
- [ ] Update Live Demo URL in README

## Troubleshooting

**Database Connection Errors:**
- Verify `DATABASE_URL` is correct
- Check database is running and accessible
- Ensure connection string includes SSL parameters if required

**Build Failures:**
- Check Node.js version (requires 18+)
- Verify all dependencies in package.json
- Check build logs for specific errors

**Application Crashes:**
- Check application logs in dashboard
- Verify all environment variables are set
- Ensure SESSION_SECRET is set

