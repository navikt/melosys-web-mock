const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const SchemaValidator  = require('../../utils/schemavalidator');
const Utils = require('../../utils/utils');
const Mock = require('../../utils/mock-util');

const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["fagsaker-aktoerer"];

const AKTOER_DATA_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
const AKTOER_DATA_POST_DIR = `${AKTOER_DATA_DIR}/post`;

/**
 * lesAktoer
 * @param saksnummer
 * @param rolle
 * @param representerer
 * @returns {Promise<*>}
 */
const lesAktoer = async (saksnummer, rolle, representerer) => {
  const mockfile = `${AKTOER_DATA_DIR}/aktoer-snr-${saksnummer}.json5`;
  const aktoerer = await Utils.readJsonAndParseAsync(mockfile);
  if (rolle && representerer) {
    return aktoerer
      .filter(aktor => aktor.rolleKode === rolle)
      .filter(aktor => aktor.representererKode === representerer);
  }
  else if (rolle) {
    return aktoerer.filter(aktor => aktor.rolleKode === rolle);
  }
  else if (representerer) {
    return aktoerer.filter(aktor => aktor.representererKode === representerer);
  }
  return aktoerer;
};

/**
 * hentAktoerer
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.hentAktoerer = async (req, res) => {
  const { saksnummer } = req.params;
  const { rolle, representerer } = req.query;

  if (!saksnummer) {
    return Mock.manglerParamSaksnummer(req, res);
  }
  try {
    const aktoer = await lesAktoer(saksnummer, rolle, representerer);
    res.json(aktoer);
  }
  catch (e) {
    Mock.serverError(req, res, e);
  }
};

/**
 * sendAktoer
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.sendAktoer = async (req, res) => {
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const label = 'Fagsaker::aktoerer:sendAktoer';
  logger.debug(`${label}`, JSON.stringify(jsBody));

  try {
    const { saksnummer } = req.params;
    if (!saksnummer) {
      return Mock.manglerParamSaksnummer(req, res);
    }

    const schemaNavn = `${moduleName}-post-schema.json`;
    const valid = SchemaValidator.test(label, schemaNavn, jsBody);

    if (!valid) return SchemaValidator.valideringFeil(req, res);

    const mockfile = `${AKTOER_DATA_POST_DIR}/response-snr-${saksnummer}.json5`;
    const response = await Utils.readJsonAndParseAsync(mockfile);
    const { orgnr } = jsBody;
    const aktoer = {
      ...response,
      orgnr,
    };
    return res.json(aktoer);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

module.exports.slettAktoer = (req, res) => {
  const { databaseid } = req.params;
  if (!databaseid) {
    return Mock.badRequestParam(req, res, 'Mangler databaseid');
  }
  SchemaValidator.slett(moduleName, req, res);
};
