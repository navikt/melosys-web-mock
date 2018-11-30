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

module.exports.status = (req, res) => {
  const schemajson = `${SCHEMA_DIR}/behandlinger-status-post-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);
  const ajv = new Ajv({allErrors: true});
  const ajvValidator = ajv.addSchema(definitions).compile(schema);

  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      const melding = ERR.badRequest400(req.originalUrl, "behandlingID mangler");
      return res.status(400).send(melding);
    }
    const { body } = req;
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
    console.log(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
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
  if (valid) console.log('Behandlinger:status Valid!');
  else console.log('Invalid: ' + ajv.errorsText(ajvValidator.errors));
  return valid;
}
