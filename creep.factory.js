// var harvesters = require('role.harvester.creep');
// var collectors = require('role.collector.creep');
// var builders = require('role.builder.creep');
var farmer = require('role.farmer.creep');

module.exports = {
    spawnCreeps: function () {
        var spawn = Game.spawns[_.findKey(Game.spawns)];
        
        this.spawnAtSpawn(spawn, farmer.role, farmer.getBody());
        // this.spawnAtSpawn(spawn, farmer.role, farmer.getBody());
        // this.spawnAtSpawn(spawn, farmer.role, farmer.getBody());

    },
    /**
     * @return {boolean}
     * @param role
     */
    shouldSpawn: function (role) {
        var creeps = _.filter(Game.creeps, {
            memory: {role: role}
        });
        return creeps.length < 1;
    },
    /**
     *
     * @param {Spawn} spawns
     */
    spawnAtSpawn(spawn, role, body) {
        if (!this.shouldSpawn(role)) {
            return;
        }
        var name = role + "-" + Game.time;

        spawn.spawnCreep(body, name, {
            memory: {
                role: this.role,
                state: STATE_IDLE
            }
        });
    }
};