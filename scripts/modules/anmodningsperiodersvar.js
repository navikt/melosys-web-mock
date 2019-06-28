const Mock = require('../utils/mock-util');
const SchemaPostValidator  = require('../utils/schema-post-validator');
const Utils = require('../utils/utils');

const { MOCK_DATA_DIR } = require('../../mock.config');
const ANMODNINGSPERIODERSVAR_MOCK_DIR = `${MOCK_DATA_DIR}/anmodningsperiodersvar`;

module.exports.send = (req, res) => {
  const { anmodningsperiodeID } = req.params;

  if (!anmodningsperiodeID) return Mock.manglerParamAnmodningsperiodeID(req, res);

  const schemaNavn = 'anmodningsperiodersvar-post-schema.json';
  const label = 'anmodningsperiodersvar:send';

  try {
    const body = req.body;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;

    const valid = SchemaPostValidator.test(label, schemaNavn, jsBody);
    return valid ? res.status(204).send() : SchemaPostValidator.valideringFeil(req, res);
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};

module.exports.hent = async (req, res) => {
  const { anmodningsperiodeID } = req.params;

  if (!anmodningsperiodeID) return Mock.manglerParamAnmodningsperiodeID(req, res);

  const mockfile = `${ANMODNINGSPERIODERSVAR_MOCK_DIR}/anmodningsperiodersvar-get.json`;
  const anmodningsperiodersvar = await Utils.readJsonAndParseAsync(mockfile);

  return res.json(anmodningsperiodersvar);
};
