/**
 *
 * @param {Spawn} spawn
 */
function planRoadNetworkForSpawn(spawn) {
    // Find path to Room controller.
    _.values(spawn.room.find(FIND_SOURCES)).forEach(source => {
        var path = spawn.pos.findPathTo(source);

        path.forEach(pos => {
            // pos.
            // spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
        });
    });


    // Find path to sources.
    // PathFinder.search(room)
}

module.exports = {
    plan: function() {
        _.values(Game.spawns).forEach(spawn => {
            planRoadNetworkForSpawn(spawn);
        });
    }
};