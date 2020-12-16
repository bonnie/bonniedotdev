#!/bin/bash

echo "** Postbuild **"

# define server destination dir
SERVERDIR='../../server/app'

# Browse into './build/' directory
cd build

echo '1/4 Move build/static to server/app'
rm -rf $SERVERDIR/static
mv static $SERVERDIR

echo '2/4 move index.html to server directory'
mv index.html $SERVERDIR

echo '3/4 move `manifest.json`, `asset-manifest.json` and `robots.txt` to server public directory'
mv manifest.json asset-manifest.json robots.txt $SERVERDIR/static

echo '4/4 move favicon dir to server directory'
mv favicon $SERVERDIR/static
