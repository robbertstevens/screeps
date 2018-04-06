module.exports = {
    role: "builder",
    spawnAtSpawn: function (spawn) {
        var builders = _.filter(Game.creeps, {
            memory: {role: this.role}
        });

        if (builders.length > MAX_BUILDERS) {
            return;
        }
        var body = [WORK, MOVE, MOVE];
        var name = "H" + Game.time;

        // spawn.spawnCreep(body, name, {memory: {role: this.role}});
    },

    work: function () {
        //console.log('WIP');
    }
};