const { SESClient, GetSendQuotaCommand, ListVerifiedEmailAddressesCommand, VerifyEmailIdentityCommand } = require('@aws-sdk/client-ses');

// AWS SES client configuration
const sesClient = new SESClient({
    region: 'us-east-1' // Make sure this matches your SES region
});

async function checkAWSSES() {
    console.log('🔍 AWS SES Configuration Check');
    console.log('================================');
    console.log('Region: us-east-1');
    console.log('');

    try {
        // Check SES quota
        console.log('📊 Checking SES quota...');
        const quotaCommand = new GetSendQuotaCommand({});
        const quotaResponse = await sesClient.send(quotaCommand);
        
        console.log('✅ SES Quota Information:');
        console.log(`   Max 24 Hour Send: ${quotaResponse.Max24HourSend}`);
        console.log(`   Max Send Rate: ${quotaResponse.MaxSendRate}`);
        console.log(`   Sent Last 24 Hours: ${quotaResponse.SentLast24Hours}`);
        console.log('');

        // Check verified email addresses
        console.log('📧 Checking verified email addresses...');
        const listCommand = new ListVerifiedEmailAddressesCommand({});
        const listResponse = await sesClient.send(listCommand);
        
        if (listResponse.VerifiedEmailAddresses && listResponse.VerifiedEmailAddresses.length > 0) {
            console.log('✅ Verified Email Addresses:');
            listResponse.VerifiedEmailAddresses.forEach(email => {
                console.log(`   - ${email}`);
            });
        } else {
            console.log('❌ No verified email addresses found');
        }
        console.log('');

        // Check if admin@smartwheelers.com is verified
        const adminEmail = 'admin@smartwheelers.com';
        const isVerified = listResponse.VerifiedEmailAddresses && 
                          listResponse.VerifiedEmailAddresses.includes(adminEmail);
        
        if (isVerified) {
            console.log(`✅ ${adminEmail} is verified and ready to receive emails`);
        } else {
            console.log(`❌ ${adminEmail} is NOT verified`);
            console.log('');
            console.log('🔧 To verify admin@smartwheelers.com:');
            console.log('1. Run: aws ses verify-email-identity --email-address admin@smartwheelers.com');
            console.log('2. Check your email for verification link');
            console.log('3. Click the verification link');
        }

    } catch (error) {
        console.log('❌ Error checking AWS SES:');
        console.log(`Error: ${error.message}`);
        console.log('');
        console.log('🔧 Troubleshooting:');
        console.log('1. Check if AWS CLI is configured correctly');
        console.log('2. Verify your AWS access key and secret key');
        console.log('3. Check if SES is available in us-east-1 region');
        console.log('4. Ensure your AWS account has SES permissions');
    }
}

// Run the check
checkAWSSES();
