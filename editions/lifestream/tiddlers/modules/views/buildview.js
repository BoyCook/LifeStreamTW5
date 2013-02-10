/*\
title: $:/core/modules/widget/buildview.js
type: application/javascript
module-type: widget

Implements the BlogView widget.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var BuildView = function(renderer) {
	// Save state
	this.renderer = renderer;
	this.generate();
};

BuildView.prototype.generate = function() {
	// Set the element
    this.tiddlerTitle = this.renderer.getAttribute("tiddler",this.renderer.getContextTiddlerTitle());
    var data = this.renderer.renderTree.wiki.getTiddlerData(this.tiddlerTitle);
    var status = this.renderer.getAttribute("status", undefined);

    this.tag = "div";

    if (typeof status === 'undefined' || status == data.color) {
        this.attributes = {"class": "item-container"};
        var children = [
            {
                type: "element",
                tag: "$link",
                attributes: {
                    to: {type: "string", value: data.url}
                },
                children: [
                    {
                        type: "element",
                        tag: "h4",
                        children: [
                            {
                                type: "text", text: data.name
                            }
                        ]}
                ]
            }
        ];
        this.children = this.renderer.renderTree.createRenderers(this.renderer.renderContext, children);
    }
};

exports.buildView = BuildView;

})();
