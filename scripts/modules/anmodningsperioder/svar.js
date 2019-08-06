const Mock = require('../../utils/mock-util');
const SchemaPostValidator  = require('../../utils/schema-post-validator');
const SchemaGetValidator  = require('../../utils/schema-get-validator');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["anmodningsperioder-svar"];

module.exports.hent = async (req, res) => {
  const { anmodningsperiodeID } = req.params;
  if (!anmodningsperiodeID) return Mock.manglerParamAnmodningsperiodeID(req, res);

  return SchemaGetValidator.get(moduleName, req, res);
};

module.exports.send = (req, res) => {
  const { anmodningsperiodeID } = req.params;

  if (!anmodningsperiodeID) return Mock.manglerParamAnmodningsperiodeID(req, res);
  SchemaPostValidator.post(moduleName, req, res);
};

