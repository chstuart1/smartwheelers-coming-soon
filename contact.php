<?php
// Contact form handler
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get form data
$input = json_decode(file_get_contents('php://input'), true);

$name = $input['name'] ?? '';
$email = $input['email'] ?? '';
$city = $input['city'] ?? '';
$state = $input['state'] ?? '';
$source = $input['source'] ?? '';

// Validate required fields
if (empty($name) || empty($email) || empty($city) || empty($state) || empty($source)) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit;
}

// Create email content
$subject = 'SmartWheelers Contact Form Submission';
$message = "New contact form submission:\n\n";
$message .= "Name: " . htmlspecialchars($name) . "\n";
$message .= "Email: " . htmlspecialchars($email) . "\n";
$message .= "City: " . htmlspecialchars($city) . "\n";
$message .= "State: " . htmlspecialchars($state) . "\n";
$message .= "How they heard about us: " . htmlspecialchars($source) . "\n\n";
$message .= "Submitted on: " . date('Y-m-d H:i:s') . "\n";

$headers = "From: noreply@smartwheelers.com\r\n";
$headers .= "Reply-To: " . htmlspecialchars($email) . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
$to = 'admin@smartwheelers.com';
$sent = mail($to, $subject, $message, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Form submitted successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>

