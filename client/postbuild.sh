#!/bin/bash

echo "** Postbuild **"

# define server destination dir
SERVERDIR='../../server/app'

# Browse into './build/' directory
cd build

echo '1/2 Move build/static to server/app'
rm -rf $SERVERDIR/static
mv static $SERVERDIR

echo '2/2 move index.html to server directory'
mv index.html $SERVERDIR
