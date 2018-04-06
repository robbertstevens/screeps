module.exports = {
    role: "harvester",
    spawnAtSpawn: function (spawn) {
        var harvesters = _.filter(Game.creeps, {
            memory: {role: this.role}
        });

        if (harvesters.length > MAX_HARVESTERS) {
            return;
        }
        var body = [WORK, MOVE, MOVE];
        var name = "H" + Game.time;

        spawn.spawnCreep(body, name, {memory: {role: this.role}});
    },

    work: function () {
        var harvesters = _.filter(Game.creeps, {
            memory: {role: this.role}
        });

        harvesters.forEach(function (creep) {
            var target = creep.memory.target;

            target = creep.pos.findClosestByPath(FIND_SOURCES);
            if (target === undefined) {
                creep.memory.target = target;
                console.log(creep.name + " doesn't have a target yet");

            }
            var result = creep.harvest(target);
            if (result === ERR_NOT_IN_RANGE) {
                console.log(creep.name + " moves closer to target: " + target);
                creep.moveTo(target)
            }

        });
    }
};