@echo off
cd /d "%~dp0"
echo Resetting database...
taskkill /F /IM node.exe >nul 2>&1
if exist "prisma\dev.db" del /f "prisma\dev.db"
if exist "prisma\dev.db-journal" del /f "prisma\dev.db-journal"
if exist "prisma\migrations" rd /s /q "prisma\migrations"
call npx prisma migrate dev --name init
call npx prisma db seed
echo Done
pause
