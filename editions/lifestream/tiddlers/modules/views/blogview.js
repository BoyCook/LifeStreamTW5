/*\
title: $:/core/modules/widget/blogview.js
type: application/javascript
module-type: widget

Implements the BlogView widget.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var BlogView = function(renderer) {
	// Save state
	this.renderer = renderer;
	this.generate();
};

BlogView.prototype.generate = function() {
	// Set the element
    this.tiddlerTitle = this.renderer.getAttribute("tiddler",this.renderer.getContextTiddlerTitle());
    var tiddler = this.renderer.renderTree.wiki.getTiddler(this.tiddlerTitle);
    var data = JSON.parse(tiddler.fields.text);

    this.tag = "div";
    this.attributes ={"class": "item-container"};
    this.children = this.renderer.renderTree.createRenderers(this.renderer.renderContext, [
        {
            type: "element",
            tag: "$link",
            attributes: {
                to: {type: "string", value: data.URL}
            },
            children: [{
                    type: "element",
                    tag: "h4",
                    children: [{
                        type: "text", text: data.title
                    }]}]
        }, {
            type: "element",
            tag: "div",
            children: [{
                    type: "text", text: "Published: " + data.date
                }]
        }, {
            type: "raw",
            html: data.content
        }
    ]);
};

exports.blogView = BlogView;

})();
