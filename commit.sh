#!/bin/bash

# Ask for commit message
clear
read -p "enter commit message: " message 
read -p "commit message will be  >> Update: $message <<. Push to github? " response 
git add . 
git commit -m "Update: $message"
if [[ $response == "y" ]]; then
git push
else
echo "not pushing to github"
fi 
