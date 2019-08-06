const Mock = require('../../utils/mock-util');
const SchemaPostValidator  = require('../../utils/schema-post-validator');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap['dokumenter-opprett'];

// Body is only required for '000074' => 'Innhente manglende opplysninger'
const erMangelBrevMedFritekst = (dokumenttypeKode) => {
  return 'MELDING_MANGLENDE_OPPLYSNINGER' === dokumenttypeKode; // TODO hent fra Kodverk!!
};

module.exports.opprett = (req, res) => {
  const { behandlingID, dokumenttypeKode } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  if (!dokumenttypeKode) {
    return Mock.manglerParamDokumenttypeKode(req, res);
  }
  if (erMangelBrevMedFritekst(dokumenttypeKode)) {
    SchemaPostValidator.post204(moduleName, req, res);
  }
  else {
    res.status(204).json();
  }
};


