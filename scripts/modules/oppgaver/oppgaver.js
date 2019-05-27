const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const _ = require('lodash');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const Utils = require('../../utils/utils');
const Schema = require('../../utils/schema-util');
const SchemaPostValidator  = require('../../utils/schema-post-validator');
const Mock = require('../../utils/mock-util');
const MOCK_DATA_OPPGAVER_DIR = `${MOCK_DATA_DIR}/oppgaver`;
const MOCK_DATA_PLUKK_OPPGAVER_DIR = `${MOCK_DATA_OPPGAVER_DIR}/plukk`;

const lesOversikt = () => {
  const mockfil = `${MOCK_DATA_OPPGAVER_DIR}/oversikt.json`;
  return Utils.readJsonAndParseAsync(mockfil);
};

/**
 * lesOppgaveKatalog
 */
module.exports.lesOppgaveKatalog = () => {
  return Schema.lesKatalogSync(MOCK_DATA_OPPGAVER_DIR);
};

/**
 * hentPlukk
 * @param req
 * @param res
 * @returns {Promise<*|Request|Promise<any>>}
 */
module.exports.hentPlukk = async (req, res) => {
  try {
    const oversikt = await lesOversikt();
    return res.json(_.sample(oversikt, 4));
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

/**
 * sendPlukk
 * @param req
 * @param res
 */
module.exports.sendPlukk = async (req, res) => {
  const schemaNavn = 'oppgaver-plukk-post-schema.json';
  const mockdata = `${MOCK_DATA_PLUKK_OPPGAVER_DIR}/post/oppgaver-plukk-post-response.json`;
  const response = await Utils.readJsonAndParseAsync(mockdata);
  const label = 'Oppgaver:plukk';

  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  logger.debug("oppgaver:sendPlukk", JSON.stringify(jsBody));

  try {
    const valid = SchemaPostValidator.test(label, schemaNavn, jsBody);
    return valid ? res.json(response) : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }

};
/**
 * Oversikt
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.oversikt = async (req, res) => {
  try {
    const oversikt = await lesOversikt();
    return res.json(oversikt);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
/**
 * Opprett
 * @param req
 * @param res
 */
module.exports.opprett = (req, res) => {
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  logger.debug("oppgaver:opprett", JSON.stringify(jsBody));
  try {
    res.json(jsBody);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
/**
 * reset
 * @param req
 * @param res
 */
module.exports.reset = (req, res) => {
  try {
    res.json({});
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
/**
 * tilbakelegg
 * @param req
 * @param res
 */
module.exports.tilbakelegg = (req, res) => {
  const schemaNavn = 'oppgaver-tilbakelegge-schema.json';

  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const label = 'Oppgaver:tilbakelegg';
  logger.debug(label, JSON.stringify(jsBody));
  try {
    const valid = SchemaPostValidator.test(label, schemaNavn, jsBody);
    return valid ? res.status(204).send() : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
