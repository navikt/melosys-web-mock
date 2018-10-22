const Ajv = require('ajv');

const ajv = new Ajv({allErrors: true});
const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const Utils = require('./utils');
const Schema = require('../test/schema-util');
const ERR = require('./errors');

const SCRIPTS_DATA_DIR = `${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DATA_DIR}/schema`;
const MOCK_DATA_DIR = `${SCRIPTS_DATA_DIR}/mock_data`;
const MOCK_SOKNAD_DIR = `${MOCK_DATA_DIR}/soknader`;

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
    return res.status(500).send(err);
  }
};
/**
 * Send soknad
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  const schemajson = `${SCHEMA_DIR}/soknad-schema.json`;
  const definitionsPath = `${SCHEMA_DIR}/definitions-schema.json`;
  const definitions = Schema.lesSchemaSync(definitionsPath);

  const schema = Schema.lesSchemaSync(schemajson);
  const validate = ajv.addSchema(definitions).compile(schema);

  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  logger.debug("soknad:send", body);

  try {
    const valid = test(validate, jsBody);
    if (!valid) {
      valideringFeil(req, res);
    }
    res.json(body);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

function valideringFeil(req, res) {
  const status = 400;
  const melding = ERR.errorMessage(400,'Bad Request', 'Invalid schema', req.originalUrl);
  res.status(status).send(melding);
}

function test(validate, data) {
  const valid = validate(data);
  if (valid) {
    console.log('Soknad: send Valid!');
  }
  else {
    const ajvErros = ajv.errorsText(validate.errors);
    console.error('Soknad:send INVALID: see mock-errors.log');
    logger.error('Soknad:send INVALID', ajvErros)
  }
  return valid;
}
