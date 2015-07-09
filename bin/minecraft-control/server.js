var spawn = require('child_process').spawn;
var events = require('events');
var eventEmitter = new events.EventEmitter();

var server = {};
server.requireSettings = {};
server.pid = 0;
var mcServerProc;

var serverCwd;
var serverJarPath;


server.requireSettings.load = function(config){
    serverCwd = config.serverCwd;
    serverJarPath = config.serverJarPath;
};

server.on = function(event, callback) {
    eventEmitter.on(event, callback);
};

server.spawn = function(max, min, path) {
    /* Create and return minecraft server proccess for later use */
    mcServerProc = spawn('java', [
        '-Xmx' + max + 'M',
        '-Xms' + min + 'M',
        '-jar',
        path,
        'nogui'
    ], {
        cwd: serverCwd
    });
    server.pid = mcServerProc.pid;

    mcServerProc.on('exit', function() {
        mcServerProc = undefined;
        eventEmitter.emit('server.stop');
    });

    eventEmitter.emit('server.start');
};

/* Execute command */
server.cmd = function(cmd) {
    mcServerProc.stdin.write(cmd + '\n');
};

server.running = function() {
    return mcServerProc !== undefined;
};

server.onLog = function(cb){
    mcServerProc.stdout.on('data', cb);
};

module.exports = server;