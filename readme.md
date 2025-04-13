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

The project supports different environments:

- Development: `.env.development`
- Staging: `.env.staging`
- Production: `.env.production`

Copy `.env.example` to create these files with the appropriate values.

## Commands

- `pnpm dev:mobile`: Start the mobile app
- `pnpm android`: Run on Android
- `pnpm ios`: Run on iOS
- `pnpm web`: Run on web
- `pnpm lint`: Lint all packages
- `pnpm typecheck`: Type check all packages
- `pnpm build`: Build all packages
- `pnpm gen:types`: Generate TypeScript types from Supabase

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

## Developed with

- [Expo](https://expo.dev/)
- [Supabase](https://supabase.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [PNPM](https://pnpm.io/)
- [Turborepo](https://turbo.build/repo)