var harvester = require('role.harvester.creep');
var collector = require('role.collector.creep');
var builder = require('role.builder.creep');
var farmer = require('role.farmer.creep');

module.exports = {
    work: function () {
        _.values(Game.creeps).forEach(function(creep) {

            if (creep.memory.role === ROLE_FARMER) {
                farmer.work(creep);
            }
            // if (creep.memory.role == ROLE_HARVESTER) {
            //     harvester.work(creep);
            // }
            //
            // if (creep.memory.role == ROLE_BUILDER) {
            //     builder.work(creep);
            // }
            //
            // if (creep.memory.role == ROLE_COLLECTOR) {
            //     collector.work(creep);
            // }
        });
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