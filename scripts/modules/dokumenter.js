const log4js = require('log4js');
const URL = require('url');
const Ajv = require('ajv');
const Utils = require('./utils');
const ERR = require('./errors');
const Schema = require('../test/schema-util');
const { dokumenttyper } = require('../modules/kodeverk/dokumenttyper');
const dokumentTypeKoder = dokumenttyper.reduce((acc,curr) => {acc.push(curr.kode); return acc;},[]);

const logger = log4js.getLogger('mock');

const ajv = new Ajv({allErrors: true});

const SCRIPTS_DIR = `${process.cwd()}/scripts`;
const MOCK_DATA_DIR = `${SCRIPTS_DIR}/mock_data`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;
const MOCK_DOKUMENTER_DATA_DIR = `${MOCK_DATA_DIR}/dokumenter`;



const schemajson = `${SCHEMA_DIR}/dokumenter-post-schema.json`;
const schema = Schema.lesSchemaSync(schemajson);
const validate = ajv.compile(schema);

const isRestParamsInValid = req => {
  const url = URL.parse(req.url);
  const { behandlingID, dokumenttypeKode } = req.params;
  let melding = null;

  if (!behandlingID) {
    melding = ERR.badRequest400(url, 'REST param, :behandlingID, /dokumenter/utkast/pdf/:behandlingID/:dokumenttypeKode mangler');
  }
  else if (!dokumenttypeKode) {
    melding = ERR.badRequest400(url, 'REST param, :dokumenttypeKode, /dokumenter/utkast/pdf/:behandlingID/:dokumenttypeKode mangler');
  }
  else if (!dokumentTypeKoder.includes(dokumenttypeKode)) {
    melding = ERR.badRequest400(url, `REST param :dokumenttypeKode, ${dokumenttypeKode}, har ukjent verdi`);
  }
  return melding;
};

module.exports.hentPdf = (req, res) => {

  const errorMelding = isRestParamsInValid(req);
  if (errorMelding && errorMelding.status) {
    logger.error(JSON.stringify(errorMelding));
    return res.status(400).send(errorMelding);
  }

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
*/
module.exports.lagPdfUtkast = (req, res) => {
  const url = URL.parse(req.url);
  const { body } = req;

  const errorMelding = isRestParamsInValid(req);
  if (errorMelding && errorMelding.status) {
    logger.error(JSON.stringify(errorMelding));
    return res.status(400).send(errorMelding);
  }

  try {
    const mottakere = ["BRUKER","ARBEIDSGIVER"];
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const { mottaker} = jsBody;
    logger.debug("dokument:lagPdfUtkast", JSON.stringify(jsBody));

    if (mottaker && mottakere.includes(mottaker.toUpperCase())) {

      const label = "Dokument::lagPdfUtkast";
      const valid = test(label, validate, jsBody);

      if (valid) {
        const mockfile = `${MOCK_DOKUMENTER_DATA_DIR}/mangelbrev_${mottaker}.pdf`;
        logger.trace(mockfile);
        res.type('application/pdf');
        res.sendFile(mockfile);
      }
      else {
        valideringFeil(req, res);
      }
    }
    else {
      const melding = ERR.badRequest400(url, "body param 'mottaker=BRUKER|ARBEIDSGIVER' mangler");
      res.status(400).send(melding);
    }
  }
  catch (err) {
    const melding = ERR.serverError500(url,err);
    res.status(500).send(melding);
  }
};

module.exports.opprettDokument = (req, res) => {
  const { body, params } = req;

  const errorMelding = isRestParamsInValid(req);
  if (errorMelding && errorMelding.status) {
    logger.error(JSON.stringify(errorMelding));
    return res.status(400).send(errorMelding);
  }

  try {
    // Body is only required for '000074' => 'Innhente manglende opplysninger'
    const dokumentTypeKodeIndex = dokumentTypeKoder.findIndex(kode => kode === '000074');
    if (dokumentTypeKodeIndex >= 0) {
      const dokumentType = dokumentTypeKoder[dokumentTypeKodeIndex];
      console.dir(dokumentType);
      const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
      logger.debug("dokument:opprettDokument", JSON.stringify(jsBody));

      const label = "Dokument::opprettDokument";
      const valid = test(label, validate, jsBody);
      if (!valid) {
        return valideringFeil(req, res);
      }
    }

    const { behandlingID, dokumenttypeKode } = params;
    const dokumentUrl = `/dokumenter/pdf/${behandlingID}/${dokumenttypeKode}`;
    res.location(`/dokumenter/pdf/${behandlingID}/${dokumenttypeKode}`);
    res.send(201, dokumentUrl);
    //res.redirect(201, dokumentUrl);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

function valideringFeil(req, res) {
  const status = 400;
  const melding = ERR.errorMessage(400,'Bad Request', 'Invalid schema', req.originalUrl);
  res.status(status).send(melding);
}

function test(label, validate, data) {
  const valid = validate(data);
  if (valid) console.log(`${label}, Valid`);
  else console.log('Invalid: ' + ajv.errorsText(validate.errors));
  return valid;
}
