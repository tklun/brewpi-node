// module.exports = process.env.EXPRESS_COV
//   ? require('./lib-cov/brewpi')
//   : require('./lib/app');

var brewPi = require('./lib/app');

brewPi.createBrewPi();
