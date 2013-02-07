/*\
title: $:/core/modules/parsers/tweetat.js
type: application/javascript
module-type: wikirule

Wiki text block rule for tweet '@' symbol. For example:

@BoyCook

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.name = "tweetat";
exports.types = {inline: true};

exports.init = function(parser) {
	this.parser = parser;
	// Regexp to match
	this.matchRegExp = /\@\w+/mg;
};

exports.parse = function() {
	// Move past the match
    this.parser.pos = this.matchRegExp.lastIndex;
    // Create the link unless it is suppressed
    if(this.match[0].substr(0,1) === "~") {
        return [{type: "text", text: this.match[0].substr(1)}];
    } else {
        var url = 'https://twitter.com/' + this.match[0];
        return [{
            type: "element",
            tag: "$link",
            attributes: {
                to: {type: "string", value: url}
            },
            children: [{
                type: "text", text: this.match[0]
            }]
        }];
    }
};

})();
