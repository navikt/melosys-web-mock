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
const VILKAR_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/vilkar`;

module.exports.lesVilkarsKatalog = () => {
  return Schema.lesKatalogSync(VILKAR_MOCK_DATA_DIR);
};

const lesVilkar = async (behandlingID) => {
  const mockfile = `${VILKAR_MOCK_DATA_DIR}/vilkar-bid-${behandlingID}.json`;
  return JSON.parse(await Utils.readFileAsync(mockfile));
};

/**
 * Hent vilkar
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;
    const mockfile = `${VILKAR_MOCK_DATA_DIR}/vilkar-bid-${behandlingID}.json`;

    if (await Utils.existsAsync(mockfile)) {
      const data = await lesVilkar(behandlingID);
      const status = happy.happyStatus([200, 200, 404]);
      if (status === 404) {
        return res.status(404).send(ERR.notFound404(req.url));
      }
      return res.json(data);
    }
    else {
      return res.status(404).send(ERR.notFound404(req.url));
    }
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};

/**
 * Send vilkar
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  const schemajson = `${SCHEMA_DIR}/vilkar-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);
  const validate = ajv.compile(schema);

  const body = req.body;
  let jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  logger.debug("vilkar:send", JSON.stringify(jsonBody));

  const valid = test(validate, jsonBody);
  if (!valid) {
    valideringFeil(req, res);
  }
  else {
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
    console.log('Vilkar:send Valid!');
  }
  else {
    const ajvErros = ajv.errorsText(validate.errors);
    console.error('Vilkar:send INVALID: see mock-errors.log');
    logger.error('Vilkar:send INVALID', ajvErros)
  }
  return valid;
}
