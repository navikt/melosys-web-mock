const ERR = require('../../../utils/errors');
const Mock = require('../../../utils/mock-util');
const SchemaValidator  = require('../../../utils/schemavalidator');
const Katalog = require('../../../katalog');

const {  MOCK_DATA_DIR } = require('../../../../mock.config');
const { moduleName } = Katalog.pathnameMap['dokumenter-pdf-utkast-sed'];
const MOCK_DOKUMENTER_DATA_DIR = `${MOCK_DATA_DIR}/${moduleName}`;

module.exports.sedPdf = (req, res) => {
  const { behandlingID, sedType } = req.params;
  if (!req.accepts('application/pdf')) {
    return res.status(406).send(ERR.notAcceptable406());
  } else if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  } else if (!sedType) {
    return Mock.badRequestParam(req, res, "sedType");
  }

  const pdfmockfile = `${MOCK_DOKUMENTER_DATA_DIR}/SED_A001.pdf`;
  SchemaValidator.postSendPDF(moduleName, req, res, pdfmockfile);
};
