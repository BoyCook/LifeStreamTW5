/*\
title: $:/core/modules/widget/linkfromtiddler.js
type: application/javascript
module-type: widget

Implements the BlogView widget.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var LinkFromTiddler = function(renderer) {
	// Save state
	this.renderer = renderer;
	this.generate();
};

LinkFromTiddler.prototype.generate = function() {
	// Set the element
    this.tiddlerTitle = this.renderer.getAttribute("tiddler",this.renderer.getContextTiddlerTitle());
    var data = this.renderer.renderTree.wiki.getTiddlerData(this.tiddlerTitle);
    var href = this.renderer.getAttribute("href", undefined);
    var text = this.renderer.getAttribute("text", undefined);

    this.tag = "div";

    this.attributes = {"class": "item-container"};
    var children = [
        {
            type: "element",
            tag: "$link",
            attributes: {
                to: {type: "string", value: data[href]}
            },
            children: [
                {
                    type: "element",
                    tag: "h4",
                    children: [
                        {
                            type: "text", text: data[text]
                        }
                    ]}
            ]
        }
    ];
    this.children = this.renderer.renderTree.createRenderers(this.renderer.renderContext, children);
};

exports.linkFromTiddler = LinkFromTiddler;

})();
