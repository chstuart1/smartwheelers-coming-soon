const nodemailer = require('nodemailer');

// Use the same configuration as your backend
const backendEmailConfig = {
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
        user: 'ses-smtp-user.20250826-115505',
        pass: 'BDzigvzHbxquKjGnB0CT4aZlbI25yVQA1uiYpPypLdYf'
    },
    tls: {
        rejectUnauthorized: false
    },
    debug: false,
    logger: false
};

async function testBackendEmail() {
    console.log('🧪 Backend Email Configuration Test');
    console.log('===================================');
    console.log('Using same config as your backend');
    console.log('SMTP User: ses-smtp-user.20250826-115505');
    console.log('SMTP Pass: BDzigvzHbxquKjGnB0CT4aZlbI25yVQA1uiYpPypLdYf');
    console.log('');

    try {
        console.log('📧 Creating email transporter...');
        const transporter = nodemailer.createTransport(backendEmailConfig);
        
        console.log('📧 Attempting to send test email...');
        
        const info = await transporter.sendMail({
            from: 'Admin@SmartWheelers.com', // Same as your backend
            to: 'admin@smartwheelers.com',
            subject: '🧪 SmartWheelers Backend Email Test',
            html: `
                <h2>Backend Email Test</h2>
                <p>This is a test email using the same configuration as your backend.</p>
                <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Service:</strong> AWS SES</p>
                <p><strong>Server:</strong> Local Development</p>
                <hr>
                <p><em>If you receive this email, the contact form will work properly!</em></p>
            `
        });

        console.log('✅ Backend email test sent successfully!');
        console.log(`📧 Message ID: ${info.messageId}`);
        console.log('');
        console.log('🎉 Email system is working correctly!');
        console.log('📧 Check admin@smartwheelers.com for the test email.');
        
    } catch (error) {
        console.log('❌ Backend email test failed:');
        console.log(`Error: ${error.message}`);
        console.log('');
        console.log('🔧 This suggests the credentials might be incorrect.');
        console.log('Please check your backend .env file for the correct credentials.');
    }
}

// Run the test
testBackendEmail();
