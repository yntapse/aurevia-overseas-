# EmailJS Setup Guide

The quote form is configured to send emails to **info@aureviaoverseas.com** using EmailJS.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service
1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your email account (info@aureviaoverseas.com)
5. Copy the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template content:

**Subject:**
```
New Quote Request - {{product_name}}
```

**Body:**
```
You have received a new quote request from Aurevia Overseas website.

PRODUCT DETAILS:
Product: {{product_name}}
Quantity: {{quantity}}
Destination: {{destination_country}}

CUSTOMER INFORMATION:
Company Name: {{company_name}}
Contact Person: {{contact_name}}
Email: {{email}}
Phone: {{phone}}

ADDITIONAL NOTES:
{{additional_notes}}

---
This is an automated message from the Aurevia Overseas quote form.
```

4. Set **To Email** to: `{{to_email}}` (or directly to `info@aureviaoverseas.com`)
5. Copy the **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `abc123xyz789`)

### 5. Update the Application
Open `src/components/QuoteForm.tsx` and replace these values:

```typescript
await emailjs.send(
  'YOUR_SERVICE_ID',    // Replace with your Service ID from step 2
  'YOUR_TEMPLATE_ID',   // Replace with your Template ID from step 3
  templateParams,
  'YOUR_PUBLIC_KEY'     // Replace with your Public Key from step 4
);
```

### 6. Test the Form
1. Save the file
2. Go to your website
3. Fill out the quote form
4. Submit and check info@aureviaoverseas.com for the email

## Free Tier Limits
- 200 emails per month
- For more, upgrade to a paid plan

## Alternative: Environment Variables (Recommended)

For better security, create a `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Then update the code to:
```typescript
await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  templateParams,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);
```

Remember to add `.env` to `.gitignore` to keep credentials private!
