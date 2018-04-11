var factory = require('creep.factory');
var operator = require('creep.operator');

global.MAX_HARVESTERS = 1;
global.MAX_COLLECTORS = 1;
global.MAX_BUILDERS = 1;

global.ROLE_FARMER = 'farmer';
global.ROLE_BUILDER = 'harvester';
global.ROLE_HARVESTER = 'harvester';
global.ROLE_HARVESTER = 'harvester';

global.STATE_IDLE = 0;

module.exports.loop = function () {
    operator.cleanUp();
    operator.work();
    factory.spawnCreeps();
};