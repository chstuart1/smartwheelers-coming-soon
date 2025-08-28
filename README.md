# SmartWheelers Coming Soon Page

A beautiful, mobile-responsive coming soon page with a working contact form for SmartWheelers.

## 🚀 Production Ready

This project is **ready for EC2 deployment** with the following features:

### ✅ Completed Features
- **Coming Soon Page**: Beautiful countdown timer and branding
- **Contact Form**: Fully functional with email submission
- **Mobile Responsive**: Optimized for all device sizes
- **Email Integration**: AWS SES email sending to admin@smartwheelers.com
- **Form Validation**: Client and server-side validation
- **Character Limit**: 150-character limit for "Other" field
- **Production Server**: Node.js server ready for deployment

### 📧 Email Configuration
- **Service**: AWS SES
- **Recipient**: admin@smartwheelers.com
- **Credentials**: Configured and tested
- **Status**: ✅ Working locally

### 📱 Mobile Features
- Responsive design for all screen sizes
- Touch-friendly form inputs
- Optimized typography and spacing
- Fast loading and performance

## 🛠️ Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set Environment Variables**:
   Create a `.env` file with:
   ```env
   SES_SMTP_USER=AKIAYAF3XLFNEI7F2A7Y
   SES_SMTP_PASS=BCLIWCPD8AFnN2xPVJSzGQCIOxxqr32DIoDDqRL1ryKX
   SES_SMTP_HOST=email-smtp.us-east-1.amazonaws.com
   SES_SMTP_PORT=587
   FROM_EMAIL=admin@smartwheelers.com
   PORT=3001
   AWS_REGION=us-east-1
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Access Pages**:
   - Main page: http://localhost:3001
   - Contact form: http://localhost:3001/contact

## 🚀 EC2 Deployment

See `DEPLOYMENT.md` for complete EC2 deployment instructions.

### Quick Deployment Steps:
1. Clone repository to EC2
2. Install dependencies: `npm install`
3. Create `.env` file with production credentials
4. Start server: `npm start`
5. Configure Nginx (if needed)

## 📁 Project Structure

```
coming-soon-only/
├── server.js              # Production Node.js server
├── package.json           # Dependencies and scripts
├── smart_wheelers.html    # Main coming soon page
├── contact.html          # Contact form page
├── DEPLOYMENT.md         # EC2 deployment guide
├── README.md             # This file
└── .env                  # Environment variables (create locally)
```

## 🎯 Ready for Production

**Status**: ✅ **READY FOR EC2 DEPLOYMENT**

All features are implemented, tested, and ready for production deployment to your EC2 server.

### Final Checklist:
- [x] Coming soon page with countdown timer
- [x] Contact form with all required fields
- [x] Email submission to admin@smartwheelers.com
- [x] Mobile-responsive design
- [x] Form validation and error handling
- [x] "Other" field with 150-character limit
- [x] Production server configuration
- [x] AWS SES email integration
- [x] Deployment documentation

**Next Step**: Deploy to EC2 using the instructions in `DEPLOYMENT.md`
