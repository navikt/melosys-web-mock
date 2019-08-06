const _ = require('lodash');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const SchemaPostValidator  = require('../../utils/schema-post-validator');
const Utils = require('../../utils/utils');
const Mock = require('../../utils/mock-util');

const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["fagsaker-kontaktopplysninger"];
const KONTAKT_OPPLYSNINGER_DATA_DIR = `${MOCK_DATA_DIR}/${moduleName}`;

const lesKontaktopplysning = async (saksnummer, juridiskorgnr) => {
  const mockfile = `${KONTAKT_OPPLYSNINGER_DATA_DIR }/kontaktopplysninger-snr-${saksnummer}.json`;
  const kontaktopplysninger = await Utils.readJsonAndParseAsync(mockfile);
  return kontaktopplysninger.find(elem => elem.juridiskorgnr === juridiskorgnr);
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
  SchemaPostValidator.post(moduleName, req, res);
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
