const SchemaValidator  = require('../../utils/schemavalidator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap['fagsaker-kontaktopplysninger'];

module.exports.hentKontaktopplysninger = async (req, res) => {
  const { saksnummer, juridiskorgnr } = req.params;
  if (!saksnummer) {
    return Mock.manglerParamSaksnummer(req, res);
  }
  if (!juridiskorgnr) {
    return Mock.manglerParamJuridiskOrgnr(req, res);
  }
  const pathObject = {
    pathname: 'kontaktopplysninger-snr-:saksnummer-jorgnr-:juridiskorgnr',
    params: { saksnummer, juridiskorgnr },
  };
  return SchemaValidator.get(moduleName, req, res, pathObject);
};

module.exports.sendKontaktopplysninger = (req, res) => {
  const { saksnummer, juridiskorgnr } = req.params;
  if (!saksnummer) {
    return Mock.manglerParamSaksnummer(req, res);
  }
  if (!juridiskorgnr) {
    return Mock.manglerParamJuridiskOrgnr(req, res);
  }
  SchemaValidator.post(moduleName, req, res);
};

module.exports.slettKontaktopplysninger = (req, res) => {
  const { saksnummer, juridiskorgnr } = req.params;
  if (!saksnummer) {
    return Mock.manglerParamSaksnummer(req, res);
  }
  if (!juridiskorgnr) {
    return Mock.manglerParamJuridiskOrgnr(req, res);
  }
  SchemaValidator.slett(moduleName, req, res);
};
