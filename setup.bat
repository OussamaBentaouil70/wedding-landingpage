@echo off
REM Setup script for Wedding Landing Page - Email Backend
REM This script helps set up Composer and PHP email functionality

echo.
echo ====================================================
echo    KECH WEDDINGS - Backend Setup Helper
echo ====================================================
echo.

REM Check if Composer is installed
echo Checking for Composer installation...
where composer >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Composer is not installed or not in PATH
    echo.
    echo Please install Composer from: https://getcomposer.org/download/
    echo Make sure to add Composer to your PATH environment variable
    echo.
    pause
    exit /b 1
)

echo [OK] Composer found
echo.

REM Check if PHP is installed
echo Checking for PHP installation...
where php >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ERROR: PHP is not installed or not in PATH
    echo.
    echo For XAMPP: Make sure C:\xampp\php is added to PATH
    echo Or download PHP from: https://www.php.net/download.php
    echo.
    pause
    exit /b 1
)

echo [OK] PHP found
php -v
echo.

REM Install Composer dependencies
echo.
echo Installing PHPMailer via Composer...
echo.
composer install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install Composer dependencies
    echo.
    pause
    exit /b 1
)

echo.
echo [OK] PHPMailer installed successfully
echo.

REM Create logs directory
if not exist "backend\logs" (
    echo Creating logs directory...
    mkdir backend\logs
    echo [OK] Logs directory created
) else (
    echo [OK] Logs directory already exists
)

echo.
echo ====================================================
echo    Setup Complete!
echo ====================================================
echo.
echo Next steps:
echo.
echo 1. Copy .env.example to .env:
echo    copy .env.example .env
echo.
echo 2. Edit .env file with your Gmail credentials:
echo    - SMTP_USER: your Gmail address
echo    - SMTP_PASSWORD: your App Password (from Google Account)
echo    - ADMIN_EMAIL: where to send notifications
echo.
echo 3. To test locally, run:
echo    php -S localhost:8000
echo.
echo 4. For XAMPP, place this project in C:\xampp\htdocs\
echo    Then access: http://localhost/wedding-landingpage
echo.
echo 5. Read backend\README.md for detailed instructions
echo.
echo ====================================================
echo.
pause
