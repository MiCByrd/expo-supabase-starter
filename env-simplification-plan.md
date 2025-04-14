# Environment Simplification Plan

## Goals
- Simplify environment management by focusing on local development only
- Move staging/production environment management to CI/CD pipelines
- Provide clear documentation for both local development and deployment

## Current Issues
- Multiple environment files are confusing (`.env.development`, `.env.staging`, `.env.production`)
- Expo doesn't natively support switching between environment files
- Inconsistent environment files between root and mobile app

## Simplified Approach

### 1. Local Development Environment
- Use a single `.env` file for local development
- Create clear `.env.example` files with good documentation
- Ensure `.env` files exist at both root and app levels (due to Expo's requirements)
- Update setup scripts to generate appropriate `.env` files

### 2. CI/CD Pipeline Variables
- Document how to set environment variables in CI/CD pipelines
- Remove all references to staging/production env files locally
- Recommend environment variable secrets management in CI/CD

### 3. Implementation Steps

#### Phase 1: Environment File Cleanup
- [ ] Remove any existing `.env.staging` and `.env.production` files
- [ ] Update setup-supabase.sh to only create `.env` files (not `.env.development`)
- [ ] Update README to reflect simplified approach
- [ ] Ensure mobile app `.env` file only contains EXPO_PUBLIC_ variables

#### Phase 2: Documentation Updates
- [ ] Update Environment Setup section in README
- [ ] Create a CI/CD.md document with guidance for deployment environments
- [ ] Update scripts section to remove unnecessary environment management
- [ ] Add troubleshooting tips for environment issues

#### Phase 3: Script Improvements
- [ ] Create helper script to sync environment variables between root and app levels
- [ ] Ensure supabase:setup script generates proper environment files
- [ ] Add validation to check for missing required environment variables

## Benefits
- Simpler mental model for developers
- Clear separation of concerns (local dev vs deployment)
- Follows Expo's default approach to environment variables
- Reduced chance of environment configuration errors