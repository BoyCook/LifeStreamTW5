/*\
title: $:/core/modules/parsers/textparser.js
type: application/javascript
module-type: parser

The plain text parser processes blocks of source text into a degenerate parse tree consisting of a single text node

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports["text/raw"] = function (type, text, options) {
this.tree = [{
        type: "text", text: text
    }];
};

})();

