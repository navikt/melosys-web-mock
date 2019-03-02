const URL = require('url');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const Ajv = require('ajv');

const { SCHEMA_DIR } = require('../../mock.config');
const Utils = require('./utils');
const Schema = require('../test/schema-util');

const ERR = require('./errors');
const definitionsPath = `${SCHEMA_DIR}/definitions-schema.json`;
const definitions = Schema.lesSchemaSync(definitionsPath);

const { existsAsync, readFileAsync } = require('./utils');

const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_DATA_FAGSAK_DIR = `${MOCK_DATA_DIR}/fagsaker`;

module.exports.lesFagsakerKatalog = () => {
  return Schema.lesKatalogSync(MOCK_DATA_FAGSAK_DIR);
};

module.exports.hent = async (req, res) => {
  try {
    let { snr } = req.params;
    snr = snr && snr.toString() || '';
    const mockfile = `${MOCK_DATA_DIR}/fagsaker/snr-${snr}.json`;
    logger.trace(mockfile);
    const exists = await existsAsync(mockfile);
    if (exists) {
      const fagsaker = JSON.parse(await readFileAsync(mockfile));
      res.json(fagsaker);
    }
    else {
      console.error("File not found:"+ mockfile);
      logger.error("File not found"+mockfile);
      const melding = ERR.notFound404(req.url);
      res.status(404).send(melding);
    }
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};

module.exports.oppfrisk = (req, res) => {
  try {
    res.status(204).send();
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};

/**
 * @deprecated Benyttes kun i spark på t5
 * Opprett ny fagsak. [GET] /api/fagsaker/ny/:fnr
 * @param req
 * @param res
 * @returns {*|void}
 */

module.exports.opprett = (req, res) => {
  const melding = ERR.gone410(req.uri);
  res.status(410).send(melding);
};

module.exports.henlegg = async (req, res) => {
  const schemajson = `${SCHEMA_DIR}/henlegg-fagsak-schema.json`;
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
  catch(err) {
    console.log(err);
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
  else {
    console.log('Invalid: ' + ajv.errorsText(ajvValidator.errors));
  }
  return valid;
}
