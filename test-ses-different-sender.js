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

async function testDifferentSenders() {
    console.log('🧪 Testing Different Sender Addresses');
    console.log('=====================================');
    console.log('SMTP User: AKIAYAF3XLFNEI7F2A7Y');
console.log('SMTP Pass: BCLIWCPD8AFnN2xPVJSzGQCIOxxqr32DIoDDqRL1ryKX');
    console.log('');

    const transporter = nodemailer.createTransport(sesConfig);

    // Test different sender addresses
    const testSenders = [
        'noreply@smartwheelers.com',
        'info@smartwheelers.com',
        'contact@smartwheelers.com',
        'ses-smtp-user.20250826-115505@smartwheelers.com',
        'admin@smartwheelers.com'
    ];

    for (let i = 0; i < testSenders.length; i++) {
        const sender = testSenders[i];
        try {
            console.log(`📧 Test ${i + 1}: Using sender "${sender}"...`);
            const info = await transporter.sendMail({
                from: sender,
                to: 'admin@smartwheelers.com',
                subject: `🧪 SES Test ${i + 1} - ${sender}`,
                html: `
                    <h2>SES Email Test ${i + 1}</h2>
                    <p>Sender: ${sender}</p>
                    <p>Time: ${new Date().toLocaleString()}</p>
                    <p>If you receive this, the sender address works!</p>
                `
            });
            console.log(`✅ Test ${i + 1} SUCCESS!`);
            console.log(`📧 Message ID: ${info.messageId}`);
            console.log(`🎉 Sender "${sender}" works!`);
            break; // Stop testing if one works
        } catch (error) {
            console.log(`❌ Test ${i + 1} FAILED:`);
            console.log(`   Error: ${error.message}`);
        }
        console.log('');
    }

    console.log('🔧 If all tests failed:');
    console.log('1. The SMTP credentials might be incorrect');
    console.log('2. No sender addresses are verified in SES');
    console.log('3. SES might be in sandbox mode');
    console.log('4. Check AWS SES console for verified identities');
}

// Run the test
testDifferentSenders();
