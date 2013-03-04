/*\
title: $:/core/modules/blog.js
type: application/javascript
module-type: lifestream

WordPress blog module

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var BlogModule = function(config) {
    var WordPress = require('wordpress-js-client').WordPress;
    this.blog = new WordPress(config);
    this.blogName = config.blogName;
};

BlogModule.prototype.load = function() {
    this.blog.getPosts(this.blogName, undefined,
        function (err, response, body) {
            console.log('ERROR [%s] - [%s] - [%s]', err, response, body);
        },
        function (body) {
            var data = $tw.wiki.parseJSON(body);
            if (data == undefined) {
                console.log('WARNING - no WordPress data, unable to process');
            } else {
                for (var cnt=0; cnt<data.posts.length; cnt++) {
                    $tw.wiki.addTiddler({title: "Blog" + data.posts[cnt].ID, text: JSON.stringify(data.posts[cnt]), tags: "blog", type: "application/json"});
                }
            }
        }
    );
};

exports.info = {
    name: "wordpress",
    synchronous: true
};

exports.execute = function(config) {
    new BlogModule(config).load();
};

})();