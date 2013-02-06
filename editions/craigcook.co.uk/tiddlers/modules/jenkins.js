/*\
title: $:/core/modules/jenkins.js
type: application/javascript
module-type: server

Jenkins module

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var fs = require("fs");
var Jenkins = require('jenkins-js-client').Jenkins;

var JenkinsModule = function() {
    this.jenkins = new Jenkins({baseUrl: 'http://craigcook.co.uk/build'});
    this.userName = 'BoyCook';
};

JenkinsModule.prototype.load = function() {
    //TODO: do this every minute and update client
    this.jenkins.getCore(
        function (code, data) {
            console.log('ERROR [%s] - [%s]', code, data);
        },
        function (data) {
            for (var cnt=0; cnt<data.jobs.length; cnt++) {
                $tw.wiki.addTiddler({title: "JenkinsBuild" + data.jobs[cnt].name, text: JSON.stringify(data.jobs[cnt]), tags: "JenkinsBuild", type: "application/json"});
            }
        }
    );
};

exports.execute = function() {
    new JenkinsModule().load();
};

})();