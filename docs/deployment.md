
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

首次部署后，运行数据库迁移：
Go to your web service in Render
Open the Shell/Console
Run: npx prisma migrate deploy
Run: npm run seed (可选，填充演示数据)

Step 5: Update README

部署后，将 Live Demo URL 填写到 README.md 顶部。

Railway Deployment

Step 1: Create PostgreSQL Database

Go to Railway Dashboard (https://railway.app)
Click New Project
Click New → Database → Add PostgreSQL
Copy the connection string from the database service

Step 2: Deploy Application

In Railway, click New → GitHub Repo
Select your repository
Railway 会自动检测 railway.json 配置

Step 3: Set Environment Variables

在 Railway dashboard 添加这些变量：
DATABASE_URL = [Your PostgreSQL connection string]
SESSION_SECRET = [Generate a random string]
NODE_ENV = production
ADMIN_EMAIL = admin@example.com
ADMIN_PASSWORD = admin123

Step 4: Run Database Migrations

Open Railway CLI 或使用 web terminal
Run: npx prisma migrate deploy
Run: npm run seed (可选)

Step 5: Generate Domain

在 Railway 服务设置中点击 Generate Domain 获取公开 URL
将 Railway URL 填写到 README

Post-Deployment Checklist

数据库迁移完成
环境变量设置正确
应用可正常启动
可访问首页
可注册新用户
可用演示账号登录
可访问管理后台
GDPR 隐私页可用
README 已更新 Live Demo URL

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

