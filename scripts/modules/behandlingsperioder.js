const Utils = require('../utils/utils');
const SchemaPostValidator  = require('../utils/schema-post-validator');

const Mock = require('../utils/mock-util');

const { MOCK_DATA_DIR } = require('../../mock.config');
const BEHANDLINGPERIODER_MOCK_DIR = `${MOCK_DATA_DIR}/behandlingsperioder`;

module.exports.hentPerioder = async (req, res) => {
  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const mockfile = `${BEHANDLINGPERIODER_MOCK_DIR}/perioder-bid-${behandlingID}.json`;
    const mockData = await Utils.readJsonAndParseAsync(mockfile);

    return res.json(mockData);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

/**
 * perioder
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.settPerioder = (req, res) => {
  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const { body } = req;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;

    const label = 'Behandlinger:settPerioder';
    const schemaNavn = 'behandlinger-perioder-post-schema.json';

    const valid = SchemaPostValidator.test(label, schemaNavn, jsBody);
    return valid ? res.json(jsBody) : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
