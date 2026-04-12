# 🚀 Quick Start Guide - Email Setup

## Installation (5 minutes)

### Step 1: Install Dependencies

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

Or manually:
```bash
composer install
```

### Step 2: Set Up Gmail

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Go to App Passwords (search in security settings)
4. Select "Mail" and "Windows Computer"  
5. Copy the 16-character password Google generates

### Step 3: Configure Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Gmail info:
   ```
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   ADMIN_EMAIL=admin@kechweddings.com
   ```

3. Save the file

### Step 4: Test Locally

**Option A: PHP Built-in Server (Easiest)**
```bash
php -S localhost:8000
```
Then open http://localhost:3000 in your browser

**Option B: XAMPP**
1. Copy this project to: `C:\xampp\htdocs\wedding-landingpage`
2. Update the form URL in `src/components/ContactForm.tsx`:
   ```javascript
   const response = await fetch(
     "http://localhost/wedding-landingpage/backend/contact-handler.php"
   );
   ```
3. Start XAMPP Apache
4. Open http://localhost/wedding-landingpage

### Step 5: Test the Form

1. Go to the Contact Form section
2. Fill in all fields
3. Click Submit
4. Check your email for confirmation
5. Check admin email for notification

## 📁 What Was Created

```
backend/
├── config.php                      ← Loads .env configuration
├── contact-handler.php             ← Processes form submissions
├── templates/
│   ├── customer-confirmation.html  ← Email to customer
│   └── admin-notification.html     ← Email to admin
├── logs/
│   ├── submissions.log             ← Successful submissions
│   └── errors.log                  ← Error tracking
└── README.md                       ← Full documentation

.env                              ← Your config (KEEP SECRET!)
.env.example                      ← Template for .env
composer.json                     ← Dependency manager
setup.bat / setup.sh              ← Installation helpers
```

## 🔗 Form Submission Flow

```
User submits form (React)
        ↓
ContactForm.tsx validates data
        ↓
Sends JSON to backend/contact-handler.php
        ↓
PHP validates & sanitizes input
        ↓
Connects to Gmail SMTP
        ↓
Sends 2 emails:
├── Confirmation to customer
└── Notification to admin
        ↓
Logs submission
        ↓
Returns response to React
        ↓
Shows success/error message
```

## ⚙️ How to Configure the Form URL

The form currently tries to reach:
```
http://localhost:8000/backend/contact-handler.php
```

### For XAMPP Users:
Edit [src/components/ContactForm.tsx](src/components/ContactForm.tsx#L109) and change:

```javascript
// Change this:
const response = await fetch(
  "http://localhost:8000/backend/contact-handler.php",

// To this (if using XAMPP):
const response = await fetch(
  "http://localhost/wedding-landingpage/backend/contact-handler.php",
```

### For Production:
```javascript
// To this (production domain):
const response = await fetch(
  "https://kechweddings.com/backend/contact-handler.php",
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "PHPMailer not found" | Run `composer install` |
| "Failed to send email" | Check Gmail App Password in .env |
| "Connection refused" | Make sure PHP server is running |
| No emails received | Check spam folder & verify .env settings |
| CORS error | Update URL in ContactForm.tsx |

## 📧 Email Template Customization

The templates use placeholders:

```
{firstName}    - Customer first name
{lastName}     - Customer last name
{email}        - Customer email
{phone}        - Customer phone (optional)
{weddingType}  - Selected wedding type
{message}      - Customer message
{timestamp}    - When submitted
{emailId}      - Unique submission ID
```

Edit templates in `backend/templates/` to customize the emails.

## 📋 Checklist Before Going Live

- [ ] Gmail 2-Step Verification enabled
- [ ] App Password created for Gmail
- [ ] .env file configured with correct credentials
- [ ] .env file is in .gitignore (DON'T commit secrets!)
- [ ] Tested form submission locally
- [ ] Received both customer & admin emails
- [ ] backend/logs/ has correct submission logged
- [ ] Updated form URL for production domain
- [ ] Set ENVIRONMENT=production & DEBUG=false in .env

## 🆘 Need Help?

1. Check `backend/README.md` for detailed docs
2. View error logs: `backend/logs/errors.log`
3. View submissions: `backend/logs/submissions.log`
4. Enable DEBUG=true in .env to see detailed errors

## 📞 Reference

- **Gmail SMTP**: smtp.gmail.com:587 (STARTTLS)
- **Form Handler**: backend/contact-handler.php
- **Config File**: .env (not in repo)
- **Config Loader**: backend/config.php
- **Customer Email**: backend/templates/customer-confirmation.html
- **Admin Email**: backend/templates/admin-notification.html

---

Happy emailing! 💌✨
