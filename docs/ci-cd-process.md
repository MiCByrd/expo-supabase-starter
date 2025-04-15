# CI/CD Process Documentation

This document outlines the Continuous Integration and Continuous Deployment (CI/CD) process implemented for the Expo Supabase Starter project.

## Overview

Our CI/CD pipeline automates testing, building, and deployment processes using GitHub Actions and Expo's EAS (Expo Application Services). The workflow is designed to:

1. Detect which parts of the monorepo have changed
2. Run tests and typecheck the codebase
3. Deploy Supabase migrations when backend changes are detected
4. Deploy mobile app updates through Expo EAS
5. Create preview builds for pull requests with specific labels

## Workflow Triggers

The CI/CD workflow is triggered on:
- Push to the `main` branch
- Pull requests targeting the `main` branch

## Configuration Files

- `.github/workflows/ci-cd.yml`: Defines the GitHub Actions workflow
- `apps/mobile/eas.json`: Configures Expo Application Services build profiles

## Environment Setup

The following environment variables and secrets are required:

### GitHub Secrets
- `EXPO_TOKEN`: Expo access token for EAS
- `SUPABASE_ACCESS_TOKEN`: Supabase access token
- `SUPABASE_PROJECT_REF`: Supabase project reference ID
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `SUPABASE_URL`: Production Supabase URL
- `SUPABASE_ANON_KEY`: Production Supabase anonymous key
- `SUPABASE_STAGING_URL`: Staging Supabase URL
- `SUPABASE_STAGING_ANON_KEY`: Staging Supabase anonymous key
- `EXPO_ACCOUNT`: Expo account name
- `EXPO_PROJECT`: Expo project name/slug

## Pipeline Jobs

### 1. Detect Changes
Uses `dorny/paths-filter` to identify which parts of the monorepo have changed:
- Supabase backend
- Mobile app
- Shared components/config

### 2. Test
Runs whenever code is pushed or a PR is created:
- Installs dependencies
- Runs typechecking
- Runs linting

### 3. Deploy Supabase
Runs when changes to Supabase or shared code are detected in the main branch:
- Links to the Supabase project
- Pushes database migrations

### 4. Deploy Mobile
Runs when changes to mobile app or shared code are detected in the main branch:
- Sets up environment variables
- Builds the mobile app
- Deploys OTA updates through EAS

### 5. Preview Build
Runs for pull requests with the `needs-preview` label:
- Sets up staging environment variables
- Creates a preview build for all platforms
- Comments the build URL on the PR

## How to Use

### For Regular Development
1. Create a feature branch
2. Make your changes
3. Create a pull request to the `main` branch
4. Add the `needs-preview` label if you want a preview build

### For Production Deployments
1. Merge your PR to the `main` branch
2. The CI/CD workflow will automatically:
   - Run tests
   - Deploy any Supabase changes
   - Deploy an OTA update for the mobile app

## Build Profiles

The `eas.json` file defines three build profiles:

1. **Development**: For local development with Expo Dev Client
2. **Preview**: For internal testing of PR changes
3. **Production**: For production builds and OTA updates

## Troubleshooting

If you encounter issues with the CI/CD pipeline:

1. Check the GitHub Actions logs for detailed error information
2. Verify that all required secrets are properly configured
3. Ensure your EAS account has the necessary permissions
4. Check that your Supabase project is correctly linked

For more help, consult the [Expo EAS documentation](https://docs.expo.dev/eas/) or [Supabase CLI documentation](https://supabase.com/docs/reference/cli).