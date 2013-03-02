module.exports = process.env.BREWPI_COV
  ? require('./lib-cov/brewpi')
  : require('./lib/app');

// var brewPi = require('./lib/app');

// brewPi();
