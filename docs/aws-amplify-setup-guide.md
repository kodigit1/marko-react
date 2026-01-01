# AWS Amplify Console Setup Guide

This guide walks you through setting up AWS Amplify hosting for your React + Vite application.

## Task 2.1: Create New Amplify Application in AWS Console

### Step-by-Step Instructions

1. **Access AWS Amplify Console**
   - Open your web browser and navigate to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Ensure you're logged into your AWS account with appropriate permissions

2. **Create New Application**
   - Click the **"New app"** button (orange button in the top right)
   - From the dropdown menu, select **"Host web app"**
   - This will start the application creation wizard

3. **Verification**
   - You should see the "Host your web app" page
   - The page should show options for connecting different Git providers (GitHub, Bitbucket, GitLab, AWS CodeCommit)

### Expected Outcome
- You should be on the "Host your web app" page in AWS Amplify Console
- The page displays Git provider options for connecting your repository

---

## Task 2.2: Connect GitHub Repository

### Step-by-Step Instructions

1. **Select GitHub as Git Provider**
   - On the "Host your web app" page, click **"GitHub"**
   - Click **"Continue"** button

2. **Authenticate with GitHub**
   - You'll be redirected to GitHub for OAuth authentication
   - Click **"Authorize aws-amplify-console"** to grant permissions
   - You may need to enter your GitHub password or 2FA code

3. **Select Repository**
   - After authentication, you'll see a list of your GitHub repositories
   - Find and select your repository from the dropdown list
   - If you don't see your repository, check that:
     - The repository exists and you have access to it
     - You've granted the necessary permissions to AWS Amplify

4. **Choose Branch**
   - Select the branch you want to deploy (typically `main` or `master`)
   - This branch will be automatically deployed when you push changes

5. **Confirm Selection**
   - Click **"Next"** to proceed to build settings

### Expected Outcome
- Your GitHub repository should be connected
- The selected branch should be displayed
- You should be on the "Configure build settings" page

---

## Task 2.3: Configure Build Settings

### Step-by-Step Instructions

1. **Review Auto-Detected Settings**
   - AWS Amplify should automatically detect your `amplify.yml` file
   - The build specification should show:
     - **Build commands**: `npm ci` and `npm run build`
     - **Base directory**: (empty - root directory)
     - **Build output directory**: `dist`

2. **Verify Node.js Version**
   - Check that the Node.js version matches your project requirements
   - Your project requires Node.js 20+
   - If needed, you can modify the build spec to specify the version

3. **Review Build Specification**
   - The auto-detected build spec should match your `amplify.yml` file:
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

4. **Advanced Settings (Optional)**
   - You can modify environment variables here if needed
   - For now, you can leave this section empty and configure later

5. **Confirm Configuration**
   - Click **"Next"** to proceed to the final review
   - Review all settings on the summary page
   - Click **"Save and deploy"** to create the application

### Expected Outcome
- Build settings should be properly configured
- The application should start its first build automatically
- You should see the build progress in the Amplify Console

## Validation Steps

After completing all sub-tasks, verify:

1. **Application Created**: You should see your new Amplify app in the console
2. **Repository Connected**: GitHub repository and branch should be displayed
3. **Build Running**: The first build should be in progress or completed
4. **Build Logs**: You can view detailed build logs by clicking on the build

## Troubleshooting

### Common Issues

**GitHub Authentication Fails**
- Ensure you have admin access to the repository
- Try disconnecting and reconnecting GitHub integration
- Check GitHub permissions for AWS Amplify app

**Repository Not Listed**
- Verify repository exists and you have access
- Check if repository is private and permissions are correct
- Try refreshing the repository list

**Build Specification Issues**
- Ensure `amplify.yml` exists in your repository root
- Verify the build commands match your package.json scripts
- Check that output directory is set to `dist`

**Build Fails**
- Check Node.js version compatibility
- Verify all dependencies are listed in package.json
- Review build logs for specific error messages

## Next Steps

Once all sub-tasks are complete:
1. Wait for the first build to complete successfully
2. Test the generated Amplify URL
3. Proceed to Task 3: Checkpoint verification