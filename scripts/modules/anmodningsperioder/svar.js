const Mock = require('../../utils/mock-util');
const SchemaPostValidator  = require('../../utils/schema-post-validator');
const Utils = require('../../utils/utils');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["anmodningsperioder-svar"];


module.exports.hent = async (req, res) => {
  const GET_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
  const { anmodningsperiodeID } = req.params;

  if (!anmodningsperiodeID) return Mock.manglerParamAnmodningsperiodeID(req, res);

  const mockfile = `${GET_DIR}/${moduleName}.json`;
  const anmodningsperiodersvar = await Utils.readJsonAndParseAsync(mockfile);

  return res.json(anmodningsperiodersvar);
};

module.exports.send = (req, res) => {
  const { anmodningsperiodeID } = req.params;

  if (!anmodningsperiodeID) return Mock.manglerParamAnmodningsperiodeID(req, res);
  SchemaPostValidator.post(moduleName, req, res);
};

