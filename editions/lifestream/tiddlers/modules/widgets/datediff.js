/*\
title: $:/core/modules/widget/datediff.js
type: application/javascript
module-type: widget

Implements the version widget.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var DateDiff = function(d1, d2) {
    this.d1 = d1;
    this.d2 = d2;
    return this;
};

DateDiff.prototype.diff = function() {
    var diff = (this.d1 - this.d2);

    if (diff < 45000) { // < 35 seconds
        return "Just now";
    } else if (diff < 75000) { // < 75 seconds
        return "About a minute ago";
    } else if (diff < 3600000) { // < 1 hour (1000*60*60)
        return Math.round(diff / 60000) + " minutes ago";
    } else if (diff < 86400000) { // < 1 day (1000*60*60*24)
        return Math.round(diff / 3600000) + " hours ago";
    } else if (diff < 604800000) { // < 1 week (1000*60*60*24*7)
        return Math.round(diff / 86400000) + " days ago";
    } else if (diff < 3144960000) { // < 1 year (1000*60*60*24*52)
        return Math.round(diff / 604800000) + " weeks ago";
    } else if (diff > 3144960000) { // > 1 year (1000*60*60*24*52)
        return Math.round(diff / 3144960000) + " years ago"; //TODO: add in months
    }
    return diff + " ms ago"
};

DateDiff.prototype.calculate = function() {

};

var DateDiffWidget = function(renderer) {
	this.renderer = renderer;
	this.generate();
};

DateDiffWidget.prototype.generate = function() {
    this.date = this.renderer.getAttribute("date");
	this.tag = "span";
	this.attributes = {};
	this.children = this.renderer.renderTree.createRenderers(this.renderer.renderContext,[{
		type: "text",
		text: new DateDiff(new Date(), new Date(this.date)).diff()
	}]);
};

exports.dateDiff = DateDiffWidget;

})();
