const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const URL = require('url');

const { MOCK_DATA_DIR, SCHEMA_DIR } = require('../../../mock.config');
const SchemaPostValidator  = require('../../utils/schema-post-validator');
const Utils = require('../../utils/utils');
const Schema = require('../../utils/schema-util');
const ERR = require('../../utils/errors');

const AKTOER_DATA_DIR = `${MOCK_DATA_DIR}/fagsaker/aktoerer`;

const lesJsonFraFil = async mockfile => JSON.parse(await Utils.readFileAsync(mockfile));

const lesAktoer = async (saksnummer, rolle, representerer) => {
  const mockfile = `${AKTOER_DATA_DIR}/aktoer-snr-${saksnummer}.json`;
  const aktoerer = await lesJsonFraFil(mockfile);
  if (rolle && representerer) {
    return aktoerer
      .filter(aktor => aktor.rolleKode === rolle)
      .filter(aktor => aktor.representererKode === representerer);
  }
  else if (rolle) {
    return aktoerer.filter(aktor => aktor.rolleKode === rolle);
  }
  else if (representerer) {
    return aktoerer.filter(aktor => aktor.representererKode === representerer);
  }
  return aktoerer;
};

module.exports.lesAktoerKatalog = () => {
  return Schema.lesKatalogSync(AKTOER_DATA_DIR);
};

module.exports.hentAktoerer = async (req, res) => {
  const { saksnummer } = req.params;
  const { rolle, representerer } = req.query;
  const url = URL.parse(req.url);

  if (!saksnummer) {
    const message = "Mangler saksnummer";
    const melding = ERR.badRequest400(url.pathname, message);
    return res.status(400).send(melding);
  }

  try {
    const aktoer = await lesAktoer(saksnummer, rolle, representerer);
    res.json(aktoer);
  }
  catch (e) {
    console.error(e);
    logger.error(e.message);
    const melding = ERR.serverError500(url.pathname, e.message);
    return res.status(500).send(melding);
  }
};

module.exports.sendAktoer = async (req, res) => {
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const label = 'Fagsaker::aktoerer:sendAktoer';
  logger.debug(`${label}`, JSON.stringify(jsBody));

  const schemajson = `${SCHEMA_DIR}/aktoer-post-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);
  const valid = SchemaPostValidator.test(label, schema, jsBody);

  if (!valid) return SchemaPostValidator.valideringFeil(req, res);

  const mockfile = `${AKTOER_DATA_DIR}/post/aktoer.json`;
  const aktoer = await lesJsonFraFil(mockfile);

  return res.json(aktoer);
};

module.exports.slettAktoer = (req, res) => {
  const { id } = req.params;
  console.log('slettAktoer', id);
  res.status(204).send();
};
