/*\
title: $:/core/modules/github.js
type: application/javascript
module-type: lifestream

WordPress blog module

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var GitHubModule = function(config) {
    var GitHub = require('github-js-client').GitHub;
    this.gitHub = new GitHub();
    this.accountName = config.accountName
};

GitHubModule.prototype.load = function() {
    this.gitHub.getUsersRepos(this.accountName,
        function (code, data) {
            console.log('ERROR [%s] - [%s]', code, data);
        },
        function (data) {
            for (var cnt=0; cnt<data.length; cnt++) {
                $tw.wiki.addTiddler({title: "GitHubRepo" + data[cnt].name, text: JSON.stringify(data[cnt]), tags: "GitHubRepo", type: "application/json"});
            }
        }
    );
    this.gitHub.getUsersGists(this.accountName,
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

exports.info = {
    name: "github",
    synchronous: true
};

exports.execute = function(config) {
    new GitHubModule(config).load();
};

})();