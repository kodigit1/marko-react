#!/usr/bin/env node

/**
 * Validation script for AWS Amplify deployment setup
 * Checks that all required files and configurations are in place
 */

import fs from 'fs';
import path from 'path';

const requiredFiles = [
  'amplify.yml',
  'package.json',
  'vite.config.js',
  '.env.example',
  'AMPLIFY_DEPLOYMENT.md'
];

const requiredPackageScripts = [
  'build',
  'preview',
  'lint'
];

function checkFileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

function validateAmplifyYml() {
  try {
    const content = fs.readFileSync('amplify.yml', 'utf8');
    const hasVersion = content.includes('version: 1');
    const hasBuildCommand = content.includes('npm run build');
    const hasDistDirectory = content.includes('baseDirectory: dist');
    const hasNodeModulesCache = content.includes('node_modules/**/*');
    
    return {
      valid: hasVersion && hasBuildCommand && hasDistDirectory && hasNodeModulesCache,
      details: {
        hasVersion,
        hasBuildCommand,
        hasDistDirectory,
        hasNodeModulesCache
      }
    };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

function validatePackageJson() {
  try {
    const content = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const hasAllScripts = requiredPackageScripts.every(script => 
      content.scripts && content.scripts[script]
    );
    const hasEngines = content.engines && content.engines.node;
    
    return {
      valid: hasAllScripts && hasEngines,
      details: {
        hasAllScripts,
        hasEngines,
        missingScripts: requiredPackageScripts.filter(script => 
          !content.scripts || !content.scripts[script]
        )
      }
    };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

function main() {
  console.log('🔍 Validating AWS Amplify deployment setup...\n');
  
  let allValid = true;
  
  // Check required files
  console.log('📁 Checking required files:');
  for (const file of requiredFiles) {
    const exists = checkFileExists(file);
    console.log(`  ${exists ? '✅' : '❌'} ${file}`);
    if (!exists) allValid = false;
  }
  
  console.log('\n📋 Validating amplify.yml:');
  const amplifyValidation = validateAmplifyYml();
  if (amplifyValidation.valid) {
    console.log('  ✅ amplify.yml is properly configured');
  } else {
    console.log('  ❌ amplify.yml validation failed');
    if (amplifyValidation.error) {
      console.log(`     Error: ${amplifyValidation.error}`);
    } else {
      console.log('     Missing configurations:', amplifyValidation.details);
    }
    allValid = false;
  }
  
  console.log('\n📦 Validating package.json:');
  const packageValidation = validatePackageJson();
  if (packageValidation.valid) {
    console.log('  ✅ package.json is properly configured');
  } else {
    console.log('  ❌ package.json validation failed');
    if (packageValidation.error) {
      console.log(`     Error: ${packageValidation.error}`);
    } else if (packageValidation.details.missingScripts.length > 0) {
      console.log(`     Missing scripts: ${packageValidation.details.missingScripts.join(', ')}`);
    }
    allValid = false;
  }
  
  console.log('\n' + '='.repeat(50));
  if (allValid) {
    console.log('🎉 All validations passed! Project is ready for Amplify deployment.');
    process.exit(0);
  } else {
    console.log('❌ Some validations failed. Please fix the issues above.');
    process.exit(1);
  }
}

main();