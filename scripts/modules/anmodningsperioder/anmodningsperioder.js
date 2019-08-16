const Mock = require('../../utils/mock-util');
const SchemaValidator  = require('../../utils/schemavalidator');

const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap.anmodningsperioder;

module.exports.hent = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  return SchemaValidator.get(moduleName, req, res);
};

module.exports.send = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  SchemaValidator.post(moduleName, req, res);
};
