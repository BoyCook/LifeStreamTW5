#!/bin/bash

# serve TiddlyWiki5 over HTTP


if [  -z "$TW5_EDITION" ]; then
    TW5_EDITION=editions/craigcook.co.uk
fi

if [  ! -d "$TW5_EDITION" ]; then
    echo 'A valid TW5_EDITION directory must be set'
    exit 1
fi

echo "Using TW5_EDITION as [$TW5_EDITION]"

pushd $TW5_EDITION > /dev/null

nohup node ../../node_modules/tiddlywiki/tiddlywiki.js \
	--verbose \
	--server 30080 $:/core/templates/tiddlywiki5.template.html text/plain text/html \
	1> ../../webserver.log &

popd > /dev/null
