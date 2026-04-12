<?php
/**
 * Configuration file for email handling
 * Load environment variables from .env file
 */

// Resolve deployment paths for both local and shared-hosting layouts.
$backend_dir = __DIR__;
$root_dir = dirname($backend_dir);

$env_candidates = [
    $root_dir . '/.env',
    $backend_dir . '/.env',
];

$env_file = null;
foreach ($env_candidates as $candidate) {
    if (file_exists($candidate)) {
        $env_file = $candidate;
        break;
    }
}

// Load environment variables
if ($env_file && file_exists($env_file)) {
    $lines = file($env_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '#') === 0 || strpos($line, '=') === false) {
            continue;
        }
        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        if (!empty($key)) {
            putenv("$key=$value");
        }
    }
}

// Set error reporting based on environment
$debug = getenv('DEBUG') === 'true';
if ($debug) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Define configuration constants
define('SMTP_HOST', getenv('SMTP_HOST') ?: 'smtp.gmail.com');
define('SMTP_PORT', getenv('SMTP_PORT') ?: 587);
define('SMTP_ENCRYPTION', strtolower(getenv('SMTP_ENCRYPTION') ?: 'starttls'));
define('SMTP_TIMEOUT', (int) (getenv('SMTP_TIMEOUT') ?: 20));
define('SMTP_USER', getenv('SMTP_USER'));
define('SMTP_PASSWORD', getenv('SMTP_PASSWORD'));
define('SMTP_FROM_EMAIL', getenv('SMTP_FROM_EMAIL'));
define('SMTP_FROM_NAME', getenv('SMTP_FROM_NAME'));
define('SITE_URL', getenv('SITE_URL'));
define('ADMIN_EMAIL', getenv('ADMIN_EMAIL'));
define('ENVIRONMENT', getenv('ENVIRONMENT') ?: 'production');
define('DEBUG', $debug);
define('DB_ENABLED', getenv('DB_ENABLED') === 'true');
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_PORT', (int) (getenv('DB_PORT') ?: 3306));
define('DB_NAME', getenv('DB_NAME') ?: 'wedding_landingpage');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASSWORD', getenv('DB_PASSWORD') ?: '');

// Check if PHPMailer is installed
$autoload_candidates = [
    $root_dir . '/vendor/autoload.php',
    $backend_dir . '/vendor/autoload.php',
];

$autoload = null;
foreach ($autoload_candidates as $candidate) {
    if (file_exists($candidate)) {
        $autoload = $candidate;
        break;
    }
}

$phpmailerAvailable = false;

if ($autoload) {
    require_once $autoload;
    $phpmailerAvailable = true;
} else {
    $phpmailerBaseCandidates = [
        $backend_dir . '/vendor/phpmailer/phpmailer/src',
        $root_dir . '/vendor/phpmailer/phpmailer/src',
    ];

    $phpmailerBase = null;
    foreach ($phpmailerBaseCandidates as $candidate) {
        if (file_exists($candidate . '/PHPMailer.php') && file_exists($candidate . '/SMTP.php') && file_exists($candidate . '/Exception.php')) {
            $phpmailerBase = $candidate;
            break;
        }
    }

    if ($phpmailerBase) {
        require_once $phpmailerBase . '/Exception.php';
        require_once $phpmailerBase . '/PHPMailer.php';
        require_once $phpmailerBase . '/SMTP.php';
        $phpmailerAvailable = true;
    }
}

define('PHPMAILER_AVAILABLE', $phpmailerAvailable);

/**
 * Returns a PDO connection for MySQL storage.
 */
function getDatabaseConnection(): PDO {
    $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', DB_HOST, DB_PORT, DB_NAME);

    return new PDO($dsn, DB_USER, DB_PASSWORD, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
}

?>
