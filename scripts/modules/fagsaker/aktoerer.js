const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const URL = require('url');

const { MOCK_DATA_DIR, SCHEMA_DIR } = require('../../../mock.config');
const SchemaPostValidator  = require('../schema-post-validator');
const Utils = require('../../utils/utils');
const Schema = require('../../utils/schema-util');
const ERR = require('../../utils/errors');

const AKTOER_DATA_DIR = `${MOCK_DATA_DIR}/fagsaker/aktoerer`;

const lesAktoer = async (saksnummer, rolle) => {
  const mockfile = `${AKTOER_DATA_DIR}/aktoer-snr-${saksnummer}.json`;
  const aktoerer = JSON.parse(await Utils.readFileAsync(mockfile));
  return ( rolle ) ? aktoerer.filter(aktor => aktor.rolleKode === rolle) : aktoerer;
};

module.exports.lesAktoerKatalog = () => {
  return Schema.lesKatalogSync(AKTOER_DATA_DIR);
};

module.exports.hentAktoerer = async (req, res) => {
  const { saksnummer } = req.params;
  const { rolle } = req.query;
  const url = URL.parse(req.url);

  if (!saksnummer) {
    const message = "Mangler saksnummer";
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

module.exports.sendAktoer = (req, res) => {
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const label = 'Fagsaker::aktoerer:sendAktoer';
  logger.debug(`${label}`, JSON.stringify(jsBody));

  const schemajson = `${SCHEMA_DIR}/aktoer-post-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);
  const valid = SchemaPostValidator.test(label, schema, jsBody);
  return valid ? res.json(jsBody) : SchemaPostValidator.valideringFeil(req, res);
};
