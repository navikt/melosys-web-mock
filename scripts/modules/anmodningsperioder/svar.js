const Mock = require('../../utils/mock-util');
const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["anmodningsperioder-svar"];

module.exports.hent = async (req, res) => {
  const { anmodningsperiodeID } = req.params;
  if (!anmodningsperiodeID) return Mock.manglerParamAnmodningsperiodeID(req, res);

  return SchemaValidator.get(moduleName, req, res);
};

module.exports.send = (req, res) => {
  const { anmodningsperiodeID } = req.params;

  if (!anmodningsperiodeID) return Mock.manglerParamAnmodningsperiodeID(req, res);
  SchemaValidator.post(moduleName, req, res);
};

