const MKV = require('@navikt/melosys-kodeverk');
const Katalog = require('../../katalog');
const Mock = require('../../utils/mock-util');
const { moduleName } = Katalog.pathnameMap["dokumenter-v2-mulige-mottakere"];

const SchemaValidator = require('../../utils/schemavalidator');

const {
  MELDING_FORVENTET_SAKSBEHANDLINGSTID_SOKNAD,
  MELDING_FORVENTET_SAKSBEHANDLINGSTID_KLAGE,
  MANGELBREV_BRUKER,
  MANGELBREV_ARBEIDSGIVER,
  INNVILGELSE_FOLKETRYGDLOVEN_2_8
} = MKV.Koder.brev.produserbaredokumenter;

const getPathname = produserbartDokument => {
  switch (produserbartDokument) {
    case MELDING_FORVENTET_SAKSBEHANDLINGSTID_SOKNAD:
    case MELDING_FORVENTET_SAKSBEHANDLINGSTID_KLAGE:
      return 'mulige-mottakere-saksbehandlingstid';
    case MANGELBREV_BRUKER:
      return 'mulige-mottakere-mangelbrev_bruker';
    case MANGELBREV_ARBEIDSGIVER:
      return 'mulige-mottakere-mangelbrev_arbeidsgiver';
    case INNVILGELSE_FOLKETRYGDLOVEN_2_8:
      return 'mulige-mottakere-ftrl-innvilgelse';
    default:
      return 'attest_a1';
  }
};

module.exports.hentMuligeMottakere = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }

  const mockpathObject = {
    pathname: getPathname(req.body.produserbartdokument)
  };

  return SchemaValidator.postFromFile(moduleName, req, res, mockpathObject, moduleName);
};


