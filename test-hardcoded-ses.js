const nodemailer = require('nodemailer');

// AWS SES SMTP configuration with hardcoded credentials
const sesConfig = {
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
        user: 'AKIAYAF3XLFNEI7F2A7Y',
        pass: 'BCLIWCPD8AFnN2xPVJSzGQCIOxxqr32DIoDDqRL1ryKX'
    },
    tls: {
        rejectUnauthorized: false
    }
};

async function testHardcodedSES() {
    console.log('🧪 Hardcoded AWS SES Test');
    console.log('==========================');
    console.log('SMTP User: AKIAYAF3XLFNEI7F2A7Y');
console.log('SMTP Pass: BCLIWCPD8AFnN2xPVJSzGQCIOxxqr32DIoDDqRL1ryKX');
    console.log('SMTP Host: email-smtp.us-east-1.amazonaws.com:587');
    console.log('');

    try {
        console.log('📧 Creating SES SMTP transporter...');
        const transporter = nodemailer.createTransport(sesConfig);
        
        console.log('📧 Attempting to send test email...');
        
        const info = await transporter.sendMail({
            from: 'admin@smartwheelers.com',
            to: 'admin@smartwheelers.com',
            subject: '🧪 SmartWheelers Hardcoded SES Test',
            html: `
                <h2>Hardcoded SES Email Test</h2>
                <p>This is a test email sent via AWS SES with hardcoded credentials.</p>
                <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Service:</strong> AWS SES</p>
                <p><strong>Server:</strong> Local Development</p>
                <hr>
                <p><em>If you receive this email, the contact form will work properly!</em></p>
            `
        });

        console.log('✅ Hardcoded SES test email sent successfully!');
        console.log(`📧 Message ID: ${info.messageId}`);
        console.log('');
        console.log('🎉 SES email system is working correctly!');
        console.log('📧 Check admin@smartwheelers.com for the test email.');
        console.log('');
        console.log('🚀 Ready to test the contact form!');
        
    } catch (error) {
        console.log('❌ Hardcoded SES email test failed:');
        console.log(`Error: ${error.message}`);
        console.log('');
        console.log('🔧 This confirms the SMTP credentials are invalid.');
        console.log('Please check your AWS SES console for the correct credentials.');
    }
}

// Run the test
testHardcodedSES();
