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

async function testSESSimple() {
    console.log('🧪 Simple AWS SES Test');
    console.log('======================');
    console.log('Testing different sender addresses...');
    console.log('');

    const transporter = nodemailer.createTransport(sesConfig);

    // Test 1: Try with a generic sender
    try {
        console.log('📧 Test 1: Using generic sender...');
        const info1 = await transporter.sendMail({
            from: 'noreply@smartwheelers.com',
            to: 'admin@smartwheelers.com',
            subject: '🧪 SES Test 1 - Generic Sender',
            html: '<h2>Test email from SES</h2><p>This is a test.</p>'
        });
        console.log('✅ Test 1 SUCCESS!');
        console.log(`📧 Message ID: ${info1.messageId}`);
    } catch (error1) {
        console.log('❌ Test 1 FAILED:');
        console.log(`   Error: ${error1.message}`);
    }
    console.log('');

    // Test 2: Try with the SMTP username as sender
    try {
        console.log('📧 Test 2: Using SMTP username as sender...');
        const info2 = await transporter.sendMail({
            from: 'ses-smtp-user.20250826-115505@smartwheelers.com',
            to: 'admin@smartwheelers.com',
            subject: '🧪 SES Test 2 - SMTP Username Sender',
            html: '<h2>Test email from SES</h2><p>This is a test.</p>'
        });
        console.log('✅ Test 2 SUCCESS!');
        console.log(`📧 Message ID: ${info2.messageId}`);
    } catch (error2) {
        console.log('❌ Test 2 FAILED:');
        console.log(`   Error: ${error2.message}`);
    }
    console.log('');

    // Test 3: Try with admin@smartwheelers.com as sender
    try {
        console.log('📧 Test 3: Using admin@smartwheelers.com as sender...');
        const info3 = await transporter.sendMail({
            from: 'admin@smartwheelers.com',
            to: 'admin@smartwheelers.com',
            subject: '🧪 SES Test 3 - Admin Sender',
            html: '<h2>Test email from SES</h2><p>This is a test.</p>'
        });
        console.log('✅ Test 3 SUCCESS!');
        console.log(`📧 Message ID: ${info3.messageId}`);
    } catch (error3) {
        console.log('❌ Test 3 FAILED:');
        console.log(`   Error: ${error3.message}`);
    }
    console.log('');

    console.log('🔧 Next Steps:');
    console.log('1. If any test succeeds, we know the credentials work');
    console.log('2. If all fail, the SMTP credentials are invalid');
    console.log('3. Check your AWS SES console for current SMTP credentials');
}

// Run the test
testSESSimple();
