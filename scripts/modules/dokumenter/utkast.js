const MKV = require('melosys-kodeverk');
const Utils = require('../../utils/utils');
const ERR = require('../../utils/errors');
const Mock = require('../../utils/mock-util');
const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');

const DocUtils = require('./docutils');
const {  MOCK_DATA_DIR } = require('../../../mock.config');
const { moduleName } = Katalog.pathnameMap['dokumenter-pdf-utkast'];

const {
  ATTEST_A1, INNVILGELSE_YRKESAKTIV, AVSLAG_YRKESAKTIV, AVSLAG_ARBEIDSGIVER, ORIENTERING_ANMODNING_UNNTAK, MELDING_MANGLENDE_OPPLYSNINGER
} = MKV.Koder.brev.produserbaredokumenter;

const pdfnameLookup = produserbartDokument => {
  let pdfname = '';
  switch (produserbartDokument) {
    case ATTEST_A1:
      pdfname = 'hoveddokument';
      break;
    case MELDING_MANGLENDE_OPPLYSNINGER: // i.e. erMangelBrevMedFritekst(...)
      break;
    case INNVILGELSE_YRKESAKTIV:
      pdfname = 'vedtaksbrevforkortetperiode';
      break;
    case AVSLAG_YRKESAKTIV:
    case AVSLAG_ARBEIDSGIVER:
    case ORIENTERING_ANMODNING_UNNTAK:
    default:
      pdfname = 'hoveddokument';
      break;
  }
  return pdfname;
};

module.exports.utkast = (req, res) => {
  const { body, params } = req;
  const { behandlingID, produserbartDokument } = params;
  console.log(params);
  if(!req.accepts('application/pdf')) {
    const melding = ERR.notAcceptable406();
    return res.status(406).send(melding);
  }
  else if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  else if (!produserbartDokument) {
    return Mock.manglerParamProduserbartDokument(req, res);
  }
  else if (DocUtils.erGyldigProduserbartDokumentKode(produserbartDokument) === false) {
    return Mock.badRequstParam(req, res, `Ugylding kode for produserbartDokument: ${produserbartDokument}`);
  }

  const MOCK_DOKUMENTER_DATA_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
  let pdfmockfile = '';

  // Body is only required for '000074' => 'Innhente manglende opplysninger'
  if (DocUtils.erMangelBrevMedFritekst(produserbartDokument)) {
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const { mottaker } = jsBody;
    if (DocUtils.erGyldigMottakerKode(mottaker) === false) {
      return Mock.badRequstParam(req, res, `Ugyldig mottaker: ${mottaker}, i post-body`);
    }
    pdfmockfile = `${MOCK_DOKUMENTER_DATA_DIR}/mangelbrev_${mottaker}.pdf`;
  }
  else {
    const pdfname = pdfnameLookup(produserbartDokument);
    pdfmockfile = `${MOCK_DOKUMENTER_DATA_DIR}/${pdfname}.pdf`;
  }
  SchemaValidator.postSendPDF(moduleName, req, res, pdfmockfile);

};
