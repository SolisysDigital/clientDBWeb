#!/usr/bin/env node

import { execSync } from 'child_process';

try {
  console.log('Building frontend...');
  execSync('vite build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}