#!/bin/bash

echo "** Postbuild **"

# define server destination dir
SERVERDIR='../../server/app'

# Browse into './build/' directory
cd build

echo '1/3 Move build/static to server/app'
rm -rf $SERVERDIR/static
mv static $SERVERDIR

echo '2/3 move index.html to server directory'
mv index.html $SERVERDIR

echo '3/3 move `manifest.json`, `asset-manifest.json` and `robots.txt` to server public directory'
mv manifest.json asset-manifest.json robots.txt $SERVERDIR/public
