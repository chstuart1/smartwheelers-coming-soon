# SmartWheelers Coming Soon - EC2 Deployment Guide

## Production Deployment Checklist

### ✅ Pre-Deployment Requirements

1. **Server File**: ✅ `server.js` is production-ready
2. **Package.json**: ✅ Dependencies are correct
3. **Environment Variables**: Need to be set on EC2
4. **Port Configuration**: Server runs on port 3001
5. **Static Files**: HTML files are ready

### 🔧 EC2 Environment Setup

Create a `.env` file on your EC2 server with these variables:

```env
# AWS SES Configuration
SES_SMTP_USER=AKIAYAF3XLFNEI7F2A7Y
SES_SMTP_PASS=BCLIWCPD8AFnN2xPVJSzGQCIOxxqr32DIoDDqRL1ryKX
SES_SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SES_SMTP_PORT=587

# Email Settings
FROM_EMAIL=admin@smartwheelers.com

# Server Configuration
PORT=3001

# AWS Region
AWS_REGION=us-east-1
```

### 🚀 Deployment Steps

1. **Clone Repository**:
   ```bash
   git clone https://github.com/chstuart1/smartwheelers-coming-soon.git
   cd smartwheelers-coming-soon
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Environment Variables**:
   ```bash
   # Create .env file with the variables above
   nano .env
   ```

4. **Start Production Server**:
   ```bash
   npm start
   ```

5. **Configure Nginx** (if needed):
   - Point to port 3001
   - Serve static files from the directory

### 📁 File Structure

```
coming-soon-only/
├── server.js              # Production server
├── package.json           # Dependencies
├── smart_wheelers.html    # Main coming soon page
├── contact.html          # Contact form
├── .env                  # Environment variables (create on EC2)
└── DEPLOYMENT.md         # This file
```

### 🔍 Testing Checklist

- [ ] Main page loads correctly
- [ ] Contact form is accessible
- [ ] Form submission works
- [ ] Emails are sent to admin@smartwheelers.com
- [ ] Mobile responsiveness works
- [ ] "Other" field with 150-character limit works

### 🛠️ Troubleshooting

**Email Not Sending**:
- Check AWS SES credentials in `.env`
- Verify admin@smartwheelers.com is verified in AWS SES
- Check server logs for error messages

**Port Issues**:
- Ensure port 3001 is open in EC2 security group
- Check if another process is using the port

**Static Files Not Loading**:
- Verify file permissions on EC2
- Check Nginx configuration if using reverse proxy

### 📧 Email Configuration

The server uses AWS SES with these credentials:
- **SMTP User**: AKIAYAF3XLFNEI7F2A7Y
- **SMTP Pass**: BCLIWCPD8AFnN2xPVJSzGQCIOxxqr32DIoDDqRL1ryKX
- **Host**: email-smtp.us-east-1.amazonaws.com
- **Port**: 587

### 🎯 Ready for Production

The coming soon page and contact form are now ready for EC2 deployment with:
- ✅ Mobile-responsive design
- ✅ Working email functionality
- ✅ Form validation
- ✅ Character limit for "Other" field
- ✅ Production-ready server configuration
