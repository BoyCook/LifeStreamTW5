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
    var tiddler = this.renderer.renderTree.wiki.getTiddler(this.tiddlerTitle);
    var data = JSON.parse(tiddler.fields.text);

    this.tag = "div";
    this.attributes ={"class": "item-container"};
    this.children = this.renderer.renderTree.createRenderers(this.renderer.renderContext, [
        {
            type: "element",
            tag: "$view",
            children: [{
                type: "text", text: JSON.stringify(data.text)
            }]
        }, {
            type: "element",
            tag: "text",
            children: [{
                type: "text", text: "Tweeted: " + data.created_at
            }]
        }
    ]);
};

exports.tweetView = TweetView;

})();
