const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const { MOCK_DATA_DIR } = require('../../mock.config');
const Utils = require('../utils/utils');
const Schema = require('../utils/schema-util');
const SchemaPostValidator  = require('../utils/schema-post-validator');

const Mock = require('../utils/mock-util');

const MOCK_JOURNALFORING_DIR = `${MOCK_DATA_DIR}/journalforing`;

/**
 * lesJournalforingKatalog
 */
module.exports.lesJournalforingKatalog = () => {
  return Schema.lesKatalogSync(MOCK_JOURNALFORING_DIR);
};

const lesOppgave = () => { // eslint-disable-line no-unused-vars
  const mockfile = `${MOCK_JOURNALFORING_DIR}/DOK_3789-30098000492.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};

/**
 * hent
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.hent = async (req, res) => {
  try {
    const journalpostID = req.params.journalpostID;
    if (!journalpostID) {
      Mock.manglerParamjournalpostID(req, res);
    }
    const journalpost = await lesOppgave(journalpostID);
    return res.json(journalpost);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

/**
 * sendOpprettNySak
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.sendOpprettNySak = (req, res) => {
  const schema = Schema.lesSchemaFileSync('journalforing-opprett-schema.json');

  const body = req.body;
  try {
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const label = 'Journalforing:sendOpprettNySak';
    logger.debug(label, JSON.stringify(jsBody));
    const valid = SchemaPostValidator.test(label, schema, jsBody);
    return (valid) ? res.status(204).json('') : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

/**
 * sendTilordneSak
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.sendTilordneSak = (req, res) => {
  const schema = Schema.lesSchemaFileSync('journalforing-tilordne-schema.json');

  const body = req.body;
  try {
    let jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const label = 'Journalforing:sendTilordneSak';
    logger.debug(label, JSON.stringify(jsBody));
    const valid = SchemaPostValidator.test(label, schema, jsBody);
    return (valid) ? res.status(204).json('') : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

