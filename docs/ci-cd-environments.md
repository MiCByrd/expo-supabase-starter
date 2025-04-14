# CI/CD Environment Setup

This document provides guidance on setting up environment variables for staging and production environments in CI/CD pipelines.

## Environment Strategy

This project follows a "local development only" approach for environment files:
- Local development uses `.env` files at both root and app levels
- Staging and production environments are configured entirely through CI/CD variables
- No environment-specific files (`.env.staging`, `.env.production`) are kept locally

## Setting Up CI/CD Environments

### Required Environment Variables

When configuring your CI/CD pipeline, you'll need to set the following environment variables:

#### Core Variables
- `EXPO_PUBLIC_SUPABASE_URL` - Your Supabase URL for the environment
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for admin operations)
- `SUPABASE_PROJECT_REF` - Your Supabase project reference ID

#### EAS Build Variables (If using Expo Application Services)
- `EXPO_TOKEN` - Your Expo access token
- Any additional variables needed for your specific deployment

### Environment Setup by Platform

#### GitHub Actions

```yaml
# .github/workflows/deploy-staging.yml
name: Deploy to Staging

on:
  push:
    branches: [ staging ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Setup PNPM
        uses: pnpm/action-setup@v2
        with:
          version: 10
          
      - name: Install dependencies
        run: pnpm install
      
      - name: Build and deploy
        env:
          EXPO_PUBLIC_SUPABASE_URL: ${{ secrets.STAGING_SUPABASE_URL }}
          EXPO_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.STAGING_SUPABASE_ANON_KEY }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.STAGING_SUPABASE_SERVICE_ROLE_KEY }}
          SUPABASE_PROJECT_REF: ${{ secrets.STAGING_SUPABASE_PROJECT_REF }}
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
        run: |
          # Create environment files from CI/CD variables
          echo "EXPO_PUBLIC_SUPABASE_URL=$EXPO_PUBLIC_SUPABASE_URL" > .env
          echo "EXPO_PUBLIC_SUPABASE_ANON_KEY=$EXPO_PUBLIC_SUPABASE_ANON_KEY" >> .env
          echo "SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY" >> .env
          echo "SUPABASE_PROJECT_REF=$SUPABASE_PROJECT_REF" >> .env
          
          # Create mobile app .env with only EXPO_PUBLIC_ variables
          mkdir -p apps/mobile
          grep "EXPO_PUBLIC_" .env > apps/mobile/.env
          
          # Build and deploy
          pnpm build
          # Your deployment commands here
```

#### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - deploy

deploy_staging:
  stage: deploy
  image: node:20
  
  variables:
    # These variables should be set in GitLab CI/CD settings
    # STAGING_SUPABASE_URL
    # STAGING_SUPABASE_ANON_KEY
    # STAGING_SUPABASE_SERVICE_ROLE_KEY
    # STAGING_SUPABASE_PROJECT_REF
    # EXPO_TOKEN
  
  script:
    - npm install -g pnpm
    - pnpm install
    
    # Create environment files from CI/CD variables
    - echo "EXPO_PUBLIC_SUPABASE_URL=$STAGING_SUPABASE_URL" > .env
    - echo "EXPO_PUBLIC_SUPABASE_ANON_KEY=$STAGING_SUPABASE_ANON_KEY" >> .env
    - echo "SUPABASE_SERVICE_ROLE_KEY=$STAGING_SUPABASE_SERVICE_ROLE_KEY" >> .env
    - echo "SUPABASE_PROJECT_REF=$STAGING_SUPABASE_PROJECT_REF" >> .env
    
    # Create mobile app .env with only EXPO_PUBLIC_ variables
    - mkdir -p apps/mobile
    - grep "EXPO_PUBLIC_" .env > apps/mobile/.env
    
    # Build and deploy
    - pnpm build
    # Your deployment commands here
  
  only:
    - staging
```

## Using Expo EAS

When using Expo Application Services (EAS) for building and deploying your app, you can set environment variables directly in your `eas.json` file or through the EAS CLI:

### Setting Environment Variables with EAS CLI

```bash
# For staging profile
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "https://your-staging-project.supabase.co" --profile staging
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "your-staging-anon-key" --profile staging

# For production profile
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "https://your-production-project.supabase.co" --profile production
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "your-production-anon-key" --profile production
```

### In Your EAS Configuration

```json
// eas.json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "staging": {
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "https://your-staging-project.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "your-staging-anon-key"
      }
    },
    "production": {
      "distribution": "store",
      "channel": "production"
      // Environment variables set via EAS secrets
    }
  }
}
```

## Best Practices

1. **Never commit sensitive keys**: Store all secrets in your CI/CD platform's secret management
2. **Use consistent naming**: Keep variable names consistent across all environments
3. **Minimize exposure**: Only include necessary variables in each environment
4. **Public prefix**: Remember that all variables with `EXPO_PUBLIC_` prefix will be available to client code
5. **Validate environments**: Consider adding a validation step to ensure all required variables are set

## Troubleshooting

Common issues with CI/CD environment variables:

1. **Missing variables**: If deployments fail, check that all required variables are set
2. **Incorrect values**: Double-check for typos and correct values for each environment
3. **Permission issues**: Ensure your CI/CD pipeline has permission to access secrets
4. **Quote handling**: Some CI/CD platforms require special handling for quotes in variable values