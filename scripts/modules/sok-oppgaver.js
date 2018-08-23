const fs = require('fs');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const Schema = require('../test/schema-util');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_DATA_OPPGAVE_SOK_DIR = `${MOCK_DATA_DIR}/oppgaver/sok`;


module.exports.lesSokOppgaveKatalog = () => {
  return Schema.lesKatalog(MOCK_DATA_OPPGAVE_SOK_DIR);
};

const lesOppgave = (fnr) => {
  const mockfile = `${MOCK_DATA_OPPGAVE_SOK_DIR}/fnr-${fnr}.json`;
  if (fs.existsSync(mockfile)) {
    return JSON.parse(fs.readFileSync(mockfile, "utf8"));
  }
  return [];
};
/**
 * Sok oppgaver
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.sok = (req, res) => {
  try {
    const fnr = req.query.fnr;
    const oppgaver = lesOppgave(fnr);
    return res.json(oppgaver);
  } catch (err) {
    logger.error(err);
    console.log(err);
    res.status(500).send(err);
  }
};
