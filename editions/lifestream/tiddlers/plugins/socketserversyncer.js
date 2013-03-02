/*\
title: $:/tiddlywiki/plugins/socketserversyncer.js
type: application/javascript
module-type: server-syncer

Socket.IO server syncer plugin

\*/
(function(){

/*jslint node: true, browser: true */
"use strict";

var SocketServerSyncer = function() {
};

SocketServerSyncer.prototype.addTiddler = function(tiddler) {
    if ($tw.server) {
        $tw.server.io.sockets.emit('tiddler-add', tiddler);
    }
};

SocketServerSyncer.prototype.removeTiddler = function(tiddler) {
    if ($tw.server) {
        $tw.server.io.sockets.emit('tiddler-remove', tiddler);
    }
};

exports.name = "socketserversyncer";
exports.syncer = SocketServerSyncer;

})();
