#!/bin/bash

# Ask for commit message
clear
echo "enter commit message" 
read message
echo "commit message will be  >> Update: $message << is that right?"
read response
if [[ $response == "n" ]]; then
echo "commit procedure aborted"
else
echo "starting commit procedure"
git add . 
git commit -m "Update: $message"
echo "push to github?"
read shouldpush
if [[ $shouldpush == "y" ]]; then
echo "pushing to github"
git push
else
echo "not pushing to github"
fi
fi 
