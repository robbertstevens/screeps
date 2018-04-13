var factory = require('creep.factory');
var operator = require('creep.operator');
var base = require('base.builder');

global.MAX_HARVESTERS = 1;
global.MAX_COLLECTORS = 1;
global.MAX_BUILDERS = 1;

global.ROLE_FARMER = 'farmer';
global.ROLE_BUILDER = 'builder';
global.ROLE_HARVESTER = 'harvester';

global.STATE_IDLE = 0;
global.STATE_HARVEST = 1;
global.STATE_TRANSFER = 2;
global.STATE_UPGRADE = 3;
global.STATE_WITHDRAW = 4;
global.STATE_BUILDING = 5;

module.exports.loop = function () {
    if (Memory.roles === undefined) {
        Memory.roles = {};
    }
    operator.cleanUp();
    operator.work();
    factory.spawnCreeps();
    //base.plan();
};