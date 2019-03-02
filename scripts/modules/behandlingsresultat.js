const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const URL = require('url');

const { MOCK_DATA_DIR } = require('../../mock.config');
const Utils = require('./utils');
const Schema = require('../test/schema-util');

const ERR = require('./errors');
const BEHANDLINGSRESULTAT_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/behandlingsresultat`;

const lesBehandlingsresultat = async (bid) => {
  const mockfile = `${BEHANDLINGSRESULTAT_MOCK_DATA_DIR}/bid-${bid}.json`;
  return await Utils.existsAsync(mockfile) ? JSON.parse(await Utils.readFileAsync(mockfile)) : {};
};

module.exports.lesBehandlingsresultatKatalog = () => {
  return Schema.lesKatalogSync(BEHANDLINGSRESULTAT_MOCK_DATA_DIR);
};

module.exports.hent = async (req, res) => {
  const bid = req.params.behandlingID;
  if (bid && bid.length >= 1) {
    const resultat = await lesBehandlingsresultat(bid);
    return res.json(resultat);
  }

  let message = 'Mangler behandlingsid';
  logger.warn(message);
  const url = URL.parse(req.url);
  const melding = ERR.badRequest400(url.pathname, message);
  return res.status(400).send(melding);
};
