const Mock = require('../../utils/mock-util');
const SchemaPutValidator = require('../../utils/schema-put-validator');

// [PUT] '/saksflyt/anmodningsperioder/:behandlingID/bestill'
module.exports.bestill = (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  SchemaPutValidator.put204(req, res);
};

