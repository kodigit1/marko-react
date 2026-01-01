# AWS Amplify Console Setup Checklist

Use this checklist to complete Task 2: Set up AWS Amplify application

## Pre-Setup Validation

Before starting, run the readiness check:
```bash
npm run check:amplify-ready
```

Ensure all checks pass before proceeding to AWS Console.

## Task 2.1: Create New Amplify Application ✅

**Objective**: Create a new Amplify application in AWS Console

### Steps:
- [ ] Navigate to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
- [ ] Ensure you're logged into AWS with appropriate permissions
- [ ] Click **"New app"** button (orange button, top right)
- [ ] Select **"Host web app"** from dropdown
- [ ] Verify you see the "Host your web app" page with Git provider options

### Success Criteria:
- [ ] You're on the "Host your web app" page
- [ ] Git provider options are visible (GitHub, Bitbucket, GitLab, AWS CodeCommit)

---

## Task 2.2: Connect GitHub Repository ✅

**Objective**: Connect your GitHub repository to AWS Amplify

### Steps:
- [ ] Click **"GitHub"** as your Git provider
- [ ] Click **"Continue"** button
- [ ] Complete GitHub OAuth authentication:
  - [ ] Click **"Authorize aws-amplify-console"**
  - [ ] Enter GitHub password/2FA if prompted
- [ ] Select your repository from the dropdown list
- [ ] Choose your deployment branch (typically `main` or `master`)
- [ ] Click **"Next"** to proceed

### Success Criteria:
- [ ] GitHub repository is connected and displayed
- [ ] Correct branch is selected
- [ ] You're on the "Configure build settings" page

### Troubleshooting:
- **Repository not listed?** Check repository permissions and refresh
- **Authentication failed?** Ensure you have admin access to the repository

---

## Task 2.3: Configure Build Settings ✅

**Objective**: Configure build settings for your Vite React application

### Steps:
- [ ] Review auto-detected build specification
- [ ] Verify the following settings are correct:
  - [ ] **Build commands**: Contains `npm ci` and `npm run build`
  - [ ] **Base directory**: Empty (root directory)
  - [ ] **Build output directory**: `dist`
  - [ ] **Node.js version**: 20+ (should be auto-detected)

### Expected Build Specification:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Final Steps:
- [ ] Review all settings on summary page
- [ ] Click **"Save and deploy"** to create the application
- [ ] Wait for first build to start

### Success Criteria:
- [ ] Application is created in Amplify Console
- [ ] First build is initiated automatically
- [ ] Build logs are accessible and show progress

---

## Post-Setup Verification

After completing all sub-tasks:

- [ ] **Application visible**: New Amplify app appears in console dashboard
- [ ] **Repository connected**: GitHub repo and branch displayed correctly
- [ ] **Build in progress**: First build is running or completed
- [ ] **Build logs accessible**: Can view detailed build logs
- [ ] **No errors**: No red error messages in console

## Next Steps

Once all tasks are complete:
1. Wait for first build to complete (usually 2-5 minutes)
2. Test the generated Amplify URL
3. Proceed to Task 3: Checkpoint verification

## Support Resources

- **Setup Guide**: `docs/aws-amplify-setup-guide.md`
- **Validation Script**: `npm run check:amplify-ready`
- **Build Validation**: `npm run validate:amplify`
- **AWS Documentation**: [Amplify Hosting Guide](https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html)

## Common Issues & Solutions

**Build Fails**
- Check Node.js version (requires 20+)
- Verify `amplify.yml` is in repository root
- Review build logs for specific errors

**GitHub Connection Issues**
- Ensure repository is accessible
- Check AWS Amplify app permissions in GitHub
- Try disconnecting and reconnecting

**Build Specification Problems**
- Verify `npm run build` works locally
- Check output directory is `dist`
- Ensure all dependencies are in `package.json`