#!/bin/bash

FLAG_FILE="/var/www/oticweblog/flags/build_otic_frontend.flag"
FRONTEND_DIR="/var/www/oticweblog/frontend"

# Check if the flag file exists
if [ -f "$FLAG_FILE" ]; then
    echo "New blog post detected! Starting build at $(date)"
    
    # 1. Delete the flag immediately so we don't run it twice
    rm -f "$FLAG_FILE"
    
    # 2. Go to the frontend directory
    cd "$FRONTEND_DIR" || exit
    
    # 3. Run your automated build command
    npm run build
    
    echo "Build complete at $(date)"
fi
