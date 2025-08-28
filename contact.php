<?php
// Enhanced Contact Form Handler with AWS SES Integration
// SmartWheelers - Live Site Contact Form

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Load environment variables from .env file if it exists
function loadEnv($path) {
    if (file_exists($path)) {
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
                list($key, $value) = explode('=', $line, 2);
                $_ENV[trim($key)] = trim($value);
                putenv(trim($key) . '=' . trim($value));
            }
        }
    }
}

// Try to load environment variables
loadEnv('/home/ubuntu/smartwheelers-coming-soon/.env');
loadEnv('/smart_wheels_code/coming_soon_page/.env');

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

// Log the submission
$logMessage = "📧 Contact Form Submission:\n";
$logMessage .= "   Name: $name\n";
$logMessage .= "   Email: $email\n";
$logMessage .= "   City: $city\n";
$logMessage .= "   State: $state\n";
$logMessage .= "   Source: $source\n";
$logMessage .= "   Submitted: " . date('Y-m-d H:i:s') . "\n";
$logMessage .= "   IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

// Write to log file
$logFile = '/var/log/smartwheelers-contact.log';
file_put_contents($logFile, $logMessage . "\n", FILE_APPEND | LOCK_EX);

// Try AWS SES first, fallback to basic mail() function
$emailSent = false;

// Check if we have AWS credentials
$awsAccessKey = getenv('AWS_ACCESS_KEY_ID');
$awsSecretKey = getenv('AWS_SECRET_ACCESS_KEY');
$awsRegion = getenv('AWS_REGION') ?: 'us-east-1';

if ($awsAccessKey && $awsSecretKey) {
    // Try AWS SES via API
    $emailSent = sendEmailViaSES($name, $email, $city, $state, $source, $awsAccessKey, $awsSecretKey, $awsRegion);
}

if (!$emailSent) {
    // Fallback to basic mail() function
    $emailSent = sendEmailViaMail($name, $email, $city, $state, $source);
}

if ($emailSent) {
    echo json_encode([
        'success' => true, 
        'message' => 'Form submitted successfully',
        'method' => $awsAccessKey ? 'AWS SES' : 'Basic Mail'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}

// Function to send email via AWS SES
function sendEmailViaSES($name, $email, $city, $state, $source, $accessKey, $secretKey, $region) {
    try {
        // Create email content
        $subject = 'SmartWheelers Contact Form Submission';
        $htmlBody = "
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>City:</strong> $city</p>
            <p><strong>State:</strong> $state</p>
            <p><strong>How they heard about us:</strong> $source</p>
            <p><strong>Submitted on:</strong> " . date('Y-m-d H:i:s') . "</p>
            <hr>
            <p><em>This email was automatically sent from the SmartWheelers contact form.</em></p>
        ";
        
        $textBody = "
            New Contact Form Submission
            
            Name: $name
            Email: $email
            City: $city
            State: $state
            How they heard about us: $source
            Submitted on: " . date('Y-m-d H:i:s') . "
            
            This email was automatically sent from the SmartWheelers contact form.
        ";
        
        // AWS SES API endpoint
        $endpoint = "https://email.$region.amazonaws.com";
        
        // Prepare the request
        $requestData = [
            'Source' => getenv('FROM_EMAIL') ?: 'noreply@smartwheelers.com',
            'Destination' => [
                'ToAddresses' => [getenv('ADMIN_EMAIL') ?: 'admin@smartwheelers.com']
            ],
            'Message' => [
                'Subject' => [
                    'Data' => $subject,
                    'Charset' => 'UTF-8'
                ],
                'Body' => [
                    'Text' => [
                        'Data' => $textBody,
                        'Charset' => 'UTF-8'
                    ],
                    'Html' => [
                        'Data' => $htmlBody,
                        'Charset' => 'UTF-8'
                    ]
                ]
            ]
        ];
        
        // Create the request
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $endpoint);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-amz-json-1.0',
            'X-Amz-Target: AmazonSES.SendEmail',
            'X-Amz-Date: ' . gmdate('Ymd\THis\Z')
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        // AWS Signature V4
        $date = gmdate('Ymd');
        $datetime = gmdate('Ymd\THis\Z');
        
        // Create canonical request
        $canonicalRequest = "POST\n";
        $canonicalRequest .= "/\n";
        $canonicalRequest .= "\n";
        $canonicalRequest .= "content-type:application/x-amz-json-1.0\n";
        $canonicalRequest .= "x-amz-date:$datetime\n";
        $canonicalRequest .= "x-amz-target:AmazonSES.SendEmail\n";
        $canonicalRequest .= "\n";
        $canonicalRequest .= "content-type;x-amz-date;x-amz-target\n";
        $canonicalRequest .= hash('sha256', json_encode($requestData));
        
        // Create string to sign
        $stringToSign = "AWS4-HMAC-SHA256\n";
        $stringToSign .= "$datetime\n";
        $stringToSign .= "$date/$region/ses/aws4_request\n";
        $stringToSign .= hash('sha256', $canonicalRequest);
        
        // Calculate signature
        $kDate = hash_hmac('sha256', $date, 'AWS4' . $secretKey, true);
        $kRegion = hash_hmac('sha256', $region, $kDate, true);
        $kService = hash_hmac('sha256', 'ses', $kRegion, true);
        $kSigning = hash_hmac('sha256', 'aws4_request', $kService, true);
        $signature = hash_hmac('sha256', $stringToSign, $kSigning);
        
        // Add authorization header
        $authorization = "AWS4-HMAC-SHA256 Credential=$accessKey/$date/$region/ses/aws4_request,SignedHeaders=content-type;x-amz-date;x-amz-target,Signature=$signature";
        
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-amz-json-1.0',
            'X-Amz-Target: AmazonSES.SendEmail',
            'X-Amz-Date: ' . $datetime,
            'Authorization: ' . $authorization
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            // Log successful SES email
            file_put_contents('/var/log/smartwheelers-contact.log', "✅ Email sent successfully via AWS SES\n", FILE_APPEND | LOCK_EX);
            return true;
        } else {
            // Log SES error
            file_put_contents('/var/log/smartwheelers-contact.log', "❌ AWS SES failed: HTTP $httpCode - $response\n", FILE_APPEND | LOCK_EX);
            return false;
        }
        
    } catch (Exception $e) {
        // Log exception
        file_put_contents('/var/log/smartwheelers-contact.log', "❌ AWS SES Exception: " . $e->getMessage() . "\n", FILE_APPEND | LOCK_EX);
        return false;
    }
}

// Function to send email via basic mail() function (fallback)
function sendEmailViaMail($name, $email, $city, $state, $source) {
    try {
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
        
        $to = getenv('ADMIN_EMAIL') ?: 'admin@smartwheelers.com';
        $sent = mail($to, $subject, $message, $headers);
        
        if ($sent) {
            file_put_contents('/var/log/smartwheelers-contact.log', "✅ Email sent successfully via basic mail()\n", FILE_APPEND | LOCK_EX);
            return true;
        } else {
            file_put_contents('/var/log/smartwheelers-contact.log', "❌ Basic mail() failed\n", FILE_APPEND | LOCK_EX);
            return false;
        }
        
    } catch (Exception $e) {
        file_put_contents('/var/log/smartwheelers-contact.log', "❌ Basic mail() Exception: " . $e->getMessage() . "\n", FILE_APPEND | LOCK_EX);
        return false;
    }
}
?>

