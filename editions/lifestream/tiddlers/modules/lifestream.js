/*\
title: $:/core/modules/lifestream.js
type: application/javascript
module-type: command

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.info = {
    name: "lifestream",
    synchronous: true
};

var Command = function(params,commander,callback) {
    this.params = params;
    this.commander = commander;
    this.callback = callback;
};

Command.prototype.execute = function() {
    var context = this;
    var configFile = this.params[0] ? this.params[0] : '../../config.json';
    var toLoad = this.params.slice(1);
    var config = this.loadConfig(configFile);
    if (!(typeof config === "undefined")) {
        //Execute any lifestream modules that are passed in as params
        $tw.modules.forEachModuleOfType("lifestream", function(title, module) {
            var name = module.info.name;
            if (toLoad.indexOf(name) > -1) {
                console.log('Loading lifestream module [%s] - [%s]', name, title);
                context.loadModule(module, config[name])
            }
        });
    } else {
        console.log('ERROR - Failed to load LifeStream config file, aborting module load');
    }
};

Command.prototype.loadConfig = function(fileName) {
    var config = undefined;
    var fs = require("fs");
    if (fs.existsSync(fileName)) {
        var file = fs.readFileSync(fileName);
        if (!(typeof file === "undefined")) {
            config = JSON.parse(file);
        }
    }
    return config;
};

Command.prototype.loadModule = function(module, config) {
    module.execute(config);
    //Reload every X ms
    $tw.setInterval(function() {
        module.execute(config);
    }, config.reloadPeriod ? config.reloadPeriod : 30000);
};

exports.Command = Command;

})();
