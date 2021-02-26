#!/bin/bash

echo "** Postbuild **"

# define server destination dir
SERVERDIR='../../server/app'

# Browse into './build/' directory
cd build

echo '1/6 moving server/app/static/images to server/app/images'
mv $SERVERDIR/static/images $SERVERDIR/images

echo '2/6 deleting server/app/static and replace with build/static'
rm -rf $SERVERDIR/static
mv static $SERVERDIR

echo '3/6 moving server/app/images back into static'
mv $SERVERDIR/images $SERVERDIR/static/images

echo '4/6 moving index.html to server directory'
mv index.html $SERVERDIR

echo '5/6 moving `manifest.json`, `asset-manifest.json`, `robots.txt`, and `sitemap.xml` to server public directory'
mv manifest.json asset-manifest.json robots.txt sitemap.xml $SERVERDIR/static

echo '6/6 moving favicon dir to server directory'
mv favicon $SERVERDIR/static
