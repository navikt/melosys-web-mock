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
  ATTEST_A1,
  AVSLAG_YRKESAKTIV,
  AVSLAG_ARBEIDSGIVER,
  AVSLAG_MANGLENDE_OPPLYSNINGER,
  INNVILGELSE_ARBEIDSGIVER,
  INNVILGELSE_YRKESAKTIV,
  MELDING_MANGLENDE_OPPLYSNINGER,
  ORIENTERING_ANMODNING_UNNTAK
} = MKV.Koder.brev.produserbaredokumenter;

const MOCK_DOKUMENTER_DATA_DIR = `${MOCK_DATA_DIR}/${moduleName}`;

const pdfnameLookup = produserbartDokument => {
  let pdfname = '';
  switch (produserbartDokument) {
    case ATTEST_A1:
      pdfname = 'attest_a1';
      break;
    case AVSLAG_YRKESAKTIV:
    case AVSLAG_ARBEIDSGIVER:
      pdfname = 'avslagarbeidsgiver';
      break;
    case AVSLAG_MANGLENDE_OPPLYSNINGER:
      pdfname = 'avslagmanglendeopplysninger';
      break;
    case MELDING_MANGLENDE_OPPLYSNINGER: // i.e. erMangelBrevMedFritekst(...)
      break;
    case INNVILGELSE_ARBEIDSGIVER:
    case INNVILGELSE_YRKESAKTIV:
      pdfname = 'innvilgelseyrkesaktiv';
      break;
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
    return Mock.badRequestParam(req, res, `Ugylding kode for produserbartDokument: ${produserbartDokument}`);
  }

  let pdfmockfile = '';

  // Body is only required for '000074' => 'Innhente manglende opplysninger'
  if (DocUtils.erMangelBrevMedFritekst(produserbartDokument)) {
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const { mottaker } = jsBody;
    if (DocUtils.erGyldigMottakerKode(mottaker) === false) {
      return Mock.badRequestParam(req, res, `Ugyldig mottaker: ${mottaker}, i post-body`);
    }
    pdfmockfile = `${MOCK_DOKUMENTER_DATA_DIR}/mangelbrev_${mottaker}.pdf`;
  }
  else {
    const pdfname = pdfnameLookup(produserbartDokument);
    pdfmockfile = `${MOCK_DOKUMENTER_DATA_DIR}/${pdfname}.pdf`;
  }
  SchemaValidator.postSendPDF(moduleName, req, res, pdfmockfile);

};

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
  SchemaValidator.getPDF(moduleName, req, res, pdfmockfile);
};
