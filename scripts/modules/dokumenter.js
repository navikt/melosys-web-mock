const log4js = require('log4js');
const URL = require('url');

const Utils = require('../utils/utils');
const ERR = require('../utils/errors');
const Mock = require('../utils/mock-util');
const {  MOCK_DATA_DIR } = require('../../mock.config');
const SchemaPostValidator  = require('../utils/schema-post-validator');

const Schema = require('../utils/schema-util');

const logger = log4js.getLogger('mock');
const MOCK_DOKUMENTER_DATA_DIR = `${MOCK_DATA_DIR}/dokumenter`;

const schemaNavn = 'dokumenter-post-schema.json';

const isRestParamsInValid = req => {
  const url = URL.parse(req.url);
  const { behandlingID, dokumenttypeKode } = req.params;
  let melding = null;

  if (!behandlingID) {
    melding = ERR.badRequest400(url, 'REST param, :behandlingID, i /dokumenter/utkast/pdf/:behandlingID/:dokumenttypeKode mangler');
  }
  else if (!dokumenttypeKode) {
    melding = ERR.badRequest400(url, 'REST param, :dokumenttypeKode, i /dokumenter/utkast/pdf/:behandlingID/:dokumenttypeKode mangler');
  }
  return melding;
};

/**
 * lesDokumenterKatalog
 */
module.exports.lesDokumenterKatalog = () => {
  return Schema.lesKatalogSync(MOCK_DOKUMENTER_DATA_DIR);
};

const lesOversikt = () => {
  const mockfile = `${MOCK_DOKUMENTER_DATA_DIR}/oversikt.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};

/**
 * oversikt
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.oversikt = async (req, res) => {
  try {
    const oversikt = await lesOversikt();
    res.json(oversikt);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

/**
 *
 * @param req
 * @param res
 */
module.exports.hentPdf = (req, res) => {
  //const { journalforingID, dokumentID } = req.params;
  const mockfile = `${MOCK_DOKUMENTER_DATA_DIR}/dokumenttest.pdf`;
  logger.trace(mockfile);
  res.type('application/pdf');
  res.sendFile(mockfile);
};

// Forhåndsvisning pdf, eks brev, etc.
// [POST] http://localhost:3002/api/dokumenter/utkast/pdf/3/000074
/*
Body required onlyif; :dokumenttypeKode='000074' => 'Innhente manglende opplysninger'
{
  "mottaker": "ARBEIDSGIVER|MOTTAKER",
  "fritekst": "blahbalh"
}
return {location: `/dokumenter/pdf/${journalforingID}/${dokumentID}`};
*/
/**
 * lagPdfUkast
 * @param req
 * @param res
 * returns {location: `/dokumenter/pdf/${journalforingID}/${dokumentID}`}
 */
module.exports.lagPdfUtkast = (req, res) => {
  if(!req.accepts('application/pdf')) {
    const melding = ERR.notAcceptable406();
    return res.status(406).send(melding);
  }

  const url = URL.parse(req.url);
  const { body, params } = req;
  const { dokumenttypeKode } = params;

  const errorMelding = isRestParamsInValid(req);
  if (errorMelding && errorMelding.status) {
    logger.error(JSON.stringify(errorMelding));
    return res.status(400).send(errorMelding);
  }

  try {
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const label = "Dokument:lagPdfUtkast";
    logger.debug(`${label}`, JSON.stringify(jsBody));
    const valid = SchemaPostValidator.test2(label, schemaNavn, jsBody);
    if (!valid) {
      return SchemaPostValidator.valideringFeil(req, res);
    }

    if (erMangelBrevMedFritekst(dokumenttypeKode)) {
      const { mottaker } = jsBody;
      const mockfile = `${MOCK_DOKUMENTER_DATA_DIR}/mangelbrev_${mottaker}.pdf`;
      logger.trace(mockfile);
      res.type('application/pdf');
      res.sendFile(mockfile);
    }
    else {
      const mockfile = `${MOCK_DOKUMENTER_DATA_DIR}/dokumenttest.pdf`;
      logger.trace(mockfile);
      res.type('application/pdf');
      res.sendFile(mockfile);
    }
  }
  catch (err) {
    const melding = ERR.serverError500(url,err);
    res.status(500).send(melding);
  }
};

module.exports.opprettDokument = (req, res) => {
  const { body, params } = req;
  const { dokumenttypeKode } = params;

  const errorMelding = isRestParamsInValid(req);
  if (errorMelding && errorMelding.status) {
    logger.error(JSON.stringify(errorMelding));
    return res.status(400).send(errorMelding);
  }

  try {
    if (erMangelBrevMedFritekst(dokumenttypeKode)) {
      const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
      const label = "Dokument:opprettDokument";
      logger.debug(`${label}`, JSON.stringify(jsBody));

      const valid = SchemaPostValidator.test2(label, schemaNavn, jsBody);

      if (!valid) {
        return SchemaPostValidator.valideringFeil(req, res);
      }
    }
    res.status(204).json();
  }
  catch (err) {
    console.log(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};

// Body is only required for '000074' => 'Innhente manglende opplysninger'
const erMangelBrevMedFritekst = (dokumenttypeKode) => {
  return 'MELDING_MANGLENDE_OPPLYSNINGER' === dokumenttypeKode; // TODO hent fra Kodverk!!
};


