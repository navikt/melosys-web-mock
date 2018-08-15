const fs = require('fs');
const Utils = require('./utils');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_DATA_OPPGAVE_SOK_DIR = `${MOCK_DATA_DIR}/oppgaver/sok`;


exports.lesAlleOppgaveSok = () => {
  return Utils.lesAlleJson(MOCK_DATA_OPPGAVE_SOK_DIR);
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
exports.sok = (req, res) => {
  try {
    const fnr = req.query.fnr;
    const oppgaver = lesOppgave(fnr);
    return res.json(oppgaver);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
