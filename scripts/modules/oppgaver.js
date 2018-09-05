const fs = require('fs');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const _ = require('underscore');

const Utils = require('./utils');

const MOCK_DATA_DIR  = `${process.cwd()}/scripts/mock_data`;
const MOCK_DATA_OPPGAVRE_DIR = `${MOCK_DATA_DIR}/oppgaver`;

const lesOversikt = () => {
  const mockfile = `${MOCK_DATA_OPPGAVRE_DIR}/oversikt.json`;
  return JSON.parse(fs.readFileSync(mockfile, "utf8"));
};

module.exports.lesOppgaveKatalog = () => {
  const navn = 'oversikt.json';
  const jasonfile = `${MOCK_DATA_OPPGAVRE_DIR}/${navn}`;
  const document =  JSON.parse(fs.readFileSync(jasonfile, "utf8"));
  return [{
    navn,
    document
  }];
};

module.exports.hentPlukk = (req, res) => {
  try {
    const oversikt = lesOversikt();
    return res.json(_.sample(oversikt, 4));
  }
  catch (err) {
    console.log(err);
    logger.error(err);
    res.status(500).send(err);
  }
};

module.exports.sendPlukk = (req, res) => {
  const body = req.body;
  const jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  logger.debug("oppgaver:sendPlukk", JSON.stringify(jsonBody));
  const { oppgavetype } = jsonBody;
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
module.exports.oversikt = (req, res) => {
  try {
    const oversikt = lesOversikt();
    return res.json(oversikt);
  }
  catch (err) {
    console.log(err);
    logger.error(err);
    res.status(500).send(err);
  }
};
module.exports.opprett = (req, res) => {
  const body = req.body;
  const jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  logger.debug("oppgaver:opprett", JSON.stringify(jsonBody));
  res.json(jsonBody);
};

module.exports.reset = (req, res) => {
  res.json({});
};
