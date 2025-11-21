@echo off
echo Resetting database and creating test users...
echo.
npx prisma migrate reset --force
echo.
echo Database setup complete!
echo.
echo Test accounts created:
echo   - test@example.com / password123
echo   - john@example.com / password123
echo.
echo Next step: Run start-server.bat to launch the application
pause
