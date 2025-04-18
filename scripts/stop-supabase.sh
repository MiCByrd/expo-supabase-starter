#!/bin/bash
# stop-supabase.sh
# Script to properly stop all running Supabase instances

# Print colored output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Stopping all Supabase instances ===${NC}"

# Check for any running Supabase containers
echo -e "${YELLOW}Checking for running Supabase containers...${NC}"
CONTAINERS=$(docker ps | grep supabase | wc -l)

if [ "$CONTAINERS" -gt 0 ]; then
  echo -e "${YELLOW}Found $CONTAINERS running Supabase containers. Stopping...${NC}"
  
  # Try to stop nicely using Supabase CLI first
  echo -e "${YELLOW}Trying to stop using Supabase CLI...${NC}"
  cd "$(dirname "$0")/../packages/supabase" 2>/dev/null || echo "No packages/supabase directory found"
  supabase stop || echo "Couldn't stop using Supabase CLI, will try direct Docker approach"
  
  # Force stop all Supabase containers if any remain
  if docker ps | grep -q supabase; then
    echo -e "${YELLOW}Some containers still running. Stopping all Supabase containers...${NC}"
    docker stop $(docker ps -q --filter name=supabase_) 2>/dev/null
  fi
  
  echo -e "${GREEN}All Supabase containers stopped.${NC}"
  
  # Clean up stopped containers
  echo -e "${YELLOW}Cleaning up stopped Supabase containers...${NC}"
  if docker ps -a | grep -q supabase; then
    docker rm $(docker ps -a -q --filter name=supabase_) 2>/dev/null
    echo -e "${GREEN}Removed stopped Supabase containers.${NC}"
  fi
else
  echo -e "${GREEN}No running Supabase containers found.${NC}"
  
  # Check for stopped containers
  echo -e "${YELLOW}Checking for stopped Supabase containers...${NC}"
  if docker ps -a | grep -q supabase; then
    echo -e "${YELLOW}Found stopped Supabase containers. Removing...${NC}"
    docker rm $(docker ps -a -q --filter name=supabase_) 2>/dev/null
    echo -e "${GREEN}Removed stopped Supabase containers.${NC}"
  fi
fi

# Just print the completion message, no need to navigate

echo -e "${GREEN}=== Supabase shutdown complete! ===${NC}"