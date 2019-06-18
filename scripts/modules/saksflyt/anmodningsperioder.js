const Mock = require('../../utils/mock-util');
const SchemaPostValidator  = require('../../utils/schema-post-validator');
const Utils = require('../../utils/utils');
const { MOCK_DATA_DIR } = require('../../../mock.config');

const ANMODNINGSPERIODER_MOCK_DIR = `${MOCK_DATA_DIR}/saksflyt/anmodningsperioder`;

module.exports.send = (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);

  const schemaNavn = 'saksflyt-anmodningsperioder-post-schema.json';
  const label = 'Saksflyt::anmodningsperiode:send';

  try {
    const body = req.body;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;

    const valid = SchemaPostValidator.test(label, schemaNavn, jsBody);
    return valid ? res.json(jsBody) : SchemaPostValidator.valideringFeil(req, res);
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};

module.exports.hent = async (req, res) => {
  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);

  const mockfile = `${ANMODNINGSPERIODER_MOCK_DIR}/saksflyt-anmodningsperioder-get.json`;
  const anmodningsperioder = await Utils.readJsonAndParseAsync(mockfile);

  return res.json(anmodningsperioder);
};
