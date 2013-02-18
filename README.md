## About

A TiddlyWiki5 edition containing integrations with:

* Twitter
* WordPress
* GitHub
* Jenkins

## Setup

To get going all you need is to create a config.json which will contain your config for the different integrations.
Things like OAuth keys, account names and URLs. See the tiddler LifestreamConfig for example JSON.

## Usage

To start the service simply use the script serve.sh:

    ./serve.sh

or to run in the background pass in any parameter:

    ./serve.sh back
