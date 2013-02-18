/*\
title: $:/core/modules/jenkins.js
type: application/javascript
module-type: lifestream

Jenkins module

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var JenkinsModule = function(config) {
    var Jenkins = require('jenkins-js-client').Jenkins;
    this.jenkins = new Jenkins({baseUrl: config.baseUrl});
};

JenkinsModule.prototype.load = function() {
    this.jenkins.getCore(
        function (err, response, body) {
            console.log('ERROR [%s] - [%s] - [%s]', err, response, body);
        },
        function (data) {
            for (var cnt=0; cnt<data.jobs.length; cnt++) {
                $tw.wiki.addTiddler({title: "JenkinsBuild" + data.jobs[cnt].name, text: JSON.stringify(data.jobs[cnt]), tags: "JenkinsBuild", type: "application/json"});
            }
        }
    );
};

exports.info = {
    name: "jenkins",
    synchronous: true
};

exports.execute = function(config) {
    new JenkinsModule(config).load();
};

})();