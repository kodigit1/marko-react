# AWS Amplify Deployment Guide

This document provides instructions for deploying this React + Vite application to AWS Amplify.

## Prerequisites

- AWS Account with appropriate permissions
- GitHub repository with this code
- Node.js 20+ (for local development)

## Build Configuration

The project includes an `amplify.yml` build specification file that:

- Uses Node.js 20 for compatibility
- Installs dependencies with `npm ci` for faster, reliable builds
- Runs the production build with `npm run build`
- Outputs built assets to the `dist` directory
- Caches `node_modules` for faster subsequent builds
- Includes debugging output for troubleshooting

## Environment Variables

### Local Development
Copy `.env.example` to `.env.local` and configure your local environment variables.

### AWS Amplify Console
Configure the following environment variables in the Amplify Console:

#### Required Variables
- `NODE_ENV=production`

#### Optional Variables (configure as needed)
- `VITE_APP_NAME` - Application name
- `VITE_API_BASE_URL` - API endpoint URL
- `VITE_GOOGLE_ANALYTICS_ID` - Google Analytics tracking ID
- Any other `VITE_` prefixed variables your app requires

## Build Scripts

The following npm scripts are configured for production deployment:

- `npm run build` - Creates optimized production build in `dist/` directory
- `npm run preview` - Locally preview the production build
- `npm run lint` - Run ESLint for code quality checks

## Deployment Process

1. **Connect Repository**: Link your GitHub repository to AWS Amplify
2. **Configure Build**: The `amplify.yml` file will be automatically detected
3. **Set Environment Variables**: Configure required variables in Amplify Console
4. **Deploy**: Push to your main branch to trigger automatic deployment

## Troubleshooting

### Build Failures
- Check Node.js version compatibility (requires Node.js 20+)
- Verify all environment variables are properly set
- Review build logs in Amplify Console for specific error messages

### Environment Variables Not Working
- Ensure variables are prefixed with `VITE_` for client-side access
- Verify variables are set in Amplify Console, not just locally
- Redeploy after changing environment variables

### CSS/Asset Issues
- Verify all assets are in the `public/` directory
- Check that relative paths are correct
- Ensure build output directory is set to `dist`

## Performance Optimizations

The build configuration includes:

- Dependency caching for faster builds
- Production optimizations via Vite
- Automatic asset optimization
- CDN distribution via CloudFront

## Security Considerations

- Never commit `.env.local` or actual environment variables to Git
- Use AWS IAM roles for secure access
- Enable HTTPS redirect in Amplify Console
- Configure appropriate CORS settings if using APIs