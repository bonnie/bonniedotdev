#!/usr/bin/bash

cd "/home/ubuntu/bonniedotdev/server/app"
echo "--------------> 1/3 backing up uploads"
rm -rf backup
mkdir backup
cp -r app/$BDD_UPLOAD_FOLDER backup

echo "--------------> 2/3 unpacking new static"
cp -r static backup
tar xvf static.tar
rm static.tar

echo "--------------> 3/3 moving in new index.html"
cp index.html backup
mv index.html.new index.html
