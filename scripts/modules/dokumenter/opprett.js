const Mock = require('../../utils/mock-util');
const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');
const DocUtils = require('./docutils');
const { moduleName } = Katalog.pathnameMap['dokumenter-opprett'];

module.exports.opprett = (req, res) => {
  const { behandlingID, produserbartDokument } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  if (!produserbartDokument) {
    return Mock.manglerParamProduserbartDokument(req, res);
  }
  if (DocUtils.erGyldigProduserbartDokumentKode(produserbartDokument) === false) {
    return Mock.badRequestParam(req, res, `Ugylding kode for produserbartDokument: ${produserbartDokument}`);
  }
  // Body is only required for '000074' => 'Innhente manglende opplysninger'
  if (DocUtils.erMangelBrevMedFritekst(produserbartDokument)) {
    SchemaValidator.post204(moduleName, req, res);
  }
  else {
    res.status(204).json();
  }
};


