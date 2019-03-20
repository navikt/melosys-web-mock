const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const URL = require('url');

const { MOCK_DATA_DIR, SCHEMA_DIR } = require('../../../mock.config');
const SchemaPostValidator  = require('../../utils/schema-post-validator');
const Utils = require('../../utils/utils');
const Schema = require('../../utils/schema-util');
const ERR = require('../../utils/errors');

const KONTAKT_OPPLYSNINGER_DATA_DIR = `${MOCK_DATA_DIR}/fagsaker/kontaktopplysninger`;

const lesKontaktopplysninger = async (saksnummer, orgnr) => {
  const mockfile = `${KONTAKT_OPPLYSNINGER_DATA_DIR }/kontaktopplysninger-snr-${saksnummer}.json`;
  const kontaktopplysninger = JSON.parse(await Utils.readFileAsync(mockfile));
  return ( orgnr ) ? kontaktopplysninger.filter(elem => elem.orgnr === orgnr) : kontaktopplysninger;
};

module.exports.lesKontaktopplysningerKatalog = () => {
  return Schema.lesKatalogSync(KONTAKT_OPPLYSNINGER_DATA_DIR );
};

module.exports.hentKontaktopplysninger = async (req, res) => {
  const { saksnummer, juridiskorgnr } = req.params;
  const { rolle: orgnr } = req.query;
  const url = URL.parse(req.url);

  if (!saksnummer) {
    const message = "Mangler saksnummer";
    const melding = ERR.badRequest400(url.pathname, message);
    return res.status(400).send(melding);
  }
  else if (!juridiskorgnr) {
    const message = "Mangler juridiskorgnr";
    const melding = ERR.badRequest400(url.pathname, message);
    return res.status(400).send(melding);
  }

  try {
    const kontaktopplysninger = await lesKontaktopplysninger(saksnummer, orgnr);
    res.json(kontaktopplysninger);
  }
  catch (e) {
    console.error(e);
    logger.error(e.message);
    const melding = ERR.serverError500(url.pathname, e.message);
    return res.status(500).send(melding);
  }
};

module.exports.sendKontaktopplysninger = (req, res) => {
  const { saksnummer, juridiskorgnr } = req.params;
  const url = URL.parse(req.url);
  if (!saksnummer) {
    const message = "Mangler saksnummer";
    const melding = ERR.badRequest400(url.pathname, message);
    return res.status(400).send(melding);
  }
  else if (!juridiskorgnr) {
    const message = "Mangler juridiskorgnr";
    const melding = ERR.badRequest400(url.pathname, message);
    return res.status(400).send(melding);
  }
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const label = 'Fagsaker::Kontaktopplysninger:sendKontaktopplysninger';
  logger.debug(`${label}`, JSON.stringify(jsBody));

  const schemajson = `${SCHEMA_DIR}/kontaktopplysninger-post-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);
  const valid = SchemaPostValidator.test(label, schema, jsBody);
  return valid ? res.json(jsBody) : SchemaPostValidator.valideringFeil(req, res);
};

module.exports.slettKontaktopplysninger = (req, res) => {
  const { saksnummer } = req.params;
  console.log('slettKontaktopplysninger', saksnummer);
  res.send('DELETE request to homepage');
};
