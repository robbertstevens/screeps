module.exports = {
    role: "builder",
    getBody: function() {
        return [WORK, CARRY, MOVE, MOVE];
    },
    shouldSpawn: function() {
        var creeps = _.filter(Game.creeps, {
            memory: {role: this.role}
        });

        if (Memory.roles[ROLE_FARMER] === 0) {
            return false;
        }

        return creeps.length < Math.ceil(Game.gcl.level * 3.25);
    },

    work: function (creep) {
        if (creep.memory.state === STATE_IDLE) {
            creep.memory.target = creep.memory.home; //creep.pos.findClosestByPath(FIND_MY_SPAWNS).id;
            creep.memory.state = STATE_WITHDRAW;

        }

        if (creep.memory.state === STATE_WITHDRAW) {
            var action = creep.withdraw(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY);
            if (action === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target));
            }
            if (creep.carry.energy === creep.carryCapacity) {
                creep.memory.target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES).id;
                creep.memory.state = STATE_BUILDING;
            }
        }

        if (creep.memory.state === STATE_BUILDING) {
            var action = creep.build(Game.getObjectById(creep.memory.target));

            if (action === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target));
            }
            if (action === ERR_INVALID_TARGET) {
                creep.memory.state = STATE_IDLE;
            }
            if (creep.carry.energy < 1) {
                creep.memory.state = STATE_IDLE;
            }
        }

    }
};