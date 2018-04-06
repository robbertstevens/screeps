module.exports = {
    role: "collector",
    spawnAtSpawn: function (spawn) {
        var collectors = _.filter(Game.creeps, {
            memory: {role: this.role}
        });

        if (collectors.length > MAX_COLLECTORS) {
            return;
        }

        var body = [CARRY, CARRY, MOVE];
        var name = "C" + Game.time;

        spawn.spawnCreep(body, name, {memory: {role: this.role}})

    },

    work: function () {
        var collectors = _.filter(Game.creeps, {
            memory: {role: this.role}
        });

        collectors.forEach(function (creep) {

            var result = undefined;
            var target = undefined;

            if (creep.carry.energy === creep.carryCapacity) {
                console.log("creep " + creep.name + " is full");
                target = Game.spawns['Spawn1'];
                result = creep.transfer(target, RESOURCE_ENERGY);
            } else {
                console.log("creep " + creep.name + " is collection energy");
                target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                result = creep.pickup(target);
                console.log(result);
            }

            if (result === ERR_NOT_IN_RANGE) {
                console.log(creep.name + " moves closer to target: " + target);
                creep.moveTo(target)
            }

        });
    }
};