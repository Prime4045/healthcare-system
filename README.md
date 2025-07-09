# Social Authentication Setup Guide

This guide will help you set up Google and Facebook authentication for the Healthcare Appointment System.

## Google OAuth Setup

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API and Google Identity Services

### 2. Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in required information:
   - App name: "HealthCare+ Appointment System"
   - User support email: your-email@domain.com
   - Developer contact: your-email@domain.com
4. Add scopes: `email`, `profile`
5. Add test users if in development

### 3. Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized origins:
   - `http://localhost:3000` (development)
   - `https://yourdomain.com` (production)
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
6. Copy the Client ID and add to `.env.local`

## Facebook OAuth Setup

### 1. Create Facebook App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App"
3. Choose "Consumer" app type
4. Fill in app details:
   - App name: "HealthCare+ Appointment System"
   - Contact email: your-email@domain.com

### 2. Configure Facebook Login
1. Add "Facebook Login" product to your app
2. Go to Facebook Login > Settings
3. Add Valid OAuth Redirect URIs:
   - `http://localhost:3000/` (development)
   - `https://yourdomain.com/` (production)
4. Enable "Login with the JavaScript SDK"

### 3. Get App Credentials
1. Go to Settings > Basic
2. Copy the App ID and add to `.env.local`
3. For production, you'll also need the App Secret

## Environment Variables

Create a `.env.local` file in your project root:

\`\`\`env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id_here
JWT_SECRET=your_super_secret_jwt_key_here
\`\`\`

## Domain Verification

### For Production Deployment:

#### Google:
1. Add your production domain to authorized origins
2. Verify domain ownership in Google Search Console
3. Update OAuth consent screen with production URLs

#### Facebook:
1. Add your production domain to App Domains
2. Add Privacy Policy and Terms of Service URLs
3. Submit app for review if using advanced permissions

## Security Best Practices

1. **Never expose secrets**: Only use `NEXT_PUBLIC_` prefix for client-side variables
2. **Use HTTPS**: Always use HTTPS in production
3. **Validate tokens**: Always verify tokens on the server side
4. **Rate limiting**: Implement rate limiting for auth endpoints
5. **CORS configuration**: Properly configure CORS for your domains

## Testing

### Development Testing:
1. Start your development server: `npm run dev`
2. Navigate to login/register pages
3. Test Google and Facebook login buttons
4. Check browser console for any errors
5. Verify user creation in your database

### Production Testing:
1. Deploy to your production environment
2. Update OAuth app configurations with production URLs
3. Test all authentication flows
4. Monitor error logs

## Troubleshooting

### Common Issues:

#### Google OAuth:
- **Error 400: redirect_uri_mismatch**: Check authorized redirect URIs
- **Error 403: access_blocked**: App not verified, add test users
- **Invalid client**: Check client ID configuration

#### Facebook Login:
- **App Not Setup**: Complete basic app setup
- **Invalid redirect URI**: Check Valid OAuth Redirect URIs
- **App in development mode**: Add test users or submit for review

#### General:
- **CORS errors**: Check domain configuration
- **Token validation fails**: Verify JWT secret and token format
- **User not created**: Check database connection and user creation logic

## Support

For additional help:
- Google OAuth: [Google Identity Documentation](https://developers.google.com/identity)
- Facebook Login: [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login/)
- Next.js Authentication: [NextAuth.js Documentation](https://next-auth.js.org/)
