#!/bin/bash

# Ensure NVM is installed
if ! type nvm > /dev/null 2>&1; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Load NVM
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js v20
nvm install 20
nvm use 20
nvm alias default 20

# Install PM2 globally
npm install -g pm2

# Install Yarn (Berry version)
corepack enable
corepack prepare yarn@stable --activate

echo "Node.js version:"
node -v
echo "PM2 version:"
pm2 -v
echo "Yarn version:"
yarn -v
