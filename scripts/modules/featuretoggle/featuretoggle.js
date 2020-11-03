module.exports.hent = (req, res) => {
  const { features } = req.query;

  const featuresArray = Array.isArray(features) ? features : [features];
  const featuresActivated = featuresArray.map(feature => [feature, true]);
  const responseBody = Object.fromEntries(featuresActivated);

  res.send(responseBody);
};
