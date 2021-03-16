#!/usr/bin/bash

cd "/home/ubuntu/bonniedotdev/server/app"

echo "--------------> 1/2 unpacking new static"
cp -r static backup && tar xvf static.tar && rm static.tar

echo "--------------> 2/2 moving in new index.html"
cp index.html backup && mv index.html.new index.html
