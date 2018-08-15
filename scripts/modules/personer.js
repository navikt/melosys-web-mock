const fs = require('fs');
const URL = require('url');
const Utils  = require('./utils');
const ERR = require('./errors');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const PERSON_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/personer`;

const lesPerson = (fnr) => {
  const mockfile = `${PERSON_MOCK_DATA_DIR}/fnr-${fnr}.json`;
  return fs.existsSync(mockfile) ? JSON.parse(fs.readFileSync(mockfile, "utf8")) : {};
};

module.exports.lesAllePersoner = () => {
  return Utils.lesAlleJson(PERSON_MOCK_DATA_DIR)
};

module.exports.hent = (req, res) => {
  const fnr = req.query.fnr;
  if (fnr && fnr.length === 11) {
    const person = lesPerson(fnr);
    return res.json(person);
  }
  let message = '';
  if (!fnr) {
    message = 'Mangler fnr';
  }
  else if (fnr.length !== 9) {
    message = 'Fnr må ha 11 siffer';
  }

  const url = URL.parse(req.url);
  const melding = ERR.badRequest400(url.pathname, message);
  return res.status(400).send(melding);
};
