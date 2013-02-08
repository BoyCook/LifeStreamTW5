/*\
title: $:/core/modules/widget/tweetview.js
type: application/javascript
module-type: widget

Implements the TweetView widget.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var TweetView = function(renderer) {
	// Save state
	this.renderer = renderer;
	this.generate();
};

TweetView.prototype.generate = function() {
	// Set the element
    this.tiddlerTitle = this.renderer.getAttribute("tiddler",this.renderer.getContextTiddlerTitle());
    var data = this.renderer.renderTree.wiki.getTiddlerData(this.tiddlerTitle);
    //This is a bit hacky - can't quite crack using $transclude to parse as "text/vnd.tiddlywiki" for JSON field (via index). See transclude.js lines 87 & 90
    var text = this.renderer.renderTree.wiki.renderText("text/html","text/vnd.tiddlywiki", data.text);

    var children = [
        {
            type: "element",
            tag: "div",
            attributes: {"class": {type: "string", value: "tweet-text"} },
            children: [
                {
                    type: "raw", html: text
                }
            ]
        } ,
        {
            type: "element",
            tag: "div",
            children: [
                {
                    type: "text", text: data.created_at
                }
            ]
        }
    ];

    this.tag = "div";
    this.attributes ={"class": "item-container"};
    this.children = this.renderer.renderTree.createRenderers(this.renderer.renderContext, children);

};

exports.tweetView = TweetView;

})();
