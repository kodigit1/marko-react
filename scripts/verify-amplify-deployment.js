#!/usr/bin/env node

/**
 * AWS Amplify Deployment Verification Script
 * Task 3: Checkpoint - Verify initial deployment
 * 
 * This script helps verify that the AWS Amplify deployment is working correctly
 */

import fs from 'fs';
import https from 'https';
import { URL } from 'url';

console.log('🔍 AWS Amplify Deployment Verification\n');
console.log('Task 3: Checkpoint - Verify initial deployment');
console.log('=' .repeat(60));

let allChecksPass = true;

// Step 1: Verify local build works
console.log('\n📦 Step 1: Verifying local build capability...');

try {
  // Check if dist directory exists (from previous build)
  if (fs.existsSync('dist')) {
    console.log('  ✅ dist directory exists from previous build');
    
    // Check if index.html exists in dist
    if (fs.existsSync('dist/index.html')) {
      console.log('  ✅ index.html found in dist directory');
    } else {
      console.log('  ❌ index.html not found in dist directory');
      allChecksPass = false;
    }
    
    // Check if assets directory exists
    if (fs.existsSync('dist/assets')) {
      console.log('  ✅ assets directory found in dist');
    } else {
      console.log('  ❌ assets directory not found in dist');
      allChecksPass = false;
    }
  } else {
    console.log('  ⚠️  dist directory not found - build may be required');
    console.log('     Run "npm run build" to create production build');
  }
} catch (error) {
  console.log('  ❌ Error checking build output:', error.message);
  allChecksPass = false;
}

// Step 2: Check Amplify configuration
console.log('\n⚙️  Step 2: Verifying Amplify configuration...');

try {
  const amplifyYml = fs.readFileSync('amplify.yml', 'utf8');
  
  // Verify key configuration elements
  const checks = {
    'Version specified': amplifyYml.includes('version: 1'),
    'Pre-build commands': amplifyYml.includes('npm ci'),
    'Build command': amplifyYml.includes('npm run build'),
    'Output directory': amplifyYml.includes('baseDirectory: dist'),
    'Artifacts configuration': amplifyYml.includes('artifacts:'),
    'Node modules cache': amplifyYml.includes('node_modules/**/*')
  };
  
  Object.entries(checks).forEach(([check, passed]) => {
    console.log(`  ${passed ? '✅' : '❌'} ${check}`);
    if (!passed) allChecksPass = false;
  });
  
} catch (error) {
  console.log('  ❌ Error reading amplify.yml:', error.message);
  allChecksPass = false;
}

// Step 3: Provide deployment verification checklist
console.log('\n🚀 Step 3: AWS Amplify Console Verification Checklist');
console.log('\nPlease verify the following in your AWS Amplify Console:');

const consoleChecks = [
  '📱 Application appears in Amplify Console dashboard',
  '🔗 GitHub repository is connected and displayed',
  '🌿 Correct branch is selected for deployment',
  '⚡ First build has been triggered automatically',
  '📊 Build logs are accessible and show progress',
  '✅ Build completed successfully (green status)',
  '🌐 Amplify URL is generated and accessible',
  '🔧 Build settings match your amplify.yml configuration'
];

consoleChecks.forEach((check, index) => {
  console.log(`  ${index + 1}. ${check}`);
});

// Step 4: URL Testing Instructions
console.log('\n🌐 Step 4: Testing the Deployed Application');
console.log('\nOnce your build completes successfully:');
console.log('  1. Copy the Amplify URL from the console (format: https://branch-name.d1234567890.amplifyapp.com)');
console.log('  2. Open the URL in your browser');
console.log('  3. Verify the application loads correctly');
console.log('  4. Check that all pages and navigation work');
console.log('  5. Verify that assets (images, CSS, JS) load properly');

// Step 5: Common Issues and Solutions
console.log('\n🔧 Step 5: Common Issues and Solutions');
console.log('\nIf your build fails, check for these common issues:');

const commonIssues = [
  {
    issue: 'Node.js version mismatch',
    solution: 'Ensure Node.js version in Amplify matches package.json engines field'
  },
  {
    issue: 'Build command fails',
    solution: 'Verify "npm run build" works locally and all dependencies are in package.json'
  },
  {
    issue: 'Assets not loading',
    solution: 'Check that baseDirectory in amplify.yml matches your build output directory'
  },
  {
    issue: 'Environment variables missing',
    solution: 'Configure required VITE_ variables in Amplify Console Environment Variables'
  },
  {
    issue: 'GitHub webhook not triggering',
    solution: 'Check repository permissions and reconnect GitHub integration'
  }
];

commonIssues.forEach((item, index) => {
  console.log(`  ${index + 1}. ${item.issue}`);
  console.log(`     Solution: ${item.solution}\n`);
});

// Final summary
console.log('=' .repeat(60));
if (allChecksPass) {
  console.log('✅ Local configuration checks passed!');
} else {
  console.log('⚠️  Some local configuration issues detected.');
  console.log('   Please resolve the issues marked with ❌ above.');
}

console.log('\n📋 Next Steps:');
console.log('1. Ensure your first Amplify build completes successfully');
console.log('2. Test the generated Amplify URL');
console.log('3. Verify all application functionality works');
console.log('4. If issues arise, consult the troubleshooting section above');
console.log('5. Once verified, proceed to Task 4: Configure environment variables');

console.log('\n📚 Additional Resources:');
console.log('- AWS Amplify Console: https://console.aws.amazon.com/amplify/');
console.log('- Setup Guide: docs/aws-amplify-setup-guide.md');
console.log('- Console Checklist: docs/amplify-console-checklist.md');

process.exit(allChecksPass ? 0 : 1);