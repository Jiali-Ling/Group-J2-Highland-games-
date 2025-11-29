
Deployment Guide

Render Deployment

Step 1: Create PostgreSQL Database

Go to Render Dashboard (https://dashboard.render.com)
Click New + → PostgreSQL
Configure:
Name: highland-games-db
Database: highland_games
User: Auto-generated
Region: Choose closest to your users
Copy the Internal Database URL (for use in step 2)

Step 2: Deploy Web Service

In Render Dashboard, click New + → Web Service
Connect your GitHub repository
Configure:
Name: highland-games
Environment: Node
Build Command: npm install && npx prisma generate && npm run build
Start Command: npm start
Plan: Free or Starter

Step 3: Set Environment Variables

在 Render dashboard 添加这些环境变量：
NODE_ENV = production
DATABASE_URL = [Your PostgreSQL connection string from Step 1]
SESSION_SECRET = [Generate a random string, e.g., openssl rand -base64 32]
ADMIN_EMAIL = admin@example.com
ADMIN_PASSWORD = admin123

Step 4: Run Database Migrations

After the first deployment, run database migration:
Go to your web service in Render
Open the Shell/Console
Run: npx prisma migrate deploy
Run: npm run seed (optional, populate demo data)

Step 5: Update README

After deployment, fill in the Live Demo URL at the top of README.md.

Railway Deployment

Step 1: Create PostgreSQL Database

Go to Railway Dashboard (https://railway.app)
Click New Project
Click New → Database → Add PostgreSQL
Copy the connection string from the database service

Step 2: Deploy Application

In Railway, click New → GitHub Repo
Select your repository
Railway will automatically detect the railway.json configuration

Step 3: Set Environment Variables

Add these variables in Railway dashboard:
DATABASE_URL = [Your PostgreSQL connection string]
SESSION_SECRET = [Generate a random string]
NODE_ENV = production
ADMIN_EMAIL = admin@example.com
ADMIN_PASSWORD = admin123

Step 4: Run Database Migrations

Open Railway CLI or use web terminal
Run: npx prisma migrate deploy
Run: npm run seed (optional)

Step 5: Generate Domain

Click Generate Domain in Railway service settings to get the public URL
Fill in the Railway URL into README

Post-Deployment Checklist

Database migration completed
Environment variables are set correctly
Application can start normally
Home page accessible
New users can be registered
Login with demo account available
Accessible management background
GDPR privacy page available
README Updated Live Demo URL

## Troubleshooting

Database Connection Errors:
Verify `DATABASE_URL` is correct
Check database is running and accessible
Ensure connection string includes SSL parameters if required

Build Failures:
Check Node.js version (requires 18+)
Verify all dependencies in package.json
Check build logs for specific errors

Application Crashes:
Check application logs in dashboard
Verify all environment variables are set
Ensure SESSION_SECRET is set

