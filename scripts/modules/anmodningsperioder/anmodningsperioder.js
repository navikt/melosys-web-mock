const Mock = require('../../utils/mock-util');
const SchemaPostValidator  = require('../../utils/schema-post-validator');
const SchemaGetValidator  = require('../../utils/schema-get-validator');

const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap.anmodningsperioder;

module.exports.hent = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  return SchemaGetValidator.get(moduleName, req, res);
};

module.exports.send = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  SchemaPostValidator.post(moduleName, req, res);
};
