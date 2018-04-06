var harvesters = require('role.harvester.creep');
var collectors = require('role.collector.creep');
var builders = require('role.builder.creep');

module.exports = {
    work: function () {
        harvesters.work();
        collectors.work();
        builders.work();
    },

    cleanUp: function () {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
};