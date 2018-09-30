const fs = require('fs');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const URL = require('url');

const ERR = require('./errors');
const Utils = require('./utils');
const Schema = require('../test/schema-util');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_DATA_ORG_DIR = `${MOCK_DATA_DIR}/organisasjoner`;

module.exports.lesOrganisasjonsKatalog = () => {
  return Schema.lesKatalog(MOCK_DATA_ORG_DIR);
};
/**
 * Les organisasjon json fil eller returner tom svar
 * @param orgnr
 * @returns {{}}
 */
const lesOrganisasjon = async (orgnr) => {
  const mockfile = `${MOCK_DATA_ORG_DIR}/orgnr-${orgnr}.json`;
  return await Utils.existsAsync(mockfile) ? JSON.parse(await Utils.readFileAsync(mockfile)) : {};
};

/**
 * Hent organisasjon git /api/organisasjon/?orgnr=:orgnr
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  const orgnr = req.query.orgnr;
  if (orgnr && orgnr.length === 9) {
    const organisasjon = await lesOrganisasjon(orgnr);
    return res.json(organisasjon);
  }
  let message = '';
  if (!orgnr) {
    message = 'Mangler orgnr';
  }
  else if (orgnr.length !== 9) {
    message = 'Orgnr må ha 9 siffer';
  }
  logger.warn(message);
  const url = URL.parse(req.url);
  const melding = ERR.badRequest400(url.pathname, message);
  return res.status(400).send(melding);
};
