# Start Local Test Server for SmartWheelers Coming Soon Page
Write-Host "Starting Local Test Server..." -ForegroundColor Green

# Set environment variables for testing
$env:EMAIL_USER = "test@example.com"
$env:EMAIL_PASS = "test-password"
$env:PORT = "3000"

Write-Host "Environment variables set for testing" -ForegroundColor Yellow
Write-Host "Email will be sent to: admin@smartwheelers.com" -ForegroundColor Cyan
Write-Host "Note: Email sending will be simulated in test mode" -ForegroundColor Yellow

# Start the server
Write-Host "Starting server on http://localhost:3000" -ForegroundColor Green
npm start
