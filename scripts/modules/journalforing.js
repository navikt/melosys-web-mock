const URL = require('url');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const Ajv = require('ajv');

const Utils = require('./utils');
const Schema = require('../test/schema-util');
const ERR = require('./errors');

const SCRIPTS_DIR = `${process.cwd()}/scripts`;
const MOCK_DATA_DIR = `${SCRIPTS_DIR}/mock_data`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;
const definitionsPath = `${SCHEMA_DIR}/definitions-schema.json`;
const definitions = Schema.lesSchemaSync(definitionsPath);

const MOCK_JOURNALFORING_DIR = `${MOCK_DATA_DIR}/journalforing`;

module.exports.lesJournalforingKatalog = () => {
  return Schema.lesKatalogSync(MOCK_JOURNALFORING_DIR);
};

const lesOppgave = async () => { // eslint-disable-line no-unused-vars
  const mockfile = `${MOCK_JOURNALFORING_DIR}/DOK_3789-30098000492.json`;
  return JSON.parse(await Utils.readFileAsync(mockfile));
};

module.exports.hent = async (req, res) => {
  const url = URL.parse(req.url);
  try {
    const journalpostID = req.params.journalpostID;
    if (!journalpostID) {
      const melding = ERR.badRequest400(url, "journalpostID mangler");
      return res.status(400).send(melding);
    }
    const journalpost = await lesOppgave(journalpostID);
    return res.json(journalpost);
  }
  catch (err) {
    console.log(err);
    logger.error(err);
    const melding = ERR.serverError500(url, err);
    res.status(500).send(melding);
  }
};

module.exports.sendOpprettNySak = (req, res) => {
  const schemajson = `${SCHEMA_DIR}/journalforing-opprett-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);
  const ajv = new Ajv({allErrors: true});
  const ajvValidator = ajv.addSchema(definitions).compile(schema);

  const body = req.body;
  try {
    let jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    logger.debug("journalforing:sendOpprettNySak", JSON.stringify(jsBody));
    const valid = test(ajvValidator, jsBody, ajv);
    return (valid) ? res.status(204).json('') : valideringFeil(req, res);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.sendTilordneSak = (req, res) => {
  const schemajson = `${SCHEMA_DIR}/journalforing-tilordne-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);
  const ajv = new Ajv({allErrors: true});
  const ajvValidator = ajv.addSchema(definitions).compile(schema);

  const body = req.body;
  try {
    let jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    logger.debug("journalforing:sendTilordneSak", JSON.stringify(jsBody));
    const valid = test(ajvValidator, jsBody, ajv);
    return (valid) ? res.status(204).json('') : valideringFeil(req, res);
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

function test(ajvValidator, data, ajv) {
  const valid = ajvValidator(data);
  if (valid) console.log('Journalforint:send Valid!');
  else console.log('Invalid: ' + ajv.errorsText(ajvValidator.errors));
  return valid;
}
