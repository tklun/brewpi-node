module.exports = process.env.EXPRESS_COV
  ? require('./lib-cov/brewpi')
  : require('./lib/app');
