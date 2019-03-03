const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const URL = require('url');

const { MOCK_DATA_DIR } = require('../../mock.config');
const Utils = require('../utils/utils');
const Schema = require('../utils/schema-util');

const ERR = require('../utils/errors');
const AKTOER_DATA_DIR = `${MOCK_DATA_DIR}/aktoer`;

const lesAktoer = async (saksnummer, rolle) => {
  const mockfile = `${AKTOER_DATA_DIR}/aktoer-snr-${saksnummer}.json`;
  const aktoerer =  JSON.parse(await Utils.readFileAsync(mockfile));
  return aktoerer.filter(aktor => aktor.rolleKode === rolle);
};

module.exports.lesAktoerKatalog = () => {
  return Schema.lesKatalogSync(AKTOER_DATA_DIR);
};

module.exports.hent = async (req, res) => {
  const { saksnummer, rolle } = req.params;
  const url = URL.parse(req.url);

  if (!saksnummer) {
    const message = "Mangler saksnummer";
    const melding = ERR.badRequest400(url.pathname, message);
    return res.status(400).send(melding);
  }
  else if (!rolle) {
    const message = "Mangler rolle";
    const melding = ERR.badRequest400(url.pathname, message);
    return res.status(400).send(melding);
  }

  try {
    const aktoer = await lesAktoer(saksnummer, rolle);
    res.json(aktoer);
  }
  catch (e) {
    console.error(e);
    logger.error(e.message);
    const melding = ERR.serverError500(url.pathname, e.message);
    return res.status(500).send(melding);
  }
};
