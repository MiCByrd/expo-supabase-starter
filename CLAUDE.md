# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands
- `pnpm dev:mobile` - Start mobile app in development mode
- `pnpm ios` / `pnpm android` - Start on iOS/Android
- `pnpm lint` - Run ESLint to check code style
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm supabase:start` - Start Supabase local development
- `pnpm supabase:stop` - Stop Supabase local development

## Code Style Guidelines
- Use Prettier formatting with 80 char width, tabs (width 2), double quotes
- Follow ESLint rules from eslint-config-universe/native
- Strict TypeScript: use explicit types, no implicit any, strict null checks
- Components: Follow shadcn/ui design philosophy, use Tailwind/NativeWind for styling
- State: Use React Hook Form for forms, Zod for schema validation
- Imports: Group imports by type (React, external libs, internal), alphabetize
- Error handling: Use try/catch with appropriate error typing
- Naming: camelCase for variables/functions, PascalCase for components/types