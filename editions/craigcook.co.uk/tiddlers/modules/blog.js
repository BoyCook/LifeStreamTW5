/*\
title: $:/core/modules/blog.js
type: application/javascript
module-type: server

WordPress blog module

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var fs = require("fs");
var WordPress = require('wordpress-js-client').WordPress;

var BlogModule = function() {
    this.config = JSON.parse(fs.readFileSync('../../config.json'));
    this.blog = new WordPress(this.config.wordPress);
    this.blogName = 'boycook.wordpress.com';
};

BlogModule.prototype.load = function() {
    //TODO: do this every minute and update client
    this.blog.getPosts(this.blogName, undefined,
        function (code, data) {
            console.log('ERROR [%s] - [%s]', code, data);
        },
        function (data) {
            for (var cnt=0; cnt<data.posts.length; cnt++) {
                $tw.wiki.addTiddler({title: "Blog" + data.posts[cnt].ID, text: JSON.stringify(data.posts[cnt]), tags: "blog", type: "application/json"});
            }
        }
    );
};

exports.execute = function() {
    new BlogModule().load();
};

})();