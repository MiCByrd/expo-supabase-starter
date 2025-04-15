# Setting Up GitHub Secrets for CI/CD

This guide explains how to set up encrypted secrets in your GitHub repository for use with our CI/CD workflow.

## What Are GitHub Secrets?

GitHub Secrets are encrypted environment variables that you can create for a repository or organization. Secrets allow you to store sensitive information securely, such as access tokens, API keys, or other credentials that should not be exposed in your workflow files.

## Required Secrets for Our Workflow

The following secrets are required for our CI/CD workflow:

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

## Steps to Add GitHub Secrets

1. **Navigate to your repository's settings**:
   - Go to your GitHub repository
   - Click on "Settings" in the top navigation bar
   - In the left sidebar, click on "Secrets and variables" then "Actions"

2. **Add a new repository secret**:
   - Click the "New repository secret" button
   - Enter the secret name (e.g., `EXPO_TOKEN`)
   - Enter the secret value
   - Click "Add secret"

3. **Repeat for all required secrets**:
   - Add each of the required secrets listed above

## Obtaining Secret Values

### Expo Secrets

1. **EXPO_TOKEN**:
   - Go to your [Expo account settings](https://expo.dev/accounts/[username]/settings/access-tokens)
   - Create a new access token
   - Copy the token value

2. **EXPO_ACCOUNT**:
   - Your Expo account username

3. **EXPO_PROJECT**:
   - The slug of your Expo project (found in app.json)

### Supabase Secrets

1. **SUPABASE_ACCESS_TOKEN**:
   - Go to [Supabase dashboard](https://app.supabase.io/)
   - Navigate to your account settings
   - Generate an access token

2. **SUPABASE_PROJECT_REF**:
   - The reference ID of your Supabase project (found in project settings)

3. **SUPABASE_URL** and **SUPABASE_ANON_KEY**:
   - Found in your Supabase project dashboard under "Settings" > "API"
   - Use the production URL and anon key for these values

4. **SUPABASE_SERVICE_ROLE_KEY**:
   - Found in your Supabase project dashboard under "Settings" > "API"
   - Copy the service_role key (keep this secure, it has full access to your database)

5. **SUPABASE_STAGING_URL** and **SUPABASE_STAGING_ANON_KEY**:
   - Create a separate Supabase project for staging
   - Get the URL and anon key from that project

## Best Practices for Managing Secrets

1. **Regular rotation**: Periodically update your secrets for better security
2. **Least privilege**: Give tokens the minimum permissions necessary
3. **Different values for environments**: Use different tokens for production and staging
4. **Never print secrets**: Avoid logging or printing secrets in your workflows
5. **Audit access**: Regularly check who has access to repository settings

## Using Secrets in Workflows

In our workflow file (`.github/workflows/ci-cd.yml`), secrets are accessed using the syntax `${{ secrets.SECRET_NAME }}`. For example:

```yaml
steps:
  - name: Deploy to Supabase
    run: supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
    env:
      SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

## Limitations

- Secrets are limited to 64 KB in size
- GitHub Actions automatically redacts secrets when they appear in workflow logs
- Secrets are not passed to workflows from forked repositories
- Organization-level secrets can be restricted to specific repositories

For more detailed information, refer to the [GitHub Actions documentation on using secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions).