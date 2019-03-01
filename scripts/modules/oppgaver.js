const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const _ = require('lodash');

const Utils = require('./utils');
const Schema = require('../test/schema-util');
const SchemaPostValidator  = require('./schema-post-validator');
const ERR = require('./errors');

const { SCHEMA_DIR, MOCK_DATA_DIR } = require('../../dirconfig');
const MOCK_DATA_OPPGAVER_DIR = `${MOCK_DATA_DIR}/oppgaver`;

const lesOversikt = async () => {
  const mockfil = `${MOCK_DATA_OPPGAVER_DIR}/oversikt.json`;
  return JSON.parse(await Utils.readFileAsync(mockfil));
};

module.exports.lesOppgaveKatalog = () => {
  return Schema.lesKatalogSync(MOCK_DATA_OPPGAVER_DIR);
};

module.exports.hentPlukk = async (req, res) => {
  try {
    const oversikt = await lesOversikt();
    return res.json(_.sample(oversikt, 4));
  }
  catch (err) {
    console.log(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};

module.exports.sendPlukk = (req, res) => {
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  logger.debug("oppgaver:sendPlukk", JSON.stringify(jsBody));
  const { oppgavetype } = jsBody;
  let oppgave;
  if (oppgavetype === 'BEH_SAK') {
    oppgave = { oppgaveID:'1', oppgavetype, saksnummer:'4', journalpostID: null };
  }
  else { // JFR
    // saknummer optional
    oppgave = { oppgaveID:'2', oppgavetype, saksnummer: undefined, journalpostID:'DOK_321' };
  }
  res.json(oppgave);
};
/**
 * Oversikt
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.oversikt = async (req, res) => {
  try {
    const oversikt = await lesOversikt();
    return res.json(oversikt);
  }
  catch (err) {
    console.log(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};
module.exports.opprett = (req, res) => {
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  logger.debug("oppgaver:opprett", JSON.stringify(jsBody));
  res.json(jsBody);
};

module.exports.reset = (req, res) => {
  res.json({});
};

module.exports.tilbakelegg = (req, res) => {
  const schemajson = `${SCHEMA_DIR}/oppgaver-tilbakelegge-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);

  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const label = 'Oppgaver:tilbakelegg';
  logger.debug(label, JSON.stringify(jsBody));
  try {
    const valid = SchemaPostValidator.test(label, schema, jsBody);
    return valid ? res.status(204).send() : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    console.log(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};
