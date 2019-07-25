const Mock = require('../../utils/mock-util');
const SchemaPostValidator  = require('../../utils/schema-post-validator');
const Utils = require('../../utils/utils');
const Katalog = require('../../katalog');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const { moduleName } = Katalog.pathnameMap.anmodningsperioder;

module.exports.hent = async (req, res) => {
  const GET_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);

  const mockfile = `${GET_DIR}/anmodningsperioder-get.json`;
  const anmodningsperioder = await Utils.readJsonAndParseAsync(mockfile);

  return res.json(anmodningsperioder);
};

module.exports.send = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  SchemaPostValidator.post(moduleName, req, res);
};
