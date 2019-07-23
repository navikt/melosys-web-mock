const Mock = require('../../utils/mock-util');

// [PUT] '/saksflyt/anmodningsperioder/:behandlingID/bestill'
module.exports.bestill = (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);

  try {
    return res.status(204).send();
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};

