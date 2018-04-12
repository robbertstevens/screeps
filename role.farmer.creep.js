module.exports = {
    role: "farmer",
    /**
     * cost: 250
     * @return {[null,null,null,null]}
     */
    getBody: function() {
        return [WORK, CARRY, MOVE, MOVE];
    },
    shouldSpawn: function() {
        var creeps = _.filter(Game.creeps, {
            memory: {role: this.role}
        });
        return creeps.length < Math.ceil(Game.gcl.level * 3.25);
    },
    /**
     *
     * @param {Creep} creep
     */
    work: function(creep) {
        if (creep.memory.state === STATE_IDLE) {
            creep.say("🛀");
            creep.memory.target = creep.pos.findClosestByPath(FIND_SOURCES).id;
            creep.memory.state = STATE_HARVEST;
        }

        if (creep.memory.state === STATE_HARVEST) {
            creep.say("👨‍🌾");
            var action = creep.harvest(Game.getObjectById(creep.memory.target));
            if (action === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target));
            }

            if (creep.carry.energy === creep.carryCapacity) {
                creep.memory.state = STATE_TRANSFER
            }
        }

        if (creep.memory.state === STATE_TRANSFER) {
            creep.say("🚴‍");
            var action = creep.transfer(Game.getObjectById(creep.memory.home), RESOURCE_ENERGY);
            if (action === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.home));
            }

            if (action === ERR_FULL) {
                creep.memory.state = STATE_UPGRADE;
            }

            if (creep.carry.energy < 1) {
                creep.memory.state = STATE_IDLE;
            }
        }

        if (creep.memory.state === STATE_UPGRADE) {
            creep.say("⚒");
            var action = creep.upgradeController(creep.room.controller);

            if (action === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller)
            }

            if (action === ERR_INVALID_TARGET) {
                creep.memory.state = STATE_IDLE;
            }

            if (creep.carry.energy < 10) {
                creep.memory.state = STATE_HARVEST;
            }
        }

        // States : IDLE, HARVEST, TRANSFER, UPGRADE
    }
};