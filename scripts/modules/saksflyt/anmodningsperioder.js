const Mock = require('../../utils/mock-util');
const SchemaValidator = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');

// [POST] '/saksflyt/anmodningsperioder/:behandlingID/bestill'
module.exports.bestill = (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  const { moduleName } = Katalog.pathnameMap['saksflyt-anmodningsperioder-bestill'];
  SchemaValidator.post204(moduleName,req, res);
};

// [POST] '/saksflyt/anmodningsperioder/:behandlingID/svar'
module.exports.svar = (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  const { moduleName } = Katalog.pathnameMap['saksflyt-anmodningsperioder-svar'];
  SchemaValidator.post204(moduleName,req, res);
};
