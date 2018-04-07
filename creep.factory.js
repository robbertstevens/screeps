var harvesters = require('role.harvester.creep');
var collectors = require('role.collector.creep');
var builders = require('role.builder.creep');

module.exports = {
    spawnCreeps: function () {
        var spawn = Game.spawns[_.findKey(Game.spawns)];
        harvesters.spawnAtSpawn(spawn);
        collectors.spawnAtSpawn(spawn);
        builders.spawnAtSpawn(spawn);
    }
};