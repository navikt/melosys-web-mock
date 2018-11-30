const URL = require('url');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const Ajv = require('ajv');

const Utils = require('./utils');
const Schema = require('../test/schema-util');
const ERR = require('./errors');

const SCRIPTS_DIR = `${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;
const definitionsPath = `${SCHEMA_DIR}/definitions-schema.json`;
const definitions = Schema.lesSchemaSync(definitionsPath);

// const MOCK_DATA_DIR = `${SCRIPTS_DIR}/mock_data`;
// const MOCK_VEDTAK_DIR = `${MOCK_DATA_DIR}/vedtak`;

module.exports.fattet = (req, res) => {
  const schemajson = `${SCHEMA_DIR}/vedtak-post-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);
  const ajv = new Ajv({allErrors: true});

  const ajvValidator = ajv.addSchema(definitions).compile(schema);
  const url = URL.parse(req.url);
  const body = req.body;

  try {
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = test(ajvValidator, jsBody, ajv);
    if (valid) {
      res.status(204).send();
    }
    else {
      valideringFeil(req, res);
    }
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(url, err);
    res.status(500).send(melding);
  }
};

function valideringFeil(req, res) {
  const status = 400;
  const melding = ERR.errorMessage(400,'Bad Request', 'Invalid schema', req.originalUrl);
  res.status(status).send(melding);
}

function test(ajvValidator, data, ajv) {
  const valid = ajvValidator(data);
  if (valid) console.log('Vedtak:fattet Valid!');
  else console.log('Invalid: ' + ajv.errorsText(ajvValidator.errors));
  return valid;
}
