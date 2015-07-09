var usage = require('usage');
var path = require('path');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var fs = require("fs");
var config = require("./config");

var Minecraftserver = {};
Minecraftserver.plugins = require("./minecraft-control/plugins");
Minecraftserver.server = require("./minecraft-control/server");

var maxRam = config.server.max_ram;
var minRam = config.server.min_ram;

var serverJarPath = path.join(__dirname, 'minecraft-server/Minecraft_server.jar');
var serverCwd = path.join(__dirname, 'minecraft-server/');

Minecraftserver.plugins.requireSettings.load({
    serverCwd: serverCwd,
    serverJarPath: serverJarPath
});
Minecraftserver.server.requireSettings.load({
    serverCwd: serverCwd,
    serverJarPath: serverJarPath
});

Minecraftserver.reloadConfig = function(){
    config = require("./config");
};

Minecraftserver.createServer = function() {
    if (!this.server.running()) {
        this.server.spawn(maxRam, minRam, serverJarPath);
        return true;
    } else {
        return false;
    }
};

Minecraftserver.save = function() {
    if (this.server.running()) {
        this.server.cmd('say Saving the world now');
        this.server.cmd('save-all');
        return true;
    } else {
        return false;
    }

};

Minecraftserver.stop = function() {
    if (this.server.running()) {
        this.server.cmd('say Stopping server now!');
        this.server.cmd('stop');
        return true;
    } else {
        return false;
    }
};

module.exports = Minecraftserver;