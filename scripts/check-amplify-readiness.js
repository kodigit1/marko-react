#!/usr/bin/env node

/**
 * Pre-deployment validation script for AWS Amplify
 * Verifies that the project is ready for Amplify deployment
 */

import fs from 'fs';
import path from 'path';

console.log('🚀 AWS Amplify Deployment Readiness Check\n');

let allChecksPass = true;

// Check 1: Verify amplify.yml exists and is properly configured
console.log('📋 Checking amplify.yml configuration...');
try {
  const amplifyYml = fs.readFileSync('amplify.yml', 'utf8');
  
  const checks = {
    hasVersion: amplifyYml.includes('version: 1'),
    hasPreBuild: amplifyYml.includes('preBuild:'),
    hasNpmCi: amplifyYml.includes('npm ci'),
    hasBuildCommand: amplifyYml.includes('npm run build'),
    hasDistDirectory: amplifyYml.includes('baseDirectory: dist'),
    hasArtifacts: amplifyYml.includes('artifacts:'),
    hasCache: amplifyYml.includes('node_modules/**/*')
  };
  
  Object.entries(checks).forEach(([check, passed]) => {
    console.log(`  ${passed ? '✅' : '❌'} ${check}`);
    if (!passed) allChecksPass = false;
  });
  
} catch (error) {
  console.log('  ❌ amplify.yml not found or unreadable');
  allChecksPass = false;
}

// Check 2: Verify package.json has required scripts
console.log('\n📦 Checking package.json scripts...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredScripts = ['build', 'preview'];
  const hasAllScripts = requiredScripts.every(script => 
    packageJson.scripts && packageJson.scripts[script]
  );
  
  if (hasAllScripts) {
    console.log('  ✅ All required scripts present');
  } else {
    console.log('  ❌ Missing required scripts');
    requiredScripts.forEach(script => {
      const hasScript = packageJson.scripts && packageJson.scripts[script];
      console.log(`    ${hasScript ? '✅' : '❌'} ${script}`);
    });
    allChecksPass = false;
  }
  
  // Check Node.js version requirement
  if (packageJson.engines && packageJson.engines.node) {
    console.log(`  ✅ Node.js version specified: ${packageJson.engines.node}`);
  } else {
    console.log('  ⚠️  Node.js version not specified in engines field');
  }
  
} catch (error) {
  console.log('  ❌ package.json not found or invalid');
  allChecksPass = false;
}

// Check 3: Verify build output directory structure
console.log('\n🏗️  Checking build configuration...');
try {
  const viteConfig = fs.readFileSync('vite.config.js', 'utf8');
  
  if (viteConfig.includes('outDir') && viteConfig.includes('dist')) {
    console.log('  ✅ Vite output directory configured correctly');
  } else if (!viteConfig.includes('outDir')) {
    console.log('  ✅ Using default Vite output directory (dist)');
  } else {
    console.log('  ⚠️  Custom output directory detected - ensure amplify.yml matches');
  }
  
} catch (error) {
  console.log('  ❌ vite.config.js not found');
  allChecksPass = false;
}

// Check 4: Verify environment variable template
console.log('\n🔧 Checking environment configuration...');
if (fs.existsSync('.env.example')) {
  console.log('  ✅ .env.example found');
  
  try {
    const envExample = fs.readFileSync('.env.example', 'utf8');
    const viteVars = envExample.split('\n').filter(line => line.startsWith('VITE_'));
    
    if (viteVars.length > 0) {
      console.log(`  ✅ Found ${viteVars.length} VITE_ environment variables`);
    } else {
      console.log('  ℹ️  No VITE_ environment variables found');
    }
  } catch (error) {
    console.log('  ⚠️  Could not read .env.example');
  }
} else {
  console.log('  ⚠️  .env.example not found (optional)');
}

// Check 5: Verify Git repository status
console.log('\n📁 Checking Git repository...');
if (fs.existsSync('.git')) {
  console.log('  ✅ Git repository initialized');
  
  // Check if there are uncommitted changes
  try {
    const { execSync } = await import('child_process');
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (gitStatus.trim() === '') {
      console.log('  ✅ No uncommitted changes');
    } else {
      console.log('  ⚠️  Uncommitted changes detected - commit before deploying');
    }
  } catch (error) {
    console.log('  ℹ️  Could not check Git status');
  }
} else {
  console.log('  ❌ Not a Git repository');
  allChecksPass = false;
}

// Final summary
console.log('\n' + '='.repeat(60));
if (allChecksPass) {
  console.log('🎉 Project is ready for AWS Amplify deployment!');
  console.log('\nNext steps:');
  console.log('1. Open AWS Amplify Console');
  console.log('2. Create new app > Host web app');
  console.log('3. Connect your GitHub repository');
  console.log('4. Configure build settings (should auto-detect)');
  console.log('\nRefer to docs/aws-amplify-setup-guide.md for detailed instructions.');
} else {
  console.log('❌ Some issues need to be resolved before deployment.');
  console.log('Please fix the issues marked with ❌ above.');
}

process.exit(allChecksPass ? 0 : 1);