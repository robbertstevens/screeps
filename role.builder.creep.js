const STATE_REFILL = 1;
const STATE_BUILDING = 2;

module.exports = {
    role: "builder",
    spawnAtSpawn: function (spawn) {
        var builders = this.getAll();

        if (builders.length >= MAX_BUILDERS) {
            return;
        }
        var body = [WORK, CARRY, MOVE, MOVE];
        var name = "B" + Game.time;

        spawn.spawnCreep(body, name, {memory: {role: this.role}});
    },

    work: function (creep) {
        var result = undefined;
        var target = undefined;
        switch (creep.memory.state) {
            case STATE_BUILDING:
                target = creep.room.controller;
                result = creep.upgradeController(target);
                break;
            case STATE_REFILL:
                target = Game.spawns['Spawn1'];
                result = creep.withdraw(target, RESOURCE_ENERGY);
                break;
            default:
                creep.memory.state = STATE_REFILL;
                break;
        }

        if (result === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        if (result === ERR_NOT_ENOUGH_ENERGY) {
            creep.memory.state = STATE_REFILL;
        }
        if (result === ERR_FULL) {
            creep.memory.state = STATE_BUILDING;
        }
    },

    getAll: function () {
        return _.filter(Game.creeps, {
            memory: {role: this.role}
        });
    }
};