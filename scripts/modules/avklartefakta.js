const fs = require('fs');
const Ajv = require('ajv');

const ajv = new Ajv({allErrors: true});
const _ = require('underscore');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const ERR = require('./errors');
const Utils = require('./utils');
const Schema = require('../test/schema-util');

const SCRIPTS_DATA_DIR = `${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DATA_DIR}/schema`;
const MOCK_DATA_DIR = `${SCRIPTS_DATA_DIR}/mock_data`;
const avklartefakta_MOCK_DIR = `${MOCK_DATA_DIR}/avklartefakta`;

module.exports.lesAvklartefaktaKatalog = () => {
  return Schema.lesKatalog(avklartefakta_MOCK_DIR);
};

const lesAvklaring = (behandlingID) => {
  const mockfile = `${avklartefakta_MOCK_DIR}/avklartefakta-bid-${behandlingID}.json`;
  return fs.existsSync(mockfile) ? JSON.parse(fs.readFileSync(mockfile, "utf8")) : {};
};
/**
 * Hent faktavklaring
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;
    const avklaring = lesAvklaring(behandlingID);
    if (_.isEmpty(avklaring)) {
      return res.status(404).send(ERR.notFound404(req.url));
    }
    return res.json(avklaring);
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    return res.status(500).send(err);
  }
};
function valideringFeil(req, res) {
  const status = 400;
  const melding = ERR.errorMessage(400, 'Bad Request', 'Invalid schema', req.originalUrl);
  res.status(status).send(melding);
}


/**
 * Send avklartefakta
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  const body = req.body;
  const jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  logger.debug("avklartefakta:send", JSON.stringify(jsonBody));

  const schemajson = `${SCHEMA_DIR}/avklartefakta-schema.json`;
  const schema = Schema.lesSchema(schemajson);
  const validate = ajv.compile(schema);

  const valid = test(validate, jsonBody);
  if (!valid) {
    return valideringFeil(req, res);
  }

  const { behandlingID, ...rest } = jsonBody;
  const avklartefakta = {
    behandlingID,
    ...rest,
  };

  return res.json(avklartefakta);
};

function test(validate, data) {
  const valid = validate(data);
  if (valid) {
    console.log('avklartefakta:send Valid!');
  }
  else {
    const ajvErros = ajv.errorsText(validate.errors);
    console.error('avklartefakta:send INVALID: see mock-errors.log');
    logger.error('avklartefakta:send INVALID', ajvErros)
  }
  return valid;
}
