const fs = require('fs');
const Ajv = require('ajv');

const ajv = new Ajv({allErrors: true});
const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const ERR = require('./errors');
const happy = require('./happystatus');
const Utils = require('./utils');
const Schema = require('../test/schema-util');

const SCRIPTS_DATA_DIR = `${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DATA_DIR}/schema`;
const MOCK_DATA_DIR = `${SCRIPTS_DATA_DIR}/mock_data`;
const VURDERING__MOCK_DATA_DIR = `${MOCK_DATA_DIR}/vurdering`;

module.exports.lesVurderingsKatalog = () => {
  return Schema.lesKatalog(VURDERING__MOCK_DATA_DIR);
};
/**
 * Hent vurdering
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;
    const mockfile = `${MOCK_DATA_DIR}/vurdering/vurdering-bid-${behandlingID}.json`;
    if (fs.existsSync(mockfile)) {
      const data = JSON.parse(fs.readFileSync(mockfile, "utf8"));
      const status = happy.happyStatus([200, 200, 404]);
      if (status === 200) {
        data.vurdering.feilmeldinger = [];
      }
      return res.json(data);
    }
    else {
      logger.warn('Not found'+req.url);
      return res.status(404).send(ERR.notFound404(req.url));
    }
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    return res.status(500).send(err);
  }
};

/**
 * Send vurdering
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  const schemajson = `${SCHEMA_DIR}/soknad-schema.json`;
  const schema = Schema.lesSchema(schemajson);
  const validate = ajv.compile(schema);

  const behandlingID = req.params.behandlingID;
  const body = req.body;
  let jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  logger.debug("vurdering:send", JSON.stringify(jsonBody));

  const valid = test(validate, jsonBody);
  if (!valid) {
    valideringFeil(req, res);
  }
  else {
    jsonBody.behandlingID = behandlingID;
    res.json(jsonBody);
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
    console.log('Vurdering:send Valid!');
  }
  else {
    const ajvErros = ajv.errorsText(validate.errors);
    console.error('Vurdering:send INVALID: see mock-errors.log');
    logger.error('Vurdering:send INVALID', ajvErros)
  }
  return valid;
}
