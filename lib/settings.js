var settings = exports = module.exports = {};

settings.controlSettings = {
  mode: 'o',
  beerSetting: 20.0,
  fridgeSetting: 20.0,
  heatEstimator: 0.2,
  coolEstimator: 5
};

settings.controlConstants = {
  tempFormat: 'C',
  tempSettingMin: 4.0,
  tempSettingMax: 30.0,
  KpHeat: 10.000,
  KpCool: 5.000,
  Ki: 0.020,
  KdCool: -10.000,
  KdHeat: -5.000,
  iMaxSlope: 0.05,
  iMinSlope: -0.1,
  iMaxError: 0.5,
  idleRangeHigh: 0.500,
  idleRangeLow: -0.500,
  heatingTargetUpper: 0.199,
  heatingTargetLower: -0.100,
  coolingTargetUpper: 0.100,
  coolingTargetLower: -0.199,
  maxHeatTimeForEstimate: 600,
  maxCoolTimeForEstimate: 1200
};

settings.controlVariables = {
  beerDiff: 0,
  fridgeDiff: 0,
  diffIntegral: 0,
  beerSlope: 0,
  p: 0,
  i: 0,
  d: 0,
  Kp: 0,
  Kd: 0,
  estimatedPeak: 0,
  negPeakSetting: 0,
  posPeakSetting: 0,
  negPeak: 0,
  posPeak: 0
};
