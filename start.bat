@echo off
cd /d "%~dp0"
echo Starting server...
if not exist "node_modules" call npm install
if not exist "prisma\dev.db" call npm run setup
echo.
echo Open: http://localhost:3000
echo User: duncan@highlands.com / password123
echo Admin: admin@example.com / admin123
echo.
call npm run dev
pause
