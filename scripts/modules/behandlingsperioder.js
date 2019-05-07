const Utils = require('../utils/utils');
const SchemaPostValidator  = require('../utils/schema-post-validator');

const Mock = require('../utils/mock-util');

const { MOCK_DATA_DIR } = require('../../mock.config');
const BEHANDLINGPERIODER_MOCK_DIR = `${MOCK_DATA_DIR}/behandlingsperioder`;
/*
module.exports.hentBehandling = async (req, res) => {

  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const mockfile = `${BEHANDLINGER_MOCK_DIR}/bid-${behandlingID}.json`;
    const mockData = await Utils.readJsonAndParseAsync(mockfile);

    return res.json(mockData);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
*/
/**
 * status
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.status = (req, res) => {
  const schemaNavn = 'behandlingsperioder-status-post-schema.json';

  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const { body } = req;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const label = 'Behandlingsperioder:status';
    const valid = SchemaPostValidator.test(label, schemaNavn, jsBody);

    return valid ? res.status(204).send() : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

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

    const label = 'Behandlingsperioder:settPerioder';
    const schemaNavn = 'behandlingsperioder-post-schema.json';

    const valid = SchemaPostValidator.test(label, schemaNavn, jsBody);
    return valid ? res.json(jsBody) : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
