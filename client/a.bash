#!/bin/bash

# git add *
# git commit -m "`date +%Y-%m-%d-%H:%S`"
# git push origin camera
npm run build
cp -r dist/ newName
scp -r newName/ guoningyan@192.167.253.100:~/***/
