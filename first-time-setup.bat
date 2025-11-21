@echo off
cd /d "%~dp0"
title Highland Games - First Time Setup
cls

echo =========================================================
echo    Highland Games - First Time Setup
echo =========================================================
echo.
echo This script will:
echo   1. Check Node.js installation
echo   2. Install all dependencies
echo   3. Initialize the database
echo   4. Create test accounts
echo.
echo This may take 3-5 minutes...
echo.
pause

echo.
echo =========================================================
echo [1/4] Checking Node.js...
echo =========================================================
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Node.js is not installed!
    echo.
    echo Please download and install Node.js:
    echo https://nodejs.org/
    echo.
    echo Recommended: Node.js 18 LTS or higher
    echo.
    pause
    exit /b 1
)

node --version
npm --version
echo Node.js: OK
echo.

echo =========================================================
echo [2/4] Installing Dependencies...
echo =========================================================
echo This may take 2-3 minutes...
echo.
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    echo Please check your internet connection and try again.
    echo.
    pause
    exit /b 1
)
echo Dependencies: Installed
echo.

echo =========================================================
echo [3/4] Generating Prisma Client...
echo =========================================================
call npx prisma generate
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to generate Prisma client!
    echo.
    pause
    exit /b 1
)
echo Prisma Client: Generated
echo.

echo =========================================================
echo [4/4] Initializing Database...
echo =========================================================
call npm run setup
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to initialize database!
    echo.
    pause
    exit /b 1
)
echo Database: Initialized
echo.

echo =========================================================
echo    Setup Complete!
echo =========================================================
echo.
echo Your Highland Games project is ready!
echo.
echo Test Accounts Created:
echo   - User:  duncan@highlands.com  /  password123
echo   - Admin: admin@example.com     /  admin123
echo   - Team Invite Code: TEST1234
echo.
echo Next Steps:
echo   1. Double-click: quick-start.bat
echo   2. Open browser: http://localhost:3000
echo   3. Login with test accounts above
echo.
echo =========================================================
pause
