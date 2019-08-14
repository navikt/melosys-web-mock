const Utils = require('../../utils/utils');
const ERR = require('../../utils/errors');
const Mock = require('../../utils/mock-util');
const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');
const {  MOCK_DATA_DIR } = require('../../../mock.config');
const { moduleName } = Katalog.pathnameMap['dokumenter-pdf-utkast'];

// Body is only required for '000074' => 'Innhente manglende opplysninger'
const erMangelBrevMedFritekst = (dokumenttypeKode) => {
  return 'MELDING_MANGLENDE_OPPLYSNINGER' === dokumenttypeKode; // TODO hent fra Kodeverk!!
};

module.exports.utkast = (req, res) => {
  const { body, params } = req;
  const { behandlingID, dokumenttypeKode } = params;
  if(!req.accepts('application/pdf')) {
    const melding = ERR.notAcceptable406();
    return res.status(406).send(melding);
  }
  else if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  else if (!dokumenttypeKode) {
    return Mock.manglerParamDokumenttypeKode(req, res);
  }
  console.log(dokumenttypeKode);
  // TODO Add pdf docs that reflect dokumenttypeKode aka produserbartDokument !!
  switch (dokumenttypeKode) {
    case 'ATTEST_A1':
      break;
    case 'INNVILGELSE_YRKESAKTIV':
      break;
    case 'AVSLAG_YRKESAKTIV':
      break;
    case 'AVSLAG_ARBEIDSGIVER':
      break;
    case 'ORIENTERING_ANMODNING_UNNTAK':
      break;
    case 'MELDING_MANGLENDE_OPPLYSNINGER': // i.e. erMangelBrevMedFritekst(...)
      break;
    default:
      break;
  }
  const MOCK_DOKUMENTER_DATA_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
  let pdfmockfile = `${MOCK_DOKUMENTER_DATA_DIR}/hoveddokument.pdf`;

  if (erMangelBrevMedFritekst(dokumenttypeKode)) {
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const { mottaker } = jsBody;
    pdfmockfile = `${MOCK_DOKUMENTER_DATA_DIR}/mangelbrev_${mottaker}.pdf`;
  }
  SchemaValidator.postSendPDF(moduleName, req, res, pdfmockfile);

};
