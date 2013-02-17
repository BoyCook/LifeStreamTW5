/*\
title: $:/core/modules/twitter.js
type: application/javascript
module-type: lifestream

Twitter module

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var TwitterModule = function(config) {
    var Twitter = require('twitter-js-client').Twitter;
    this.twitter = new Twitter(config);
    this.params = { screen_name: config.accountName, count: '10'};
};

TwitterModule.prototype.load = function() {
    this.twitter.getUserTimeline(this.params,
        function (code, data) {
            console.log('ERROR [%s] - [%s]', code, data);
        },
        function (data) {
            for (var cnt=0; cnt<data.length; cnt++) {
                $tw.wiki.addTiddler({title: "Tweet" + data[cnt].id_str, text: JSON.stringify(data[cnt]), tags: "tweet", type: "application/json"});
//                $tw.wiki.addTiddler({title: "Tweet" + data[cnt].id_str, text: data[cnt].text, tags: "tweet"});
            }
        }
    );
};

exports.info = {
    name: "twitter",
    synchronous: true
};

exports.execute = function(config) {
    new TwitterModule(config).load();
};

})();
