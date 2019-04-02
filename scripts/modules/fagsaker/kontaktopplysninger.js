const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const _ = require('lodash');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const SchemaPostValidator  = require('../../utils/schema-post-validator');
const Utils = require('../../utils/utils');
const Schema = require('../../utils/schema-util');
const Mock = require('../../utils/mock-util');

const KONTAKT_OPPLYSNINGER_DATA_DIR = `${MOCK_DATA_DIR}/fagsaker/kontaktopplysninger`;

const lesKontaktopplysning = async (saksnummer, juridiskorgnr) => {
  const mockfile = `${KONTAKT_OPPLYSNINGER_DATA_DIR }/kontaktopplysninger-snr-${saksnummer}.json`;
  const kontaktopplysninger = await Utils.readJsonAndParseAsync(mockfile);
  return kontaktopplysninger.find(elem => elem.juridiskorgnr === juridiskorgnr);
};

/**
 * lesKontaktopplysningerKatalog
 */
module.exports.lesKontaktopplysningerKatalog = () => {
  return Schema.lesKatalogSync(KONTAKT_OPPLYSNINGER_DATA_DIR );
};

const manglerParamSakEllerOrgNummer = (req, res,) => {
  const MANGLER = true;
  const { saksnummer, juridiskorgnr } = req.params;
  if (!saksnummer) {
    Mock.manglerParamSaksnummer(req, res);
    return MANGLER;
  }
  else if (!juridiskorgnr) {
    Mock.badRequstParam(req, res, 'Mangler juridiskorgnr');
    return MANGLER
  }
  return false;
};

/**
 * hentKontaktopplysninger
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.hentKontaktopplysninger = async (req, res) => {
  if (manglerParamSakEllerOrgNummer(req, res)) return;
  try {
    const { saksnummer, juridiskorgnr } = req.params;
    const kontaktopplysninger = await lesKontaktopplysning(saksnummer, juridiskorgnr);
    if (!kontaktopplysninger) {
      return Mock.notFound(req, res, `Ingen kontaktopplysinger funnet for, ${saksnummer} og ${juridiskorgnr}`);
    }
    res.json(_.omit(kontaktopplysninger, 'juridiskorgnr'));
  }
  catch (e) {
    return Mock.serverError(req, res, e);
  }
};

/**
 * sendKontaktopplysninger
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.sendKontaktopplysninger = (req, res) => {
  if (manglerParamSakEllerOrgNummer(req, res)) return;

  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const label = 'Fagsaker::Kontaktopplysninger:sendKontaktopplysninger';
  logger.debug(`${label}`, JSON.stringify(jsBody));

  try {
    const schemaNavn = 'kontaktopplysninger-post-schema.json';
    const valid = SchemaPostValidator.test2(label, schemaNavn, jsBody);
    return valid ? res.json(jsBody) : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

/**
 * slettKontaktopplysninger
 * @param req
 * @param res
 */
module.exports.slettKontaktopplysninger = (req, res) => {
  if (manglerParamSakEllerOrgNummer(req, res)) return;
  try {
    const { saksnummer, juridiskorgnr } = req.params;
    console.log('slettKontaktopplysninger', saksnummer, juridiskorgnr);
    res.status(204).send();
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
