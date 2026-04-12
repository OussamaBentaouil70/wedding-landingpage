CREATE DATABASE IF NOT EXISTS wedding_landingpage CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE wedding_landingpage;

CREATE TABLE IF NOT EXISTS inquiries (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email_id VARCHAR(64) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) DEFAULT NULL,
  wedding_type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  submitted_at DATETIME NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_inquiries_email_id (email_id),
  KEY idx_inquiries_email (email),
  KEY idx_inquiries_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
