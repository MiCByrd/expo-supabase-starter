#!/bin/bash
# setup-supabase.sh
# Script to set up and start a local Supabase instance for development

# Print colored output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Setting up local Supabase for development ===${NC}"

# Check if Docker is running
echo -e "${YELLOW}Checking if Docker is running...${NC}"
if ! docker info > /dev/null 2>&1; then
  echo -e "${YELLOW}Docker is not running. Please start Docker and try again.${NC}"
  exit 1
fi

# Check if Supabase CLI is installed
echo -e "${YELLOW}Checking Supabase CLI...${NC}"
if ! command -v supabase &> /dev/null; then
  echo -e "${YELLOW}Supabase CLI not found. Installing globally...${NC}"
  npm install -g supabase
fi

# Navigate to Supabase package
echo -e "${YELLOW}Navigating to Supabase package...${NC}"
cd "$(dirname "$0")/../packages/supabase" || exit

# Check if Supabase is already running
echo -e "${YELLOW}Checking if Supabase is already running...${NC}"
SUPABASE_STATUS=$(supabase status 2>&1)
if [[ $SUPABASE_STATUS == *"running"* ]]; then
  echo -e "${GREEN}Supabase is already running.${NC}"
else
  # Start Supabase
  echo -e "${YELLOW}Starting local Supabase...${NC}"
  supabase start
fi

# Get Supabase credentials
echo -e "${YELLOW}Getting Supabase credentials...${NC}"
SUPABASE_URL="http://localhost:54321"
ANON_KEY=$(supabase status | grep "anon key:" | sed -E 's/.*anon key: +([^ ]+).*/\1/')
SERVICE_ROLE_KEY=$(supabase status | grep "service_role key:" | sed -E 's/.*service_role key: +([^ ]+).*/\1/')

# Create .env.development file in root
echo -e "${YELLOW}Creating .env.development file...${NC}"
cd "$(dirname "$0")/.." || exit
cat > .env.development << EOF
# Generated by setup-supabase.sh
EXPO_PUBLIC_SUPABASE_URL=$SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SERVICE_ROLE_KEY
EOF

# Generate types
echo -e "${YELLOW}Generating TypeScript types from database schema...${NC}"
cd "packages/supabase" || exit
supabase gen types typescript --local > ../shared/src/types/database.ts

# Return to root
cd "../.." || exit

echo -e "${GREEN}=== Supabase setup complete! ===${NC}"
echo -e "${GREEN}Local Supabase is running at: ${SUPABASE_URL}${NC}"
echo -e "${GREEN}Studio URL: http://localhost:54323${NC}"
echo -e "${GREEN}Environment variables have been added to .env.development${NC}"
echo -e "${GREEN}TypeScript types have been generated${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo -e "${BLUE}1. Run 'pnpm build' to build the shared package with updated types${NC}"
echo -e "${BLUE}2. Run 'pnpm dev:mobile' to start the mobile app${NC}"
echo ""
echo -e "${YELLOW}To stop Supabase later, run: pnpm --filter @monorepo/supabase stop${NC}"