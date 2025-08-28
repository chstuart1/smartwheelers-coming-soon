const nodemailer = require('nodemailer');

// Test different credential formats and configurations
const testConfigs = [
    {
        name: "Standard SMTP Configuration",
        config: {
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
        }
    },
    {
        name: "Alternative Port 465 (SSL)",
        config: {
            host: 'email-smtp.us-east-1.amazonaws.com',
            port: 465,
            secure: true,
            auth: {
                user: 'ses-smtp-user.20250826-115505',
                pass: 'BDzigvzHbxquKjGnB0CT4aZlbI25yVQA1uiYpPypLdYf'
            }
        }
    },
    {
        name: "Port 2587 (Alternative)",
        config: {
            host: 'email-smtp.us-east-1.amazonaws.com',
            port: 2587,
            secure: false,
            auth: {
                user: 'ses-smtp-user.20250826-115505',
                pass: 'BDzigvzHbxquKjGnB0CT4aZlbI25yVQA1uiYpPypLdYf'
            },
            tls: {
                rejectUnauthorized: false
            }
        }
    }
];

async function testConfiguration(config, name) {
    console.log(`\n🧪 Testing: ${name}`);
    console.log(`Host: ${config.host}:${config.port}`);
    console.log(`Secure: ${config.secure}`);
    console.log(`User: ${config.auth.user}`);
    
    try {
        const transporter = nodemailer.createTransport(config);
        
        // Test connection without sending email
        await transporter.verify();
        console.log(`✅ ${name}: Connection successful!`);
        return true;
        
    } catch (error) {
        console.log(`❌ ${name}: ${error.message}`);
        return false;
    }
}

async function verifyCredentials() {
    console.log('🔍 AWS SES Credentials Verification');
    console.log('====================================');
    console.log('Testing different SMTP configurations...');
    
    let successCount = 0;
    
    for (const testConfig of testConfigs) {
        const success = await testConfiguration(testConfig.config, testConfig.name);
        if (success) successCount++;
    }
    
    console.log(`\n📊 Results: ${successCount}/${testConfigs.length} configurations successful`);
    
    if (successCount === 0) {
        console.log('\n🔧 Troubleshooting Recommendations:');
        console.log('1. Check if AWS SES credentials are still valid');
        console.log('2. Verify the SES user is active in AWS console');
        console.log('3. Check if SES is in the correct region (us-east-1)');
        console.log('4. Ensure SES is not in sandbox mode (or recipient is verified)');
        console.log('5. Try regenerating SES SMTP credentials');
        console.log('\n📧 To regenerate credentials:');
        console.log('- Go to AWS SES Console');
        console.log('- Navigate to SMTP settings');
        console.log('- Create new SMTP credentials');
    } else {
        console.log('\n✅ At least one configuration works!');
        console.log('The issue might be with the specific port or security settings.');
    }
}

// Run the verification
verifyCredentials();
