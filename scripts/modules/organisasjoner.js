const fs = require('fs');
const URL = require('url');

const ERR = require('./errors');
const Utils = require('./utils');

const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_DATA_ORG_DIR = `${MOCK_DATA_DIR}/organisasjoner`;

exports.lesAlleOrganisasjoner = () => {
  return Utils.lesKatalog(MOCK_DATA_ORG_DIR);
};
/**
 * Les organisasjon json fil eller returner tom svar
 * @param orgnr
 * @returns {{}}
 */
const lesOrganisasjon = (orgnr) => {
  const mockfile = `${MOCK_DATA_ORG_DIR}/orgnr-${orgnr}.json`;
  return fs.existsSync(mockfile) ? JSON.parse(fs.readFileSync(mockfile, "utf8")) : {};
};

/**
 * Hent organisasjon git /api/organisasjon/?orgnr=:orgnr
 * @param req
 * @param res
 * @returns {*}
 */
exports.hent = (req, res) => {
  const orgnr = req.query.orgnr;
  if (orgnr && orgnr.length === 9) {
    const organisasjon = lesOrganisasjon(orgnr);
    return res.json(organisasjon);
  }
  let message = '';
  if (!orgnr) {
    message = 'Mangler orgnr';
  }
  else if (orgnr.length !== 9) {
    message = 'Orgnr må ha 9 siffer';
  }

  const url = URL.parse(req.url);
  const melding = ERR.badRequest400(url.pathname, message);
  return res.status(400).send(melding);
};
