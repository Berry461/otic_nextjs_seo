#!/bin/bash
# Rebuilds the OTIC frontend after a blog post is saved or deleted,
# then restarts the server so it loads the new build.

export PATH=/usr/local/bin:/usr/bin:/bin:$PATH

FLAG_FILE="/var/www/oticweblog/flags/build_otic_frontend.flag"
FRONTEND_DIR="/var/www/oticweblog/frontend"
LOCK_FILE="/var/lock/otic_autobuild.lock"

# Only one run at a time; a second run exits silently
exec 9>"$LOCK_FILE"
flock -n 9 || exit 0

# Nothing to do without a flag
[ -f "$FLAG_FILE" ] || exit 0

echo "New blog post detected! Starting build at $(date)"

# Delete the flag first so a save during the build triggers a fresh build next minute
rm -f "$FLAG_FILE"

cd "$FRONTEND_DIR" || exit 1

if nice -n 10 npm run build; then
    echo "Build complete at $(date)"
    if pm2 restart otic-frontend; then
        echo "otic-frontend restarted at $(date)"
    else
        echo "ERROR: pm2 restart failed at $(date)"
    fi
else
    echo "ERROR: build failed at $(date), server not restarted"
fi