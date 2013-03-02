/*\
title: $:/tiddlywiki/plugins/filesystemsyncer.js
type: application/javascript
module-type: server-syncer

Socket.IO server syncer plugin

\*/
(function(){

/*jslint node: true, browser: false */
"use strict";

var FileSystemSyncer = function() {
    this.path = 'editions/lifestream/tiddlers/generated';
    if(!$tw.browser) {
        this.fs = require("fs");
        if(!this.fs.existsSync(this.path)) {
            console.log('Output directory [%s] does not exist, creating', this.path);
            this.fs.mkdir(this.path);
        }
    }
};

FileSystemSyncer.prototype.addTiddler = function(tiddler) {
    var context = this;
    var fileName = this.fileName(tiddler);
    if(this.fs.existsSync(fileName)) {
        context.fs.unlink(fileName, function (err) {
            //TODO: there's probably an overwrite option
            if (err) {
                //TODO: handle special chars in filename
                console.log('There was an error deleting tiddler [%s] from filesystem [%s]', tiddler.fields.title, err);
            } else {
                context.writeTiddler(tiddler);
            }
        });
    } else {
        this.writeTiddler(tiddler);
    }
};

FileSystemSyncer.prototype.deleteTiddler = function(tiddler) {
    var fileName = this.fileName(tiddler);
    if(this.fs.existsSync(fileName)) {
        this.fs.unlink(fileName, function (err) {
            if (err) {
                //TODO: handle special chars in filename
                console.log('There was an error deleting tiddler [%s] from filesystem [%s]', tiddler.fields.title, err);
            }
        });
    } else {
        //This could be an error
        console.log('Tiddler [%s] has already been removed from [%s]', tiddler.fields.title, fileName);
    }
};

FileSystemSyncer.prototype.writeTiddler = function(tiddler) {
    var fileName = this.fileName(tiddler);
    this.fs.writeFile(fileName, this.generateFileStr(tiddler, "text/plain"), "utf8", function(err) {
        if (err) {
            //TODO: handle special chars in filename
            console.log('There was an error writing tiddler [%s] to filesystem [%s]', tiddler.fields.title, err);
        }
    });
};

FileSystemSyncer.prototype.generateFileStr = function(tiddler, type) {
    var fileStr = "title: " + tiddler.fields.title + "\n";
    fileStr += "tags: " + tiddler.fields.tags + "\n";
    fileStr += "type: " + tiddler.fields.type + "\n\n";
    fileStr += $tw.wiki.renderTiddler(type, tiddler.fields.title);
    return fileStr;
};

//TODO: handle special chars in filename
FileSystemSyncer.prototype.fileName = function(tiddler) {
    return this.path + '/' + tiddler.fields.title.replace(/ +?/g, '') + ".tid";
};

exports.name = "filesystemsyncer";
exports.syncer = FileSystemSyncer;

})();
