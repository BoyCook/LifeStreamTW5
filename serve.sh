#!/bin/bash
# Serve TiddlyWiki5 over HTTP

# Check for edition location
if [  -z "$TW5_EDITION" ]; then
    TW5_EDITION=editions/lifestream
fi

if [  ! -d "$TW5_EDITION" ]; then
    echo 'A valid TW5_EDITION directory must be set'
    exit 1
fi

# Check for tiddlywiki.js file
if [  -z "$TW5_LOC" ]; then
    TW5_LOC="./node_modules/tiddlywiki/tiddlywiki.js"
fi

if [  ! -f "$TW5_LOC" ]; then
    echo 'A valid TW5_LOC file must be set'
    exit 1
fi

echo "Using TW5_EDITION as [$TW5_EDITION]"
echo "Using TW5_LOC as [$TW5_LOC]"

#rm -r editions/lifestream/tiddlers/generated

if [ $# -eq 1 ]
then
    nohup node $TW5_LOC \
        $TW5_EDITION \
        --verbose \
        --lifestream ../config.json twitter wordpress github jenkins \
        --server 30080 $:/core/templates/tiddlywiki5.template.html text/plain text/html \
        1> webserver.log &
else
    node $TW5_LOC \
        $TW5_EDITION \
        --verbose \
        --lifestream ../config.json twitter wordpress github jenkins \
        --server 30080 $:/core/templates/tiddlywiki5.template.html text/plain text/html \
        || exit 1
fi
