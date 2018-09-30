const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const URL = require('url');

const Utils = require('./utils');
const Schema = require('../test/schema-util');
const ERR = require('./errors');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const PERSON_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/personer`;

const lesPerson = async (fnr) => {
  const mockfile = `${PERSON_MOCK_DATA_DIR}/fnr-${fnr}.json`;
  return await Utils.existsAsync(mockfile) ? JSON.parse(await Utils.readFileAsync(mockfile)) : {};
};

module.exports.lesPersonKatalog = () => {
  return Schema.lesKatalog(PERSON_MOCK_DATA_DIR);
};

module.exports.hent = async (req, res) => {
  const fnr = req.query.fnr;
  if (fnr && fnr.length === 11) {
    const person = await lesPerson(fnr);
    return res.json(person);
  }
  let message = '';
  if (!fnr) {
    message = 'Mangler fnr';
  }
  else if (fnr.length !== 9) {
    message = 'Fnr må ha 11 siffer';
  }
  logger.warn(message);
  const url = URL.parse(req.url);
  const melding = ERR.badRequest400(url.pathname, message);
  return res.status(400).send(melding);
};
