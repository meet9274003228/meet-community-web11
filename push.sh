#!/bin/bash

echo "Initializing Git repository..."
git init

echo "Adding files..."
git add .

echo "Committing..."
git commit -m "Initial commit: HackForge Community Website"

echo "Setting main branch..."
git branch -M main

echo "Adding remote origin..."
git remote add origin https://github.com/meet9274003228/meet-community-web11.git

echo "Pushing to GitHub..."
git push -u origin main

echo "Successfully pushed to GitHub!"
