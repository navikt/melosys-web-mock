const Mock = require('../../utils/mock-util');
const DocUtils = require('../dokumenter/docutils');

module.exports.opprett = (req, res) => {
  const { behandlingID } = req.params;
  const { produserbardokument } = req.body;

  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  if (!produserbardokument) {
    return Mock.manglerParamProduserbartDokument(req, res);
  }
  if (DocUtils.erGyldigProduserbartDokumentKode(produserbardokument) === false) {
    return Mock.badRequestParam(req, res, `Ugylding kode for produserbartDokument: ${produserbardokument}`);
  }

  res.status(204).json();
};


