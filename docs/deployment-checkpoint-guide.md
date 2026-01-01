# Task 3: Deployment Checkpoint Guide

## Overview

This guide helps you complete **Task 3: Checkpoint - Verify initial deployment** from the AWS Amplify deployment specification.

## Prerequisites

Before starting this checkpoint, ensure:
- ✅ Task 1: Project preparation is complete
- ✅ Task 2: AWS Amplify application setup is complete
- ✅ First build has been triggered in AWS Amplify Console

## Checkpoint Verification Steps

### Step 1: Run Local Verification Script

Execute the deployment verification script:

```bash
npm run verify:deployment
```

This script will check:
- Local build configuration
- Amplify.yml settings
- Build output structure
- Common configuration issues

### Step 2: Verify AWS Amplify Console Status

Open your [AWS Amplify Console](https://console.aws.amazon.com/amplify/) and verify:

#### Build Status Verification
- [ ] **Application visible**: Your app appears in the Amplify dashboard
- [ ] **Build triggered**: First build was automatically triggered
- [ ] **Build status**: Build shows "Succeed" (green) or is currently running
- [ ] **Build logs**: Detailed logs are accessible and show progress

#### Configuration Verification
- [ ] **Repository connected**: GitHub repo and branch are correctly displayed
- [ ] **Build settings**: Settings match your `amplify.yml` configuration
- [ ] **Node.js version**: Version 20+ is being used (check build logs)

### Step 3: Test the Deployed Application

Once your build completes successfully:

#### Get the Amplify URL
1. In Amplify Console, find your app
2. Copy the generated URL (format: `https://branch-name.d1234567890.amplifyapp.com`)

#### Test Application Functionality
- [ ] **Page loads**: Application loads without errors
- [ ] **Navigation works**: All routes and navigation function correctly
- [ ] **Assets load**: Images, CSS, and JavaScript files load properly
- [ ] **Responsive design**: Application works on different screen sizes
- [ ] **No console errors**: Browser developer console shows no critical errors

### Step 4: Verify Build Performance

Check the build metrics in Amplify Console:
- [ ] **Build time**: Reasonable build duration (typically 2-5 minutes)
- [ ] **Build size**: Output size is appropriate for your application
- [ ] **Cache utilization**: Node modules cache is working (faster subsequent builds)

## Troubleshooting Common Issues

### Build Failures

#### Node.js Version Issues
**Problem**: Build fails with Node.js version errors
**Solution**: 
1. Check your `package.json` engines field specifies Node.js 20+
2. Verify Amplify is using the correct Node.js version in build logs
3. Update `amplify.yml` if needed to specify Node.js version

#### Dependency Installation Failures
**Problem**: `npm ci` fails during pre-build
**Solution**:
1. Ensure `package-lock.json` is committed to your repository
2. Verify all dependencies are listed in `package.json`
3. Check for any private or scoped packages that need authentication

#### Build Command Failures
**Problem**: `npm run build` fails
**Solution**:
1. Test the build command locally: `npm run build`
2. Check for missing environment variables
3. Verify all imports and dependencies are correct

### Application Loading Issues

#### Blank Page or 404 Errors
**Problem**: Application loads but shows blank page or 404
**Solution**:
1. Check browser developer console for errors
2. Verify `baseDirectory: dist` in `amplify.yml`
3. Ensure `index.html` exists in build output
4. Check routing configuration for single-page applications

#### Assets Not Loading
**Problem**: CSS, images, or JavaScript files fail to load
**Solution**:
1. Verify assets are in the `public/` directory
2. Check that relative paths are correct
3. Ensure build process includes all necessary assets

### GitHub Integration Issues

#### Build Not Triggering
**Problem**: Pushing to GitHub doesn't trigger new builds
**Solution**:
1. Check webhook configuration in GitHub repository settings
2. Verify branch name matches Amplify configuration
3. Reconnect GitHub integration if necessary

## Success Criteria

Task 3 is complete when:
- [ ] ✅ Local verification script passes all checks
- [ ] ✅ AWS Amplify build completes successfully
- [ ] ✅ Generated Amplify URL loads the application correctly
- [ ] ✅ All application functionality works as expected
- [ ] ✅ No critical errors in browser console
- [ ] ✅ Build logs show no warnings or errors

## Next Steps

Once all verification steps pass:
1. **Document the Amplify URL** for future reference
2. **Test the automatic deployment** by making a small change and pushing to GitHub
3. **Proceed to Task 4**: Configure environment variables (if needed)
4. **Consider Task 5**: Set up custom domain (optional)

## Support Resources

- **Verification Script**: `npm run verify:deployment`
- **AWS Amplify Console**: https://console.aws.amazon.com/amplify/
- **Setup Guide**: `docs/aws-amplify-setup-guide.md`
- **Console Checklist**: `docs/amplify-console-checklist.md`
- **AWS Documentation**: [Amplify Hosting Guide](https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html)

## Questions or Issues?

If you encounter any issues during this checkpoint:
1. Review the troubleshooting section above
2. Check the AWS Amplify build logs for specific error messages
3. Verify your local build works: `npm run build`
4. Consult the AWS Amplify documentation
5. Consider reaching out for additional support

Remember: This checkpoint ensures your deployment pipeline is working correctly before proceeding to advanced configuration steps.