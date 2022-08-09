exports.trackingNumberGenerator = (prefix = 'UB', suffix = 'HK') => {
  for (let i = 0; i < 5; i++)
    prefix += ~~(Math.random() * 10);
  return prefix + suffix;
}