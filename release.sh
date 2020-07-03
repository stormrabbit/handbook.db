#!/bin/bash
echo "===========开始发布==========="
npm run remenu
npm run build
cd _book 
git init
git add .
git commit -m 'release'
git remote add gitbook git@angrykitty.link:/var/repo/handbook.git
git push -u -f gitbook master

echo "===========发布结束==========="