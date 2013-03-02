/*\
title: $:/tiddlywiki/plugins/socketclient.js
type: application/javascript
module-type: browser-startup

Socket.IO browser syncer plugin

\*/
(function(){

/*jslint node: true, browser: true */
"use strict";

var SocketClient = function() {
    var socket = io.connect('http://localhost');
    socket.on('tiddler-add', function (tiddler) {
        $tw.wiki.addTiddler(tiddler.fields);
    });
    socket.on('tiddler-remove', function (tiddler) {
        $tw.wiki.deleteTiddler(tiddler.fields.title);
    });
};

new SocketClient();

})();
