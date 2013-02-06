/*\
title: $:/core/modules/twitter.js
type: application/javascript
module-type: server

Twitter module

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var fs = require("fs");
var Twitter = require('twitter-js-client').Twitter;

var TwitterModule = function() {
    this.config = JSON.parse(fs.readFileSync('../../config.json'));
    this.twitter = new Twitter(this.config.twitter);
    this.params = { screen_name: 'BoyCook', count: '10'};
};

TwitterModule.prototype.load = function() {
    //TODO: do this every minute and update client
    this.twitter.getUserTimeline(this.params,
        function (code, data) {
            console.log('ERROR [%s] - [%s]', code, data);
        },
        function (data) {
            for (var cnt=0; cnt<data.length; cnt++) {
                $tw.wiki.addTiddler({title: "Tweet" + cnt, text: data[cnt].text, tags: "tweet"});
            }
        }
    );
};

exports.execute = function() {
    new TwitterModule().load();
};

})();
