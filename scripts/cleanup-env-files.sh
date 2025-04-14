#\!/bin/bash

# Clean up any default .env files and ensure only environment-specific files exist
echo "Cleaning up environment files..."

# Remove default .env file from mobile app if it exists
if [ -f "apps/mobile/.env" ]; then
  echo "Removing apps/mobile/.env file"
  rm apps/mobile/.env
fi

# Ensure we have a proper .env.development file for the mobile app
if [ \! -f "apps/mobile/.env.development" ] && [ -f ".env.development" ]; then
  echo "Creating apps/mobile/.env.development from root .env.development"
  # Extract only the EXPO_PUBLIC_ variables from the root file
  grep "EXPO_PUBLIC_" .env.development > apps/mobile/.env.development
fi

echo "Environment cleanup complete"

