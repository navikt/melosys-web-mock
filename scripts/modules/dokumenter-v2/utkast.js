const ERR = require('../../utils/errors');
const Mock = require('../../utils/mock-util');
const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const { moduleName } = Katalog.pathnameMap['dokumenter-v2-utkast'];

module.exports.utkast = (req, res) => {
  const { behandlingID } = req.params;
  const { produserbardokument } = req.body;

  if(!req.accepts('application/pdf')) {
    const melding = ERR.notAcceptable406();
    return res.status(406).send(melding);
  }
  else if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  else if (!produserbardokument) {
    return Mock.manglerParamProduserbartDokument(req, res);
  }

  const pdfmockfile = `${MOCK_DATA_DIR}/${moduleName}/${produserbardokument}.pdf`;

  SchemaValidator.postSendPDF(moduleName, req, res, pdfmockfile);
};
