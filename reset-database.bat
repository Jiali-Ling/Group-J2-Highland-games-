@echo off
echo ======================================
echo Highland Games Database Reset Script
echo ======================================
echo.

echo Step 1: Stopping any running servers...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Step 2: Removing old migrations...
if exist prisma\migrations rmdir /s /q prisma\migrations
echo Old migrations removed.

echo Step 3: Removing old database...
if exist prisma\dev.db del /f /q prisma\dev.db
if exist prisma\dev.db-journal del /f /q prisma\dev.db-journal
echo Old database removed.

echo Step 4: Running Prisma migration...
call npx prisma migrate dev --name init

echo.
echo Step 5: Seeding database...
call npx prisma db seed

echo.
echo ======================================
echo Database reset complete!
echo ======================================
echo.
echo Test Accounts:
echo - test@example.com / password123
echo - john@example.com / password123
echo - admin@example.com / admin123
echo.
echo Team Invite Code: TEST1234
echo.
pause
