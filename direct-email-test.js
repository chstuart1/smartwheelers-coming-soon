const nodemailer = require('nodemailer');

// Direct test with hardcoded credentials
const testEmailConfig = {
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
        user: 'ses-smtp-user.20250826-115505',
        pass: 'BDzigvzHbxquKjGnB0CT4aZlbI25yVQA1uiYpPypLdYf'
    },
    tls: {
        rejectUnauthorized: false
    }
};

async function testEmailSending() {
    console.log('🧪 Direct Email Test with Hardcoded Credentials');
    console.log('================================================');
    console.log('User: ses-smtp-user.20250826-115505');
    console.log('Password: BDzigvzHbxquKjGnB0CT4aZlbI25yVQA1uiYpPypLdYf');
    console.log('Host: email-smtp.us-east-1.amazonaws.com:587');
    console.log('');

    try {
        console.log('📧 Creating email transporter...');
        const transporter = nodemailer.createTransport(testEmailConfig);
        
        console.log('📧 Attempting to send test email...');
        
        const info = await transporter.sendMail({
            from: 'Admin@SmartWheelers.com',
            to: 'admin@smartwheelers.com',
            subject: '🧪 SmartWheelers Direct Email Test',
            html: `
                <h2>Direct Email Test Successful!</h2>
                <p>This is a direct test email to verify that the SmartWheelers contact form email system is working correctly.</p>
                <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Server:</strong> Local Development</p>
                <p><strong>Method:</strong> Direct hardcoded credentials</p>
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
        console.log('🔧 Possible issues:');
        console.log('1. AWS SES sandbox mode - admin@smartwheelers.com not verified');
        console.log('2. SES not out of sandbox mode');
        console.log('3. Network connectivity issues');
        console.log('4. AWS SES service issues');
    }
}

// Run the test
testEmailSending();
