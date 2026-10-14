@echo off
setlocal
cd AI-mock-interview-master

:: Check for node_modules
if not exist "node_modules\" (
    echo node_modules not found. Installing dependencies...
    call npm install
)

:: Check for .env file
if not exist ".env" (
    echo WARNING: .env file not found.
    echo Please create a .env file based on .env.example with your API keys.
    if exist ".env.example" (
        echo Creating .env from .env.example...
        copy .env.example .env
    )
)

echo Starting the AI Mock Interview project...
call npm run dev
pause
endlocal