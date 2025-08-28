const nodemailer = require('nodemailer');

// GoDaddy email configuration
const godaddyConfig = {
    host: 'smtpout.secureserver.net', // GoDaddy SMTP server
    port: 587,
    secure: false,
    auth: {
        user: 'YOUR_GODADDY_EMAIL@yourdomain.com', // Replace with your GoDaddy email
        pass: 'YOUR_GODADDY_PASSWORD'              // Replace with your GoDaddy password
    },
    tls: {
        rejectUnauthorized: false
    }
};

async function testGoDaddyEmail() {
    console.log('🧪 GoDaddy Email Test');
    console.log('=====================');
    console.log('Service: GoDaddy Email');
    console.log('Host: smtpout.secureserver.net:587');
    console.log('User: YOUR_GODADDY_EMAIL@yourdomain.com (replace with your email)');
    console.log('Password: YOUR_GODADDY_PASSWORD (replace with your password)');
    console.log('');

    try {
        console.log('📧 Creating GoDaddy transporter...');
        const transporter = nodemailer.createTransport(godaddyConfig);
        
        console.log('📧 Attempting to send test email...');
        
        const info = await transporter.sendMail({
            from: 'YOUR_GODADDY_EMAIL@yourdomain.com', // Replace with your GoDaddy email
            to: 'admin@smartwheelers.com',
            subject: '🧪 SmartWheelers GoDaddy Email Test',
            html: `
                <h2>GoDaddy Email Test Successful!</h2>
                <p>This is a test email sent via GoDaddy to verify the SmartWheelers contact form email system.</p>
                <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Service:</strong> GoDaddy Email</p>
                <p><strong>Server:</strong> Local Development</p>
                <hr>
                <p><em>If you receive this email, the contact form will work properly!</em></p>
            `
        });

        console.log('✅ GoDaddy test email sent successfully!');
        console.log(`📧 Message ID: ${info.messageId}`);
        console.log('');
        console.log('🎉 GoDaddy email system is working correctly!');
        console.log('📧 Check admin@smartwheelers.com for the test email.');
        
    } catch (error) {
        console.log('❌ GoDaddy email test failed:');
        console.log(`Error: ${error.message}`);
        console.log('');
        console.log('🔧 GoDaddy Setup Instructions:');
        console.log('1. Replace YOUR_GODADDY_EMAIL@yourdomain.com with your actual GoDaddy email');
        console.log('2. Replace YOUR_GODADDY_PASSWORD with your GoDaddy email password');
        console.log('3. Make sure your GoDaddy email account is active');
        console.log('4. Check if your GoDaddy plan includes email services');
    }
}

// Run the test
testGoDaddyEmail();
