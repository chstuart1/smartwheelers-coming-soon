#!/bin/bash

# SmartWheelers Coming Soon Page Deployment Script
echo "=== Deploying SmartWheelers Coming Soon Page ==="

# Step 1: Deploy the HTML files
echo "Step 1: Deploying HTML files..."
sudo cp smart_wheelers.html /smart_wheels_code/coming_soon_page/smart_wheelers.html
sudo cp contact.html /smart_wheels_code/coming_soon_page/contact.html

# Step 2: Set proper permissions
echo "Step 2: Setting permissions..."
sudo chown ubuntu:ubuntu /smart_wheels_code/coming_soon_page/smart_wheelers.html
sudo chown ubuntu:ubuntu /smart_wheels_code/coming_soon_page/contact.html
sudo chmod 644 /smart_wheels_code/coming_soon_page/smart_wheelers.html
sudo chmod 644 /smart_wheels_code/coming_soon_page/contact.html

# Step 3: Fix nginx configuration
echo "Step 3: Fixing nginx configuration..."
# Backup current config
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backup.$(date +%Y%m%d_%H%M%S)

# Update the try_files directive to allow access to contact.html
sudo sed -i 's|try_files /smart_wheelers.html =404;|try_files $uri $uri/ /smart_wheelers.html;|g' /etc/nginx/sites-available/default

# Step 4: Test and reload nginx
echo "Step 4: Testing and reloading nginx..."
sudo nginx -t
if [ $? -eq 0 ]; then
    sudo systemctl reload nginx
    echo "✅ Nginx configuration updated and reloaded successfully"
else
    echo "❌ Nginx configuration test failed"
    exit 1
fi

# Step 5: Verify deployment
echo "Step 5: Verifying deployment..."
if [ -f "/smart_wheels_code/coming_soon_page/smart_wheelers.html" ] && [ -f "/smart_wheels_code/coming_soon_page/contact.html" ]; then
    echo "✅ HTML files deployed successfully"
else
    echo "❌ HTML files not found"
    exit 1
fi

echo "=== Deployment completed successfully! ==="
echo "Main page: https://www.smartwheelers.com"
echo "Contact form: https://www.smartwheelers.com/contact.html"
