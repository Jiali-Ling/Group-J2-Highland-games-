# Highland Games Project - Setup & Troubleshooting Guide

## Current Status: ✅ All software installed, ❌ PowerShell restriction

---

## 🔧 Required Software (Already Installed)

### ✅ 1. Node.js (v22.21.0) - Installed
**Purpose**: JavaScript runtime for running the application
**Status**: Working correctly

### ✅ 2. npm (Package Manager) - Installed but blocked by PowerShell
**Purpose**: Install project dependencies
**Status**: Blocked by PowerShell execution policy

### ✅ 3. Git - Installed
**Purpose**: Version control and GitHub integration
**Status**: Working correctly

---

## 🚨 Critical Issue: PowerShell Script Execution Blocked

**Error Message**: "无法加载文件... 因为在此系统上禁止运行脚本"

**Translation**: "Cannot load file... because running scripts is disabled on this system"

### Quick Fix (Recommended)

**Option 1: Use Command Prompt (CMD) instead of PowerShell**

1. Open Command Prompt (not PowerShell):
   - Press `Win + R`
   - Type: `cmd`
   - Press Enter

2. Navigate to project folder:
   ```cmd
   cd /d "e:\2025-2026西苏文件\Internet Technologies\期末CW02\highland-games-starter"
   ```

3. Run commands normally:
   ```cmd
   node --version
   npm --version
   npm install
   npm run dev
   ```

**Option 2: Temporarily Enable PowerShell Scripts (Just for this session)**

1. Right-click PowerShell and select "Run as Administrator"

2. Run this command:
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```

3. Type `Y` and press Enter

4. Now you can run npm commands in this PowerShell window

**Option 3: Use the Batch Scripts (Recommended - No permission needed)**

Simply double-click these files:
- `quick-start.bat` - Start development server
- `reset-database.bat` - Reset database
- `clean-build.bat` - Clean and rebuild

---

## 📝 Step-by-Step Setup Guide

### Step 1: Fix PowerShell Issue

Choose one of the three options above. **Option 1 (Use CMD)** is the easiest.

### Step 2: Verify Installation

Open Command Prompt (CMD) and run:

```cmd
cd /d "e:\2025-2026西苏文件\Internet Technologies\期末CW02\highland-games-starter"
node --version
npm --version
```

**Expected Output**:
```
v22.21.0
10.x.x
```

### Step 3: Install Dependencies

In Command Prompt:

```cmd
npm install
```

This will download all required packages (takes 2-3 minutes).

### Step 4: Setup Database

In Command Prompt:

```cmd
npm run setup
```

Or double-click: `reset-database.bat`

### Step 5: Start Server

**Method A - Using Command Prompt:**
```cmd
npm run dev
```

**Method B - Using Batch File:**
Double-click `quick-start.bat`

### Step 6: Open Browser

Navigate to: **http://localhost:3000**

### Step 7: Login

**Regular User:**
- Email: `duncan@highlands.com`
- Password: `password123`

**Administrator:**
- Email: `admin@example.com`
- Password: `admin123`

---

## 🐛 Common Issues & Solutions

### Issue 1: "npm command not found" or blocked

**Solution**: Use CMD instead of PowerShell (see Option 1 above)

### Issue 2: "Port 3000 is already in use"

**Solution**:
```cmd
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

Or double-click `reset-database.bat` (it kills all Node processes)

### Issue 3: "Database is locked"

**Solution**: Double-click `reset-database.bat`

### Issue 4: "Cannot find module '@prisma/client'"

**Solution**:
```cmd
npm install
npx prisma generate
```

Or double-click `clean-build.bat`

### Issue 5: Login shows "Invalid email or password"

**Solution**: 
1. Double-click `reset-database.bat` to reset database
2. Wait for "Database reset complete!"
3. Try logging in again with test accounts

### Issue 6: Page shows "Application Error" or "Failed to fetch"

**Solution**:
1. Stop the server (Ctrl+C)
2. Double-click `clean-build.bat`
3. Wait for build to complete
4. Double-click `quick-start.bat`

---

## 📦 What Gets Installed (No AI/Complex Tech)

### 1. React (v18.2.0)
**What it is**: JavaScript library for building user interfaces
**Why needed**: Creates the website's interactive pages
**Simple analogy**: Like building blocks for web pages

### 2. Remix (v2.9.2)
**What it is**: Web framework built on React
**Why needed**: Handles routing, server-side rendering, and data loading
**Simple analogy**: The blueprint that organizes all the building blocks

### 3. Prisma (v5.20.0)
**What it is**: Database toolkit
**Why needed**: Safely talks to the database (no SQL injection risks)
**Simple analogy**: A translator between JavaScript code and database

### 4. bcryptjs (v2.4.3)
**What it is**: Password encryption library
**Why needed**: Securely stores passwords (cannot be reversed)
**Simple analogy**: A one-way lock for passwords

### 5. SQLite (Built-in)
**What it is**: Simple file-based database
**Why needed**: Stores all data (users, teams, events, etc.)
**Simple analogy**: A smart Excel file that your code can query

**Total Size**: ~300MB (mostly in `node_modules/` folder)

---

## 🎯 Simple Testing Checklist

### Test 1: Homepage Loads
- [  ] Visit http://localhost:3000
- [  ] See "Paisley Highland Games" title
- [  ] See navigation menu (Events, Winners, Login, Sign Up)

### Test 2: User Registration
- [  ] Click "Sign Up"
- [  ] Enter email: `test1@test.com`
- [  ] Enter password: `test123`
- [  ] Click "Create Account"
- [  ] See success message

### Test 3: User Login
- [  ] Click "Login"
- [  ] Enter email: `duncan@highlands.com`
- [  ] Enter password: `password123`
- [  ] Click "Sign In"
- [  ] See homepage with "Profile" and "Teams" in menu

### Test 4: Profile Management
- [  ] Click "Profile" in menu
- [  ] See existing profile data (Duncan MacDougall)
- [  ] Edit full name
- [  ] Click "Update Profile"
- [  ] See success message

### Test 5: Team Creation
- [  ] Click "Teams" in menu
- [  ] Click "Create New Team"
- [  ] Enter team name: `Test Team`
- [  ] Enter description: `Testing team features`
- [  ] Click "Create Team"
- [  ] See invite code (8 characters)

### Test 6: Event Registration
- [  ] Click "Events" in menu
- [  ] Click on first event
- [  ] Click "Register Now"
- [  ] Select category (e.g., "Caber Toss")
- [  ] Select team or individual
- [  ] Check all consent boxes
- [  ] Click "Submit Registration"
- [  ] See "Registration Pending" status

### Test 7: Admin Approval
- [  ] Logout
- [  ] Login as admin (`admin@example.com` / `admin123`)
- [  ] Click "Admin" in menu
- [  ] See pending registrations
- [  ] Click "Approve" or "Reject"
- [  ] Enter rejection reason (if rejecting)
- [  ] See registration status updated

### Test 8: GDPR Features
- [  ] Login as regular user
- [  ] Click "Privacy" in menu
- [  ] Click "Export My Data" → Download JSON file
- [  ] Click "Request Data Correction" → Submit request
- [  ] Click "Delete My Account" → Confirm deletion

---

## 💻 Recommended Development Setup

### Text Editor (Choose One)

**Option 1: VS Code (What you're using)**
- Already installed ✅
- Best for web development
- Free and lightweight

**Option 2: Notepad++ (Simpler alternative)**
- Download: https://notepad-plus-plus.org/
- Very lightweight
- Good for quick edits

### Browser (Recommended)

**Google Chrome** or **Microsoft Edge**
- Built-in developer tools (F12)
- Good for testing and debugging

### Terminal (Recommended)

**Command Prompt (CMD)** - Built into Windows
- No PowerShell restrictions
- Simpler commands
- Works with all our batch scripts

---

## 📚 Understanding the Project Structure

```
Your Project/
│
├── app/                     ← Your code (what you edit)
│   ├── routes/             ← Web pages
│   ├── styles/             ← CSS styling
│   └── utils/              ← Helper functions
│
├── prisma/                  ← Database stuff
│   ├── schema.prisma       ← Database design
│   └── seed.js             ← Test data
│
├── public/                  ← Static files (images, CSS)
│
├── node_modules/            ← Installed packages (DON'T EDIT)
│
├── build/                   ← Compiled code (DON'T EDIT)
│
├── package.json             ← Project configuration
├── .env                     ← Secret keys (DON'T SHARE)
├── Dockerfile               ← For Docker deployment
│
└── Batch Scripts/           ← Easy shortcuts
    ├── quick-start.bat     ← Start server
    ├── reset-database.bat  ← Reset database
    └── clean-build.bat     ← Clean rebuild
```

---

## 🎓 Key Concepts (Simple Explanations)

### What is a Server?
A program that listens for requests and sends back web pages. When you run `npm run dev`, your computer becomes a mini web server.

### What is a Database?
A structured way to store data. Think of it like organized Excel sheets that your code can search and update.

### What is an API?
A way for the frontend (what users see) to talk to the backend (database and logic). Like a waiter taking orders to the kitchen.

### What is GDPR?
European privacy law requiring websites to let users:
- See their data
- Correct their data
- Delete their data

### What is SSR (Server-Side Rendering)?
Generating HTML on the server before sending to browser. Makes pages load faster and helps with SEO.

### What is a Migration?
A script that changes your database structure. Like remodeling a house - you need a plan (migration) to change the layout.

---

## 🚀 Quick Command Reference

### In Command Prompt (CMD):

```cmd
# Navigate to project
cd /d "e:\2025-2026西苏文件\Internet Technologies\期末CW02\highland-games-starter"

# Install dependencies
npm install

# Reset database
npm run setup

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Open database viewer
npx prisma studio

# Generate Prisma client
npx prisma generate

# Create database migration
npx prisma migrate dev --name migration_name

# Check Node version
node --version

# Check npm version
npm --version
```

### Or Just Double-Click:
- `quick-start.bat` → Start everything
- `reset-database.bat` → Fix database issues
- `clean-build.bat` → Fix build issues

---

## 📧 Contact & Help

**Project GitHub**: https://github.com/Jiali-Ling/Group-J2-Highland-games-

**Helpful Resources**:
- Remix Docs: https://remix.run/docs (framework documentation)
- React Docs: https://react.dev (UI library documentation)
- Prisma Docs: https://www.prisma.io/docs (database documentation)

**Common Questions**:
- "How do I...?" → Check this guide first
- "It's not working!" → Double-click `reset-database.bat` then `quick-start.bat`
- "I see an error!" → Copy error message and search on Google

---

## ✅ Final Checklist Before Running

- [  ] Node.js installed (v18 or higher)
- [  ] Using Command Prompt (CMD) not PowerShell
- [  ] In correct directory (project folder)
- [  ] Dependencies installed (`npm install`)
- [  ] Database initialized (`npm run setup` or `reset-database.bat`)
- [  ] Server started (`npm run dev` or `quick-start.bat`)
- [  ] Browser open to http://localhost:3000
- [  ] Test accounts known (see Step 7 above)

**If all checked**: Your project is ready! 🎉

**If something fails**: 
1. Stop everything (Ctrl+C)
2. Double-click `reset-database.bat`
3. Double-click `clean-build.bat`
4. Double-click `quick-start.bat`
5. Try again

---

**Last Updated**: November 21, 2025  
**Project Status**: Ready for Development
