<?php
/**
 * Contact Form Handler
 * Processes contact form submissions and sends emails
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);
ob_start();

register_shutdown_function(function () {
    $fatalError = error_get_last();
    if ($fatalError && in_array($fatalError['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        while (ob_get_level() > 0) {
            ob_end_clean();
        }

        if (!headers_sent()) {
            header('Content-Type: application/json');
            http_response_code(500);
        }

        echo json_encode([
            'success' => false,
            'message' => 'Server fatal error. Check backend/logs/errors.log.'
        ]);
    }
});

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$response = [
    'success' => false,
    'message' => ''
];

try {
    require_once __DIR__ . '/config.php';

    // Validate request method
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid request method'
        ]);
        exit();
    }

    // Get form data
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        $data = $_POST;
    }

    // Validate required fields
    $required_fields = ['firstName', 'lastName', 'email', 'weddingType', 'message'];
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Sanitize input
    $firstName = htmlspecialchars(trim($data['firstName']), ENT_QUOTES, 'UTF-8');
    $lastName = htmlspecialchars(trim($data['lastName']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
    $weddingType = htmlspecialchars(trim($data['weddingType']), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8');
    $phone = isset($data['phone']) ? htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8') : '';

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }

    $canSendEmail = PHPMAILER_AVAILABLE
        && !empty(SMTP_USER)
        && !empty(SMTP_PASSWORD)
        && !empty(SMTP_FROM_EMAIL)
        && !empty(ADMIN_EMAIL);

    // Generate email IDs for tracking
    $emailId = bin2hex(random_bytes(16));
    $timestamp = date('Y-m-d H:i:s');

    // Persist inquiry in MySQL if enabled
    if (DB_ENABLED) {
        try {
            $pdo = getDatabaseConnection();
            $stmt = $pdo->prepare(
                'INSERT INTO inquiries (email_id, first_name, last_name, email, phone, wedding_type, message, submitted_at) VALUES (:email_id, :first_name, :last_name, :email, :phone, :wedding_type, :message, :submitted_at)'
            );

            $stmt->execute([
                ':email_id' => $emailId,
                ':first_name' => $firstName,
                ':last_name' => $lastName,
                ':email' => $email,
                ':phone' => $phone,
                ':wedding_type' => $weddingType,
                ':message' => $message,
                ':submitted_at' => $timestamp,
            ]);
        } catch (\Throwable $dbException) {
            $log_file = __DIR__ . '/logs/errors.log';
            if (!is_dir(__DIR__ . '/logs')) {
                mkdir(__DIR__ . '/logs', 0755, true);
            }

            $error_entry = json_encode([
                'timestamp' => date('Y-m-d H:i:s'),
                'error' => 'Database insert failed: ' . $dbException->getMessage(),
                'file' => $dbException->getFile(),
                'line' => $dbException->getLine()
            ]) . PHP_EOL;

            file_put_contents($log_file, $error_entry, FILE_APPEND);
        }
    }

    if ($canSendEmail) {
        // Initialize PHPMailer
        $mail = new PHPMailer(true);

        // Configure SMTP
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USER;
        $mail->Password = SMTP_PASSWORD;
        if (SMTP_ENCRYPTION === 'ssl' || SMTP_ENCRYPTION === 'smtps') {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        } else {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        }
        $mail->Port = SMTP_PORT;
        $mail->Timeout = SMTP_TIMEOUT;
        $mail->SMTPDebug = 0;

        // Set sender and recipient
        $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
        $mail->addAddress($email, "$firstName $lastName");
        $mail->addBCC(ADMIN_EMAIL, 'Admin');

        // Load customer email template
        $customerTemplatePath = __DIR__ . '/templates/customer-confirmation.html';
        if (!file_exists($customerTemplatePath)) {
            throw new Exception('Customer email template not found.');
        }

        $customerTemplate = file_get_contents($customerTemplatePath);
        if ($customerTemplate === false) {
            throw new Exception('Unable to read customer email template.');
        }
        $customerHtml = str_replace(
            ['{firstName}', '{timestamp}'],
            [$firstName, $timestamp],
            $customerTemplate
        );

        // Embed logo so it renders consistently in email clients.
        $logoPath = realpath(__DIR__ . '/../src/assets/Images/logo.png');
        if ($logoPath && file_exists($logoPath)) {
            $mail->addEmbeddedImage($logoPath, 'kech-weddings-logo', 'logo.png');
        }

        // Send email to customer
        $mail->isHTML(true);
        $mail->Subject = "Thank you for your inquiry - Kech Weddings";
        $mail->Body = $customerHtml;
        $mail->AltBody = "Thank you for your inquiry. We have received your request and will contact you soon.";

        if (!$mail->send()) {
            throw new Exception('Failed to send email to customer: ' . $mail->ErrorInfo);
        }

        // Clear recipients for admin email
        $mail->clearAddresses();
        $mail->clearAttachments();
        $mail->addAddress(ADMIN_EMAIL, 'Kech Weddings Admin');

        // Load admin email template
        $adminTemplatePath = __DIR__ . '/templates/admin-notification.html';
        if (!file_exists($adminTemplatePath)) {
            throw new Exception('Admin email template not found.');
        }

        $adminTemplate = file_get_contents($adminTemplatePath);
        if ($adminTemplate === false) {
            throw new Exception('Unable to read admin email template.');
        }
        $adminHtml = str_replace(
            ['{firstName}', '{lastName}', '{email}', '{phone}', '{weddingType}', '{message}', '{timestamp}', '{emailId}'],
            [$firstName, $lastName, $email, $phone ?: 'N/A', ucfirst(str_replace('_', ' ', $weddingType)), nl2br($message), $timestamp, $emailId],
            $adminTemplate
        );

        // Send email to admin
        $mail->Subject = "New Wedding Inquiry from $firstName $lastName";
        $mail->Body = $adminHtml;

        if (!$mail->send()) {
            throw new Exception('Failed to send admin notification: ' . $mail->ErrorInfo);
        }
    }

    // Log the submission
    $log_file = __DIR__ . '/logs/submissions.log';
    if (!is_dir(__DIR__ . '/logs')) {
        mkdir(__DIR__ . '/logs', 0755, true);
    }
    
    $log_entry = json_encode([
        'timestamp' => $timestamp,
        'emailId' => $emailId,
        'firstName' => $firstName,
        'lastName' => $lastName,
        'email' => $email,
        'weddingType' => $weddingType,
        'status' => 'sent'
    ]) . PHP_EOL;
    
    file_put_contents($log_file, $log_entry, FILE_APPEND);

    $response['success'] = true;
    $response['message'] = $canSendEmail
        ? 'Thank you! Your inquiry has been sent successfully. We will contact you soon.'
        : 'Your inquiry has been saved successfully. Email delivery is currently disabled.';
    $response['emailId'] = $emailId;

} catch (\Throwable $e) {
    http_response_code(500);
    $response['message'] = DEBUG ? $e->getMessage() : 'An error occurred. Please try again later.';
    
    // Log the error
    $log_file = __DIR__ . '/logs/errors.log';
    if (!is_dir(__DIR__ . '/logs')) {
        mkdir(__DIR__ . '/logs', 0755, true);
    }
    
    $error_entry = json_encode([
        'timestamp' => date('Y-m-d H:i:s'),
        'error' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]) . PHP_EOL;
    
    file_put_contents($log_file, $error_entry, FILE_APPEND);
}

while (ob_get_level() > 0) {
    ob_end_clean();
}

echo json_encode($response);
?>
