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
const VURDERING_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/vurdering`;

module.exports.lesVurderingsKatalog = () => {
  return Schema.lesKatalogSync(VURDERING_MOCK_DATA_DIR);
};

const lesVurdering = async (behandlingID) => {
  const mockfile = `${VURDERING_MOCK_DATA_DIR}/vurdering-bid-${behandlingID}.json`;
  return JSON.parse(await Utils.readFileAsync(mockfile));
};

/**
 * Hent vurdering
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;
    const mockfile = `${MOCK_DATA_DIR}/vurdering/vurdering-bid-${behandlingID}.json`;
    if (await Utils.existsAsync(mockfile)) {
      const data = await lesVurdering(behandlingID);
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
  const schemajson = `${SCHEMA_DIR}/vurdering-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);
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
