const nodemailer = require('nodemailer');

// Load environment variables
require('dotenv').config();

// AWS SES SMTP configuration using environment variables
const sesConfig = {
    host: process.env.SES_SMTP_HOST || 'email-smtp.us-east-1.amazonaws.com',
    port: parseInt(process.env.SES_SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SES_SMTP_USER || 'ses-smtp-user.20250826-115505',
        pass: process.env.SES_SMTP_PASS || '_zU$3_O#'
    },
    tls: {
        rejectUnauthorized: false
    }
};

async function testFinalSES() {
    console.log('🧪 Final AWS SES Test');
    console.log('=====================');
    console.log('Environment Variables:');
    console.log(`SES_SMTP_USER: ${process.env.SES_SMTP_USER || 'NOT SET'}`);
    console.log(`SES_SMTP_PASS: ${process.env.SES_SMTP_PASS ? 'SET' : 'NOT SET'}`);
    console.log(`SES_SMTP_HOST: ${process.env.SES_SMTP_HOST || 'NOT SET'}`);
    console.log(`SES_SMTP_PORT: ${process.env.SES_SMTP_PORT || 'NOT SET'}`);
    console.log(`FROM_EMAIL: ${process.env.FROM_EMAIL || 'NOT SET'}`);
    console.log('');

    try {
        console.log('📧 Creating SES SMTP transporter...');
        const transporter = nodemailer.createTransport(sesConfig);
        
        console.log('📧 Attempting to send test email...');
        
        const info = await transporter.sendMail({
            from: process.env.FROM_EMAIL || 'admin@smartwheelers.com',
            to: 'admin@smartwheelers.com',
            subject: '🧪 SmartWheelers Final SES Test',
            html: `
                <h2>Final SES Email Test</h2>
                <p>This is the final test email to verify the SmartWheelers contact form email system.</p>
                <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Service:</strong> AWS SES</p>
                <p><strong>Server:</strong> Local Development</p>
                <p><strong>From:</strong> ${process.env.FROM_EMAIL || 'admin@smartwheelers.com'}</p>
                <hr>
                <p><em>If you receive this email, the contact form will work properly!</em></p>
            `
        });

        console.log('✅ Final SES test email sent successfully!');
        console.log(`📧 Message ID: ${info.messageId}`);
        console.log('');
        console.log('🎉 SES email system is working correctly!');
        console.log('📧 Check admin@smartwheelers.com for the test email.');
        console.log('');
        console.log('🚀 Ready to test the contact form!');
        
    } catch (error) {
        console.log('❌ Final SES email test failed:');
        console.log(`Error: ${error.message}`);
        console.log('');
        console.log('🔧 Troubleshooting:');
        console.log('1. Check if environment variables are loaded correctly');
        console.log('2. Verify SES SMTP credentials in AWS console');
        console.log('3. Check if admin@smartwheelers.com is verified in SES');
        console.log('4. Ensure SES is not in sandbox mode');
    }
}

// Run the test
testFinalSES();
