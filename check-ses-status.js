const { SESClient, GetAccountSendingEnabledCommand } = require('@aws-sdk/client-ses');

// AWS SES client configuration
const sesClient = new SESClient({
    region: 'us-east-1'
});

async function checkSESStatus() {
    console.log('🔍 AWS SES Account Status Check');
    console.log('================================');
    console.log('Region: us-east-1');
    console.log('');

    try {
        // Check if account sending is enabled
        console.log('📊 Checking account sending status...');
        const command = new GetAccountSendingEnabledCommand({});
        const response = await sesClient.send(command);
        
        console.log('✅ Account Sending Status:');
        console.log(`   Sending Enabled: ${response.SendingEnabled}`);
        console.log('');
        
        if (response.SendingEnabled) {
            console.log('🎉 Your SES account is OUT of sandbox mode!');
            console.log('✅ You can send emails to any verified address');
        } else {
            console.log('⚠️ Your SES account is IN sandbox mode');
            console.log('📧 You can only send emails to verified addresses');
            console.log('');
            console.log('🔧 To get out of sandbox mode:');
            console.log('1. Go to SES Console → Account dashboard');
            console.log('2. Click "Request production access"');
            console.log('3. Fill out the form explaining your use case');
        }

    } catch (error) {
        console.log('❌ Error checking SES status:');
        console.log(`Error: ${error.message}`);
        console.log('');
        console.log('🔧 This usually means:');
        console.log('1. Your AWS user lacks SES permissions');
        console.log('2. SES is not available in this region');
        console.log('3. AWS credentials are not configured correctly');
    }
}

// Run the check
checkSESStatus();
