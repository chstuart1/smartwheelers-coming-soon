const nodemailer = require('nodemailer');

// Gmail configuration
const gmailConfig = {
    service: 'gmail',
    auth: {
        user: 'chstuartsr@gmail.com',
        pass: 'Chs8675309'
    }
};

async function testGmailEmail() {
    console.log('🧪 Gmail Email Test');
    console.log('===================');
            console.log('Service: Gmail');
        console.log('User: chstuartsr@gmail.com');
        console.log('Password: Chs8675309');
    console.log('');

    try {
        console.log('📧 Creating Gmail transporter...');
        const transporter = nodemailer.createTransport(gmailConfig);
        
        console.log('📧 Attempting to send test email...');
        
        const info = await transporter.sendMail({
            from: 'chstuartsr@gmail.com',
            to: 'admin@smartwheelers.com',
            subject: '🧪 SmartWheelers Gmail Test',
            html: `
                <h2>Gmail Email Test Successful!</h2>
                <p>This is a test email sent via Gmail to verify the SmartWheelers contact form email system.</p>
                <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Service:</strong> Gmail</p>
                <p><strong>Server:</strong> Local Development</p>
                <hr>
                <p><em>If you receive this email, the contact form will work properly!</em></p>
            `
        });

        console.log('✅ Gmail test email sent successfully!');
        console.log(`📧 Message ID: ${info.messageId}`);
        console.log('');
        console.log('🎉 Gmail email system is working correctly!');
        console.log('📧 Check admin@smartwheelers.com for the test email.');
        
    } catch (error) {
        console.log('❌ Gmail email test failed:');
        console.log(`Error: ${error.message}`);
        console.log('');
        console.log('🔧 Gmail Setup Instructions:');
        console.log('1. Check if Gmail "Less secure app access" is enabled');
        console.log('2. Or enable 2-Factor Authentication and use app password');
        console.log('3. Verify the email and password are correct');
        console.log('4. Check Gmail account settings for any security restrictions');
    }
}

// Run the test
testGmailEmail();
