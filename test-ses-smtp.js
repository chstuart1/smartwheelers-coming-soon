const nodemailer = require('nodemailer');

// AWS SES SMTP configuration
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

async function testSESSMTP() {
    console.log('🧪 AWS SES SMTP Test');
    console.log('====================');
    console.log('Host: email-smtp.us-east-1.amazonaws.com:587');
    console.log('User: AKIAYAF3XLFNEI7F2A7Y');
console.log('Password: BCLIWCPD8AFnN2xPVJSzGQCIOxxqr32DIoDDqRL1ryKX');
    console.log('');

    try {
        console.log('📧 Creating SES SMTP transporter...');
        const transporter = nodemailer.createTransport(sesConfig);
        
        console.log('📧 Attempting to send test email...');
        
        const info = await transporter.sendMail({
            from: 'admin@smartwheelers.com',
            to: 'admin@smartwheelers.com',
            subject: '🧪 SmartWheelers SES Test',
            html: `
                <h2>SES Email Test Successful!</h2>
                <p>This is a test email sent via AWS SES to verify the SmartWheelers contact form email system.</p>
                <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Service:</strong> AWS SES</p>
                <p><strong>Server:</strong> Local Development</p>
                <hr>
                <p><em>If you receive this email, the contact form will work properly!</em></p>
            `
        });

        console.log('✅ SES test email sent successfully!');
        console.log(`📧 Message ID: ${info.messageId}`);
        console.log('');
        console.log('🎉 SES email system is working correctly!');
        console.log('📧 Check admin@smartwheelers.com for the test email.');
        
    } catch (error) {
        console.log('❌ SES email test failed:');
        console.log(`Error: ${error.message}`);
        console.log('');
        console.log('🔧 Troubleshooting:');
        console.log('1. Verify admin@smartwheelers.com in AWS SES console');
        console.log('2. Check if SES is out of sandbox mode');
        console.log('3. Verify SMTP credentials are correct');
        console.log('4. Check if your AWS account has SES permissions');
        console.log('');
        console.log('📧 To verify admin@smartwheelers.com:');
        console.log('1. Go to AWS SES Console: https://console.aws.amazon.com/ses/');
        console.log('2. Select us-east-1 region');
        console.log('3. Go to "Verified identities"');
        console.log('4. Click "Create identity" → "Email address"');
        console.log('5. Enter: admin@smartwheelers.com');
        console.log('6. Check your email and click verification link');
    }
}

// Run the test
testSESSMTP();
