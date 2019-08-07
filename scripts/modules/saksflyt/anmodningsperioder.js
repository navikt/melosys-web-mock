const Mock = require('../../utils/mock-util');
const SchemaValidator = require('../../utils/schemavalidator');

// [PUT] '/saksflyt/anmodningsperioder/:behandlingID/bestill'
module.exports.bestill = (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  SchemaValidator.put204(req, res);
};

