const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Create AWS SES client
const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1'
});

// Create email transporter using AWS SES
const createEmailTransporter = () => {
    try {
        // Check if we have SES SMTP credentials
        if (process.env.SES_SMTP_USER && process.env.SES_SMTP_PASS) {
            return nodemailer.createTransport({
                host: process.env.SES_SMTP_HOST || 'email-smtp.us-east-1.amazonaws.com',
                port: parseInt(process.env.SES_SMTP_PORT) || 587,
                secure: false,
                auth: {
                    user: process.env.SES_SMTP_USER,
                    pass: process.env.SES_SMTP_PASS
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
        }
        return null;
    } catch (error) {
        console.error('❌ Error creating email transporter:', error);
        return null;
    }
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, city, state, source } = req.body;

        // Validate required fields
        if (!name || !email || !city || !state || !source) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Please enter a valid email address' });
        }

        // Log the submission
        console.log('📧 Contact Form Submission:');
        console.log(`   Name: ${name}`);
        console.log(`   Email: ${email}`);
        console.log(`   City: ${city}`);
        console.log(`   State: ${state}`);
        console.log(`   Source: ${source}`);
        console.log(`   Submitted: ${new Date().toLocaleString()}`);

        // Try to send email using AWS SES
        const transporter = createEmailTransporter();
        
        if (transporter) {
            const mailOptions = {
                from: process.env.FROM_EMAIL || 'admin@smartwheelers.com',
                to: 'admin@smartwheelers.com',
                subject: 'SmartWheelers Contact Form Submission',
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>City:</strong> ${city}</p>
                    <p><strong>State:</strong> ${state}</p>
                    <p><strong>How they heard about us:</strong> ${source}</p>
                    <p><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
                    <hr>
                    <p><em>This email was automatically sent from the SmartWheelers contact form.</em></p>
                `
            };

            await transporter.sendMail(mailOptions);
            console.log('✅ Email sent successfully to admin@smartwheelers.com');
        } else {
            console.log('⚠️ Email transporter not available - check AWS credentials');
        }

        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('❌ Error processing submission:', error);
        res.status(500).json({ error: 'Failed to process submission' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'smart_wheelers.html'));
});

// Serve contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 SmartWheelers Coming Soon server running on port ${PORT}`);
    console.log(`📄 Main page: http://localhost:${PORT}`);
    console.log(`📝 Contact page: http://localhost:${PORT}/contact`);
    console.log('📧 Email sending enabled via AWS SES');
    console.log('📧 Emails will be sent to: admin@smartwheelers.com');
});
