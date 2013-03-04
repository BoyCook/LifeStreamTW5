/*\
title: $:/tiddlywiki/plugins/socketserversyncer.js
type: application/javascript
module-type: server-syncer

Socket.IO server syncer. This acts when the (server) wiki state changes i.e. add/delete tiddler

\*/
(function(){

/*jslint node: true, browser: true */
"use strict";

var SocketServerSyncer = function() {
    //TODO: don't emit back to sender
    $tw.server.io.sockets.on('connection', function (socket) {
        socket.on('tiddler-add', function (tiddler) {
            tiddler.fields.isSynced = true;  // Slight hack - don't want to have infinite recursion
            $tw.wiki.addTiddler(tiddler.fields);
        });
        socket.on('tiddler-delete', function (title) {
            tiddler.fields.isSynced = true;  // Slight hack - don't want to have infinite recursion
            $tw.wiki.deleteTiddler(title);
        });
    });
};

SocketServerSyncer.prototype.addTiddler = function(tiddler) {
    if ($tw.server && (typeof(tiddler.fields.isSynced) === "undefined" || tiddler.fields.isSynced == false)) {
        $tw.server.io.sockets.emit('tiddler-add', tiddler);
    }
};

SocketServerSyncer.prototype.deleteTiddler = function(title) {
    if ($tw.server && (typeof(tiddler.fields.isSynced) === "undefined" || tiddler.fields.isSynced == false)) {
        $tw.server.io.sockets.emit('tiddler-delete', title);
    }
};

exports.name = "socketserversyncer";
exports.syncer = SocketServerSyncer;

})();
