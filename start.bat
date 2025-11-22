@echo off
echo Installing dependencies...
call npm.cmd install
echo.
echo Setting up database...
call npm.cmd run setup
echo.
echo Starting development server...
call npm.cmd run dev

