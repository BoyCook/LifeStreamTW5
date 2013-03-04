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

GitHubModule.prototype.error = function(err, response, body) {
    console.log('ERROR [%s] - [%s] - [%s]', err, response, body);
};


GitHubModule.prototype.load = function() {
    var context = this;
    this.gitHub.getUsersRepos(this.accountName,
        context.error,
        function (body) {
            var data = $tw.wiki.parseJSON(body);
            if (data == undefined) {
                console.log('WARNING - no GitHub data, unable to process');
            } else {
                for (var cnt=0; cnt<data.length; cnt++) {
                    $tw.wiki.addTiddler({title: "GitHubRepo" + data[cnt].name, text: JSON.stringify(data[cnt]), tags: "GitHubRepo", type: "application/json"});
                }
            }
        }
    );
    this.gitHub.getUsersGists(this.accountName,
        context.error,
        function (body) {
            var data = $tw.wiki.parseJSON(body);
            if (data == undefined) {
                console.log('WARNING - no GitHub data, unable to process');
            } else {
                for (var cnt=0; cnt<data.length; cnt++) {
                    $tw.wiki.addTiddler({title: "GitHubGist" + data[cnt].id, text: JSON.stringify(data[cnt]), tags: "GitHubGist", type: "application/json"});
                }
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