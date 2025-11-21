@echo off
cd /d "%~dp0"
title Highland Games - Development Server
cls

echo =========================================================
echo    Highland Games - Quick Start
echo =========================================================
echo.
echo Current Directory: %CD%
echo.

REM Check if Node.js is installed
echo [1/3] Checking Node.js installation...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Node.js is not installed or not in PATH!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Recommended version: Node.js 18 LTS or higher
    echo.
    pause
    exit /b 1
)

node --version
echo Node.js: OK
echo.

REM Check if node_modules exists
echo [2/3] Checking dependencies...
if not exist "node_modules" (
    echo.
    echo WARNING: Dependencies not installed!
    echo Installing dependencies... (this may take 2-3 minutes)
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Failed to install dependencies!
        echo Please check your internet connection.
        echo.
        pause
        exit /b 1
    )
)
echo Dependencies: OK
echo.

REM Check if database exists
echo [3/3] Checking database...
if not exist "prisma\dev.db" (
    echo.
    echo WARNING: Database not initialized!
    echo Initializing database...
    echo.
    call npm run setup
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Failed to initialize database!
        echo Try running: reset-database.bat
        echo.
        pause
        exit /b 1
    )
)
echo Database: OK
echo.

echo =========================================================
echo   Starting Development Server...
echo =========================================================
echo.
echo   Server will be available at:
echo   http://localhost:3000
echo.
echo   Test Accounts:
echo   - User:  duncan@highlands.com  /  password123
echo   - Admin: admin@example.com     /  admin123
echo.
echo   Press Ctrl+C to stop the server
echo =========================================================
echo.

REM Start the development server
call npm run dev

REM This runs when server stops
echo.
echo Server stopped.
pause
