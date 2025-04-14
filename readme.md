# Expo Supabase Monorepo

![social-preview-dark](https://github.com/user-attachments/assets/bcee6db2-6dd0-435f-8255-3f4b36b4cfdc)

## Introduction

This monorepo contains a React Native application with Expo and Supabase integration, structured to provide clean separation of concerns and strong type safety. It integrates various technologies such as Expo Router for navigation, Tailwind CSS for styling, React-Hook-Form for form handling, Zod for schema validation, and TypeScript for type safety.

#### Disclaimer

This is not supposed to be a template, boilerplate or a framework. It is an opinionated guide that shows how to do some things in a certain way. You are not forced to do everything exactly as it is shown here, decide what works best for you and your team and stay consistent with your style.

## Table of Contents

- [💻 Application Overview](docs/application-overview.md)
- [⚙️ Project Configuration](docs/project-configuration.md)
- [🗄️ Project Structure](docs/project-structure.md)
- [🧱 Components And Styling](docs/components-and-styling.md)
- [🗃️ State Management](docs/state-management.md)

## Structure

This monorepo is organized into the following packages:

- `apps/mobile`: The React Native + Expo application
- `packages/shared`: Shared utilities, types, and components
- `packages/supabase`: Supabase migrations, edge functions, and database management

## Getting Started

### Prerequisites

- Node.js v18+
- PNPM v10+
- Docker (for local Supabase)

### Installation

```bash
# Install dependencies
pnpm install

# Start the mobile app
pnpm dev:mobile
```

## Environment Setup

The project supports different environments through environment variable files:

### Required Environment Files

1. **Root level** (used by setup scripts and shared packages):
   - `.env.development` - For development environment
   - `.env.staging` - For staging environment (optional)
   - `.env.production` - For production environment
   - `.env` - Default environment file

2. **Mobile app level** (required even if variables exist at root level):
   - `apps/mobile/.env` - Environment variables for the mobile app

Copy the corresponding `.env.example` files to create these files with appropriate values.

### Available Environment Variables

#### Root Level (/.env*)

```
# Common variables
NODE_ENV=development  # Can be development, staging, or production

# Supabase variables
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# For deployment
SUPABASE_PROJECT_REF=your_project_ref
```

#### Mobile App Level (/apps/mobile/.env)

```
# Required Supabase connection details
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Environment Variable Usage

**Important Note**: The mobile app currently requires its own `.env` file with Supabase connection details, even if they are also defined at the root level. This is due to how Expo handles environment variables.

#### In Mobile App:

```typescript
// Direct usage in the mobile app
import { supabase } from "@/config/supabase";

// The supabase client is already configured with the environment variables
const { data } = await supabase.from('table').select('*');
```

#### In Shared Package (Future Enhancement):

```typescript
// Future pattern for using environment config from shared package
import { getEnvironmentConfig } from "@monorepo/shared";

// Get typed config with all variables
const config = getEnvironmentConfig();
console.log(config.supabaseUrl);
```

## Commands

### Main Commands

- `pnpm dev:mobile`: Start the mobile app (using direct PNPM filtering)
- `pnpm android`: Run on Android
- `pnpm ios`: Run on iOS
- `pnpm web`: Run on web
- `pnpm lint`: Lint all packages
- `pnpm typecheck`: Type check all packages
- `pnpm build`: Build all packages
- `pnpm gen:types`: Generate TypeScript types from Supabase

### PNPM vs Turborepo

This monorepo uses both direct PNPM workspace filtering and Turborepo for different use cases:

#### Direct PNPM Filtering
```bash
pnpm --filter <package-name> <command>
```

- Used for interactive development scripts (`pnpm dev:mobile`)
- Maintains stdin/stdout passthrough for interactive CLI tools
- Best for development servers that require user input
- Example: `pnpm --filter mobile dev:mobile`

#### Turborepo
```bash
pnpm <command>:turbo
```

- Used for build pipelines with complex dependencies
- Provides caching and optimized execution
- Best for CI/CD and non-interactive tasks
- Example: `pnpm dev:mobile:turbo` (alternative for CI/CD environments)

Choose the appropriate approach based on your needs:
- Use direct PNPM filtering for daily development
- Use Turborepo for build processes and CI/CD pipelines

## Local Supabase Setup

This monorepo includes a script to easily set up a local Supabase instance for development:

```bash
# One-command setup for local Supabase
pnpm supabase:setup
```

This script will:
1. Check if Docker is running
2. Install Supabase CLI if needed
3. Start a local Supabase instance
4. Create a `.env.development` file with the correct credentials
5. Generate TypeScript types from your database schema

### Supabase Commands

- `pnpm supabase:setup`: First-time setup and start
- `pnpm supabase:start`: Start the local Supabase instance
- `pnpm supabase:stop`: Stop the local Supabase instance
- `pnpm supabase:status`: Check the status of your local Supabase

### Accessing Supabase Studio

Your local Supabase Studio is available at:
- http://localhost:54323

This gives you a web interface to manage your database, authentication, storage, and more.

## Monorepo Development Workflow

### Working with Packages

When developing across multiple packages:

1. **Make changes in the shared package**:
   ```bash
   cd packages/shared
   # Edit files...
   pnpm build
   ```

2. **Use the changes in the mobile app**:
   ```bash
   # Changes are automatically available due to workspace references
   cd apps/mobile
   pnpm dev:mobile
   ```

### Common Workflows

- **Adding a new shared utility**:
  1. Create the utility in `packages/shared/src/utils/`
  2. Export it in the appropriate index.ts file
  3. Run `pnpm build` in the shared package
  4. Import from `@monorepo/shared` in the mobile app

- **Creating Supabase edge functions**:
  1. Add function in `packages/supabase/functions/`
  2. Test locally with `cd packages/supabase && supabase functions serve`
  3. Deploy with `pnpm --filter @monorepo/supabase deploy:functions`

- **Generating database types**:
  1. Make schema changes in Supabase
  2. Run `pnpm gen:types` to update TypeScript definitions
  3. Types are available throughout the monorepo

## Benefits of This Monorepo

### Strong Type Safety

By generating TypeScript types from your Supabase schema and enhancing them with custom interfaces, you get end-to-end type safety from your database to your UI.

### Environment Management

The configuration system allows for seamless switching between development, staging, and production environments, making testing and deployment more reliable.

### Code Sharing

The shared package enables you to reuse code between your mobile app and potentially other future applications, reducing duplication and ensuring consistency.

### Efficient Dependency Management

PNPM's efficient structure saves disk space and speeds up installation times, particularly valuable as the project grows.

### Centralized Supabase Management

Having all Supabase components (migrations, functions, seeds) in one package makes it easier to track changes to your backend and maintain consistency across environments.

## Contributing

Contributions to this starter project are highly encouraged and welcome! If you have any suggestions, bug reports, or feature requests, please feel free to create an issue or submit a pull request. Let's work together to enhance the developer experience and make it easier for everyone to build exceptional Expo applications with Supabase.

## License

This repository is licensed under the MIT License. You are granted the freedom to use, modify, and distribute the code for personal or commercial purposes. For more details, please refer to the [LICENSE](https://github.com/FlemingVincent/supabase-starter/blob/main/LICENSE) file.

## Next Steps After Setup

After setting up the monorepo and local Supabase, here are the recommended next steps:

1. **Create Supabase database tables**:
   - Use the Supabase Studio at http://localhost:54323 to create tables
   - Typical tables include users, profiles, etc.
   - After creating tables, run `pnpm gen:types` to update TypeScript definitions

2. **Migrate Supabase client usage**:
   - The current app uses `@/config/supabase` for the Supabase client
   - Eventually you'll want to update imports to use `@monorepo/shared` package:
     ```typescript
     // Change from
     import { supabase } from "@/config/supabase";
     
     // To
     import { supabase } from "@monorepo/shared";
     ```

3. **Develop using the monorepo structure**:
   - Add shared utilities in `packages/shared/src/utils/`
   - Create Edge Functions in `packages/supabase/functions/`
   - Develop the mobile app in `apps/mobile/`

## Troubleshooting

### Common Issues

- **Metro bundler can't find dependencies**
  - Ensure your metro.config.js is properly configured to look in both the package's and root node_modules
  - Try clearing Metro cache: `cd apps/mobile && npx expo start -c`

- **Type errors with shared package imports**
  - Run `pnpm build` in the shared package to ensure type definitions are current
  - Check that tsconfig.json paths are correctly configured

- **Interactive commands not working through Turborepo**
  - Use direct PNPM filtering instead: `pnpm --filter mobile dev:mobile`
  - Interactive CLI tools work best with direct filtering

- **Dependency version conflicts**
  - Check for duplicate dependencies with `pnpm why <package-name>`
  - Use consistent versions across packages when possible

## Developed with

- [Expo](https://expo.dev/)
- [Supabase](https://supabase.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [PNPM](https://pnpm.io/)
- [Turborepo](https://turbo.build/repo)