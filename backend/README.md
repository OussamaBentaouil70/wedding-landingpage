# Backend Setup Guide - Email with PHPMailer

This guide explains how to set up the email functionality for the wedding landing page using PHPMailer and Gmail SMTP.

## 📋 Prerequisites

- **XAMPP** (or any PHP environment with Composer support)
- **Composer** (for managing PHP dependencies)
- **Gmail Account** with 2-Factor Authentication enabled
- **App Password** for Gmail (generated in Google Account settings)

## 🚀 Installation Steps

### 1. Install PHPMailer via Composer

Navigate to your project root and run:

```bash
composer require phpmailer/phpmailer
```

This will:
- Create a `vendor/` folder with PHPMailer
- Generate `composer.json` and `composer.lock` files

### 2. Configure Gmail

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Generate an **App Password**:
   - Search for "App passwords" in the security settings
   - Select "Mail" and "Windows Computer"
   - Google will generate a 16-character password
   - Copy this password

### 3. Update .env File

Edit the `.env` file in your project root:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=Kech Weddings
ADMIN_EMAIL=admin@kechweddings.com
SITE_URL=http://localhost:3000
ENVIRONMENT=development
DEBUG=true
```

**Replace:**
- `your-email@gmail.com` with your Gmail address
- `your-app-password` with the 16-character password from step 2
- `admin@kechweddings.com` with where you want to receive inquiries

### 4. Local Testing with PHP Built-in Server

From your project root, run:

```bash
php -S localhost:8000
```

This starts a PHP development server on port 8000.

### 5. For XAMPP Setup

If using XAMPP, place your project in `C:\xampp\htdocs\wedding-landingpage`

Then access:
```
http://localhost/wedding-landingpage/backend/contact-handler.php
```

Update the form submission URL in [ContactForm.tsx](src/components/ContactForm.tsx) accordingly.

## 📁 Project Structure

```
backend/
├── config.php                          # Configuration loader
├── contact-handler.php                 # Main form handler
├── templates/
│   ├── customer-confirmation.html      # Email sent to customer
│   ├── admin-notification.html         # Email sent to admin
└── logs/
    ├── submissions.log                 # Successful submissions
    └── errors.log                      # Error logs

.env                                    # Environment variables (GITIGNORE THIS!)
```

## ✉️ How It Works

1. **User submits form** from the website
2. **ContactForm.tsx** sends data to `backend/contact-handler.php`
3. **contact-handler.php**:
   - Validates input data
   - Loads configurations from `.env`
   - Sends **confirmation email** to customer
   - Sends **notification email** to admin
   - Logs the submission
4. **Email templates** are customized with form data
5. **Response** is sent back to frontend with success/error message

## 🔍 Testing the Setup

### Test 1: Direct Request

```bash
curl -X POST http://localhost:8000/backend/contact-handler.php \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "test@example.com",
    "phone": "+1234567890",
    "weddingType": "desert_agafay",
    "message": "Test message"
  }'
```

### Test 2: Via Web Form

1. Open the website in browser
2. Scroll to Contact Form
3. Fill in all fields
4. Submit the form
5. Check your email (and admin email) for the messages

### Test 3: Check Logs

View successful submissions:
```bash
type backend\logs\submissions.log
```

View errors:
```bash
type backend\logs\errors.log
```

## 🐛 Troubleshooting

### "PHPMailer not found" Error
```bash
# Make sure you've installed Composer dependencies
composer install
```

### "Failed to send email" Error
- Check that Gmail credentials in `.env` are correct
- Ensure 2-FA and App Password are set up
- Verify you're using an **App Password**, not your regular Gmail password
- Check that `ENVIRONMENT` is set to `development` for debug info

### CORS Issues
If testing from a different domain, the PHP handles CORS headers automatically.

### No Emails Received
1. Check spam/promotions folders
2. Verify SMTP credentials in `.env`
3. Check error logs in `backend/logs/errors.log`
4. Enable `DEBUG=true` in `.env` to see detailed error messages

## 🔐 Security Notes

- **Never commit `.env` file** to version control
- **Never share your App Password** with others
- The `.gitignore` file already excludes `.env`
- Keep `DEBUG=false` in production
- Validate and sanitize all input (already done in code)

## 📧 Email Template Customization

Edit these files to customize emails:
- [customer-confirmation.html](backend/templates/customer-confirmation.html)
- [admin-notification.html](backend/templates/admin-notification.html)

Both support these placeholders:
- `{firstName}` - Customer first name
- `{lastName}` - Customer last name
- `{email}` - Customer email
- `{phone}` - Customer phone
- `{weddingType}` - Selected wedding type
- `{message}` - Customer message
- `{timestamp}` - Submission time
- `{emailId}` - Unique submission ID

## 🌐 Deployment

When deploying to production:

1. **Update .env** with production credentials
2. Set `ENVIRONMENT=production`
3. Set `DEBUG=false`
4. Ensure `vendor/` folder is installed on server
5. Make sure `backend/logs/` folder is writable
6. Update form submission URL in `ContactForm.tsx` to your production domain

## 📞 Support

For issues or questions:
- Check error logs in `backend/logs/`
- Review [PHPMailer Documentation](https://github.com/PHPMailer/PHPMailer)
- Verify Gmail App Password setup
- Test with `DEBUG=true` enabled

---

Created for Kech Weddings • Marrakech, Morocco
