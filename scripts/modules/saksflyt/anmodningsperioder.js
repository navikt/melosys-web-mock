const Mock = require('../../utils/mock-util');
const SchemaValidator = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');

// [PUT] '/saksflyt/anmodningsperioder/:behandlingID/bestill'
module.exports.bestill = (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  const { moduleName } = Katalog.pathnameMap['saksflyt-anmodningsperioder-bestill'];
  SchemaValidator.put204(moduleName,req, res);
};

