#!/bin/bash
echo "===========开始发布==========="
npm run remenu
npm run build
cd _book 
git init
git add .
git add -f search_index.json 
git commit -m 'release'
git remote add angrykitty git@angrykitty.link:/home/wizard/unlimited_blade_works/handbook.git
git push -u -f angrykitty master
echo "===========发布结束==========="