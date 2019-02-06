const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const ERR = require('./errors');
const Utils = require('./utils');
const Schema = require('../test/schema-util');
const SchemaPostValidator  = require('./schema-post-validator');

const SCRIPTS_DATA_DIR = `${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DATA_DIR}/schema`;
const MOCK_DATA_DIR = `${SCRIPTS_DATA_DIR}/mock_data`;
const AVKLARTEFAKTA_MOCK_DIR = `${MOCK_DATA_DIR}/avklartefakta`;

module.exports.lesAvklartefaktaKatalog = () => {
  return Schema.lesKatalogSync(AVKLARTEFAKTA_MOCK_DIR);
};

module.exports.lesAvklartefaktaPostMock = () => {
  const mockfile = `${AVKLARTEFAKTA_MOCK_DIR}/post/avklartefakta-post.json`;
  return Schema.lesKatalogElement(mockfile);
};
const lesAvklaring = async (behandlingID) => {
  const mockfile = `${AVKLARTEFAKTA_MOCK_DIR}/avklartefakta-bid-${behandlingID}.json`;
  return (await Utils.existsAsync(mockfile)) ? JSON.parse(await Utils.readFileAsync(mockfile)) : {}
};
/**
 * Hent faktavklaring
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;
    const avklaring = await lesAvklaring(behandlingID);
    return res.json(avklaring);
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};


/**
 * Send Avklartefakta
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const label = 'Avklartefakta:send';
  logger.debug(`${label}`, JSON.stringify(jsBody));

  const schemajson = `${SCHEMA_DIR}/avklartefakta-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);
  const valid = SchemaPostValidator.test(label, schema, jsBody);
  return valid ? res.json(jsBody) : SchemaPostValidator.valideringFeil(req, res);
};
