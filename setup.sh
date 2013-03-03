#!/bin/bash
# Setup local config

# Check for edition location
if [  -z "$CSC_CONF" ]; then
    CSC_CONF=/Users/boycook/code/boycook/config/CraigCook
fi

if [  ! -d "$CSC_CONF" ]; then
    echo 'A valid CSC_CONF directory must be set'
    exit 1
fi

echo "Using config at [$CSC_CONF]"

cp $CSC_CONF/config.json ./
cp -r $CSC_CONF/testing ./editions/lifestream/tiddlers

git clone git://github.com/BoyCook/GitHubJSClient.git ./node_modules/github-js-client
git clone git://github.com/BoyCook/JenkinsJSClient.git ./node_modules/jenkins-js-client
