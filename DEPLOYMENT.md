# Deployment Guide - Aurevia Overseas Website

## Overview
This is a **frontend-only** application. There is no backend to deploy separately.
- Forms use FormSubmit.co (third-party service)
- Data is stored locally in the code (mockData.ts)

## Deploy to Hostinger

### Step 1: Build the Application

Run this command in your terminal:

```bash
npm run build
```

This creates a `dist` folder with all your production files.

### Step 2: Prepare Files for Upload

After building, you'll have a `dist` folder containing:
- index.html
- assets/ (CSS, JS, images)
- All optimized production files

### Step 3: Upload to Hostinger

#### Option A: Using File Manager
1. Log in to Hostinger control panel
2. Go to **File Manager**
3. Navigate to `public_html` folder (or your domain folder)
4. **Delete all existing files** in public_html (if any)
5. Upload ALL contents from the `dist` folder:
   - index.html
   - assets folder
   - All other files
6. Wait for upload to complete

#### Option B: Using FTP (FileZilla)
1. Download FileZilla FTP client
2. Get FTP credentials from Hostinger:
   - Host: ftp.yourdomain.com
   - Username: your_ftp_username
   - Password: your_ftp_password
   - Port: 21
3. Connect to your server
4. Navigate to `public_html` folder
5. Delete existing files
6. Upload all contents from `dist` folder

### Step 4: Configure Domain (if needed)

1. In Hostinger, go to **Domains**
2. Point your domain to `public_html` folder
3. Wait for DNS propagation (can take 24-48 hours)

### Step 5: Test Website

Visit your domain: `https://yourdomain.com`

### Step 6: Activate Form Submissions

**IMPORTANT**: The first time someone submits a form:
1. FormSubmit will send a confirmation email to **info@aureviaoverseas.com**
2. Click the activation link in that email
3. After activation, all future submissions will go directly to your inbox

---

## Alternative: Deploy to Vercel (Easier Option)

If you want easier deployment, Vercel is simpler than Hostinger:

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts:
   - Link to GitHub? (optional)
   - Project name: aurevia-overseas
   - Deploy? Yes

4. Vercel will give you a URL like: `https://aurevia-overseas.vercel.app`

5. To use custom domain:
   - Go to Vercel dashboard
   - Add your domain
   - Update DNS records at your domain registrar

**Benefits of Vercel:**
- Automatic deployments when you push to GitHub
- Free SSL certificate
- Global CDN
- Faster performance
- Zero configuration

---

## Update Website Content

To update website content after deployment:

1. Make changes to your code locally
2. Run `npm run build` again
3. Upload new `dist` folder contents to Hostinger (or redeploy to Vercel)

---

## Environment Variables (Not needed currently)

Your app doesn't use any environment variables right now. Everything is hardcoded in the source files.

---

## Troubleshooting

### Issue: Website shows blank page
- **Solution**: Make sure you uploaded ALL files from `dist` folder, including the `assets` folder

### Issue: Images not loading
- **Solution**: Check that `src/images` folder was included in the build and uploaded

### Issue: Forms not working
- **Solution**: Check browser console for errors. Make sure you activated FormSubmit by clicking the confirmation email

### Issue: 404 errors on page refresh
- **Solution**: Hostinger needs a `.htaccess` file for SPA routing (see below)

### Fix SPA Routing on Hostinger

Create a `.htaccess` file in your `public_html` folder with this content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

This ensures all routes work correctly with the hash-based routing.

---

## Recommended: Use Vercel Instead

For this type of modern React application, Vercel is **much easier** and better than Hostinger:

✅ One command deployment: `vercel`
✅ Automatic HTTPS
✅ Global CDN
✅ Free hosting
✅ Better performance
✅ No FTP hassle

Hostinger is better for traditional websites, WordPress, or PHP applications.
