const nodemailer = require('nodemailer');

// Test email configuration
const testEmailConfig = {
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER || 'ses-smtp-user.20250826-115505',
        pass: process.env.EMAIL_PASS || 'BDzigvzHbxquKjGnB0CT4aZlbI25yVQA1uiYpPypLdYf'
    },
    tls: {
        rejectUnauthorized: false
    }
};

async function testEmailSending() {
    console.log('🧪 Testing Email Configuration...');
    console.log('=====================================');
    
    // Check environment variables
    console.log('Environment Variables:');
    console.log(`SERVICE: ${process.env.SERVICE || 'NOT SET'}`);
    console.log(`SMTP_HOST: ${process.env.SMTP_HOST || 'NOT SET'}`);
    console.log(`SMTP_PORT: ${process.env.SMTP_PORT || 'NOT SET'}`);
    console.log(`EMAIL_USER: ${process.env.EMAIL_USER || 'NOT SET'}`);
    console.log(`EMAIL_PASS: ${process.env.EMAIL_PASS ? 'SET' : 'NOT SET'}`);
    console.log('');

    try {
        // Create transporter
        const transporter = nodemailer.createTransport(testEmailConfig);
        
        console.log('📧 Attempting to send test email...');
        
        // Send test email
        const info = await transporter.sendMail({
            from: 'Admin@SmartWheelers.com',
            to: 'admin@smartwheelers.com',
            subject: '🧪 SmartWheelers Email Test',
            html: `
                <h2>Email Test Successful!</h2>
                <p>This is a test email to verify that the SmartWheelers contact form email system is working correctly.</p>
                <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Server:</strong> Local Development</p>
                <hr>
                <p><em>If you receive this email, the contact form will work properly!</em></p>
            `
        });

        console.log('✅ Test email sent successfully!');
        console.log(`📧 Message ID: ${info.messageId}`);
        console.log('');
        console.log('🎉 Email system is working correctly!');
        console.log('📧 Check admin@smartwheelers.com for the test email.');
        
    } catch (error) {
        console.log('❌ Email test failed:');
        console.log(`Error: ${error.message}`);
        console.log('');
        console.log('🔧 Troubleshooting:');
        console.log('1. Check if EMAIL_PASS is set correctly');
        console.log('2. Verify AWS SES credentials');
        console.log('3. Check if admin@smartwheelers.com is verified in SES');
        console.log('4. Ensure SES is out of sandbox mode');
    }
}

// Run the test
testEmailSending();
