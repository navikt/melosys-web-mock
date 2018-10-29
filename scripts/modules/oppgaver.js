const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const _ = require('underscore');

const Utils = require('./utils');

const MOCK_DATA_DIR  = `${process.cwd()}/scripts/mock_data`;
const MOCK_DATA_OPPGAVRE_DIR = `${MOCK_DATA_DIR}/oppgaver`;

const lesOversikt = async () => {
  const mockfile = `${MOCK_DATA_OPPGAVRE_DIR}/oversikt.json`;
  return JSON.parse(await Utils.readFileAsync(mockfile));
};

module.exports.lesOppgaveOversiktFiler = () => {
  const navn = 'oversikt.json';
  const jasonfile = `${MOCK_DATA_OPPGAVRE_DIR}/${navn}`;
  const document =  JSON.parse(Utils.readFileSync(jasonfile));
  return [{
    navn,
    document
  }];
};

module.exports.lesOppgaveTilbakeleggFiler = () => {
  const navn = 'tilbakelegge.json';
  const jasonfile = `${MOCK_DATA_OPPGAVRE_DIR}/${navn}`;
  const document =  JSON.parse(Utils.readFileSync(jasonfile));
  return [{
    navn,
    document
  }];
};

module.exports.hentPlukk = async (req, res) => {
  try {
    const oversikt = await lesOversikt();
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
    res.status(500).send(err);
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
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  logger.debug("oppgaver:tilbakelegg", JSON.stringify(jsBody));
  res.status(204).send();
};
