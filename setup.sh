#!/bin/bash
# Setup script for Wedding Landing Page - Email Backend
# This script helps set up Composer and PHP email functionality

echo ""
echo "===================================================="
echo "   KECH WEDDINGS - Backend Setup Helper"
echo "===================================================="
echo ""

# Check if Composer is installed
echo "Checking for Composer installation..."
if ! command -v composer &> /dev/null; then
    echo ""
    echo "ERROR: Composer is not installed or not in PATH"
    echo ""
    echo "Please install Composer from: https://getcomposer.org/download/"
    echo ""
    exit 1
fi

echo "[OK] Composer found"
echo ""

# Check if PHP is installed
echo "Checking for PHP installation..."
if ! command -v php &> /dev/null; then
    echo ""
    echo "ERROR: PHP is not installed or not in PATH"
    echo ""
    echo "Please install PHP from: https://www.php.net/download.php"
    echo ""
    exit 1
fi

echo "[OK] PHP found"
php -v
echo ""

# Install Composer dependencies
echo ""
echo "Installing PHPMailer via Composer..."
echo ""
composer install

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Failed to install Composer dependencies"
    echo ""
    exit 1
fi

echo ""
echo "[OK] PHPMailer installed successfully"
echo ""

# Create logs directory
if [ ! -d "backend/logs" ]; then
    echo "Creating logs directory..."
    mkdir -p backend/logs
    echo "[OK] Logs directory created"
else
    echo "[OK] Logs directory already exists"
fi

echo ""
echo "===================================================="
echo "   Setup Complete!"
echo "===================================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Copy .env.example to .env:"
echo "   cp .env.example .env"
echo ""
echo "2. Edit .env file with your Gmail credentials:"
echo "   - SMTP_USER: your Gmail address"
echo "   - SMTP_PASSWORD: your App Password (from Google Account)"
echo "   - ADMIN_EMAIL: where to send notifications"
echo ""
echo "3. To test locally, run:"
echo "   php -S localhost:8000"
echo ""
echo "4. Read backend/README.md for detailed instructions"
echo ""
echo "===================================================="
echo ""
