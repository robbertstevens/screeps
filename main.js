var factory = require('creep.factory');
var operator = require('creep.operator');

global.MAX_HARVESTERS = 1;
global.MAX_COLLECTORS = 1;
global.MAX_BUILDERS = 1;


module.exports.loop = function () {
    operator.cleanUp();
    operator.work();
    factory.spawnCreeps();
};