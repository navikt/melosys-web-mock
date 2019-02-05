const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const Utils = require('./utils');
const Schema = require('../test/schema-util');
const SchemaPostValidator  = require('./schema-post-validator');
const ERR = require('./errors');

const SCRIPTS_DATA_DIR = `${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DATA_DIR}/schema`;
const MOCK_DATA_DIR = `${SCRIPTS_DATA_DIR}/mock_data`;
const MOCK_SOKNAD_DIR = `${MOCK_DATA_DIR}/soknader`;

const schemajson = `${SCHEMA_DIR}/soknad-post-schema.json`;

const schema = Schema.lesSchemaSync(schemajson);

const lesSoknad = (behandlingID) => {
  const mockfileSoknad = `${MOCK_SOKNAD_DIR}/soknad-bid-${behandlingID}.json`;
  return JSON.parse(Utils.readFileSync(mockfileSoknad));
};
const lesSoknadAsync = async (behandlingID) => {
  const mockfileSoknad = `${MOCK_SOKNAD_DIR}/soknad-bid-${behandlingID}.json`;
  return JSON.parse(await Utils.readFileAsync(mockfileSoknad));
};
module.exports.lesSoknad = lesSoknad;

module.exports.lesSoknadKatalog = () => {
  return Schema.lesKatalogSync(MOCK_SOKNAD_DIR);
};

/**
 * Hent soknad
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  const behandlingID = req.params.behandlingID;
  try {
    const soknad = await lesSoknadAsync(behandlingID);
    return res.json(soknad);
  }
  catch (err) {
    logger.error(err);
    console.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};
/**
 * Send soknad
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const label = "Soknad:Send";
  logger.debug(`${label}`, body);

  try {
    const valid = SchemaPostValidator.test(label, schema, jsBody);

    return valid ? res.json(body) : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    console.log(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};

