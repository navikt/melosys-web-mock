const fs = require('fs');
const URL = require('url');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const Ajv = require('ajv');

const ajv = new Ajv({allErrors: true});
const Utils = require('./utils');
const Schema = require('../test/schema-util');
const ERR = require('./errors');

const SCRIPTS_DIR = `${process.cwd()}/scripts`;
const MOCK_DATA_DIR = `${SCRIPTS_DIR}/mock_data`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;
const MOCK_JOURNALFORING_DIR = `${MOCK_DATA_DIR}/journalforing`;

module.exports.lesJournalforingKatalog = () => {
  return Schema.lesKatalog(MOCK_JOURNALFORING_DIR);
};

const lesJournalOppgave = (journalpostID, oppgaveID) => {
  const mockfile = `${MOCK_JOURNALFORING_DIR}/${journalpostID}-${oppgaveID}.json`;
  return JSON.parse(fs.readFileSync(mockfile, "utf8"));
};

module.exports.hent = (req, res) => {
  const url = URL.parse(req.url);
  try {
    const journalpostID = req.params.journalpostID;
    const oppgaveID = req.params.oppgaveID;
    if (!journalpostID) {
      const melding = ERR.badRequest400(url, "journalpostID mangler");
      return res.status(400).send(melding);
    }
    if (!oppgaveID) {
      const melding = ERR.badRequest400(url, "oppgaveID mangler");
      return res.status(400).send(melding);
    }
    const journalpost = lesJournalOppgave(journalpostID,oppgaveID);
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
  const schemajson = `${SCHEMA_DIR}/opprett-schema.json`;
  const schema = Schema.lesSchema(schemajson);
  const validate = ajv.compile(schema);

  const body = req.body;
  try {
    let jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    logger.debug("journalforing:sendOpprettNySak", JSON.stringify(jsonBody));
    const valid = test(validate, jsonBody);
    return (valid) ? res.status(204).json('') : valideringFeil(req, res);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.sendTilordneSak = (req, res) => {
  const schemajson = `${SCHEMA_DIR}/tilordne-schema.json`;
  const schema = Schema.lesSchema(schemajson);
  const validate = ajv.compile(schema);

  const body = req.body;
  try {
    let jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    logger.debug("journalforing:sendTilordneSak", JSON.stringify(jsonBody));
    const valid = test(validate, jsonBody);
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

function test(validate, data) {
  const valid = validate(data);
  if (valid) console.log('Valid!');
  else console.log('Invalid: ' + ajv.errorsText(validate.errors));
  return valid;
}
