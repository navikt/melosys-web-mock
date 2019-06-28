const Mock = require('../../utils/mock-util');

module.exports.send = (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);

  res.status(204).send();
};

