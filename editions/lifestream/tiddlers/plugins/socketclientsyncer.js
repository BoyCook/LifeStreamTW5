/*\
title: $:/tiddlywiki/plugins/socketclientsyncer.js
type: application/javascript
module-type: client-syncer

Socket.IO client syncer. This acts when the (client/browser) wiki state changes i.e. add/delete tiddler

\*/
(function(){

/*jslint node: true, browser: true */
"use strict";

var SocketClientSyncer = function() {
    //TODO: get URL from config - add variable at server.js
    //TODO: SocketServerSyncer and SocketClientSyncer are very similar - try to rationalise
    this.socket = io.connect('http://localhost');
    this.socket.on('tiddler-add', function (tiddler) {
        console.log('Received event in client [%s]', tiddler.fields.title);
        tiddler.fields.isSynced = true; // Slight hack - don't want to have infinite recursion
        $tw.wiki.addTiddler(tiddler.fields);
    });
    this.socket.on('tiddler-delete', function (title) {
        tiddler.fields.isSynced = true; // Slight hack - don't want to have infinite recursion
        $tw.wiki.deleteTiddler(title);
    });
};

SocketClientSyncer.prototype.addTiddler = function(tiddler) {
    if(typeof(tiddler.fields.isSynced) === "undefined" || tiddler.fields.isSynced == false) {
        this.socket.emit('tiddler-add', tiddler);
    }
};

SocketClientSyncer.prototype.deleteTiddler = function(title) {
    if(typeof(tiddler.fields.isSynced) === "undefined" || tiddler.fields.isSynced == false) {
        this.socket.emit('tiddler-delete', title);
    }
};

exports.name = "socketclientsyncer";
exports.syncer = SocketClientSyncer;

})();
