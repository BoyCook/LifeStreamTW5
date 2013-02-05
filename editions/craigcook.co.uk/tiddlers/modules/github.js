/*\
title: $:/core/modules/github.js
type: application/javascript
module-type: server

WordPress blog module

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var fs = require("fs");
var GitHub = require('github-js-client').GitHub;

var GitHubModule = function(){
    this.gitHub = new GitHub();
    this.userName = 'BoyCook';
};

GitHubModule.prototype.load = function() {
    //TODO: do this every minute and update client
    this.gitHub.getUsersRepos(this.userName,
        function (code, data) {
            console.log('ERROR [%s] - [%s]', code, data);
        },
        function (data) {
            for (var cnt=0; cnt<data.length; cnt++) {
                $tw.wiki.addTiddler({title: "GitHubRepo" + data[cnt].name, text: JSON.stringify(data[cnt]), tags: "GitHubRepo", type: "application/json"});
            }
        }
    );
    this.gitHub.getUsersGists(this.userName,
        function (code, data) {
            console.log('ERROR [%s] - [%s]', code, data);
        },
        function (data) {
            for (var cnt=0; cnt<data.length; cnt++) {
                $tw.wiki.addTiddler({title: "GitHubGist" + data[cnt].id, text: JSON.stringify(data[cnt]), tags: "GitHubGist", type: "application/json"});
            }
        }
    );
};

exports.execute = function() {
    new GitHubModule().load();
};

})();