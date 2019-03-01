const URL = require('url');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const Utils = require('./utils');
const Schema = require('../test/schema-util');
const SchemaPostValidator  = require('./schema-post-validator');
const ERR = require('./errors');

const { SCHEMA_DIR, MOCK_DATA_DIR } = require('../../dirconfig');

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

  const body = req.body;
  try {
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const label = 'Journalforing:sendOpprettNySak';
    logger.debug(label, JSON.stringify(jsBody));
    const valid = SchemaPostValidator.test(label, schema, jsBody);
    return (valid) ? res.status(204).json('') : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    console.log(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};

module.exports.sendTilordneSak = (req, res) => {
  const schemajson = `${SCHEMA_DIR}/journalforing-tilordne-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);

  const body = req.body;
  try {
    let jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const label = 'Journalforing:sendTilordneSak';
    logger.debug(label, JSON.stringify(jsBody));
    const valid = SchemaPostValidator.test(label, schema, jsBody);
    return (valid) ? res.status(204).json('') : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    console.log(err);
    const melding = ERR.serverError500(req.originalUrl);
    res.status(500).send(melding);
  }
};

