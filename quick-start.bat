@echo off
cd /d "%~dp0"
echo ======================================
echo Highland Games - Quick Start
echo ======================================
echo.
echo Current Directory: %CD%
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js: OK
echo.

echo Starting development server...
echo.
echo Open your browser to: http://localhost:3000
echo.
echo Test Accounts:
echo - User: duncan@highlands.com / password123
echo - Admin: admin@example.com / admin123
echo.
echo Press Ctrl+C to stop the server
echo ======================================
echo.

call npm run dev
