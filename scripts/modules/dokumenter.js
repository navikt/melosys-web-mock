const log4js = require('log4js');
const URL = require('url');
const Ajv = require('ajv');
const Utils = require('./utils');
const ERR = require('./errors');
const Schema = require('../test/schema-util');
const logger = log4js.getLogger('mock');

const ajv = new Ajv({allErrors: true});

const SCRIPTS_DIR = `${process.cwd()}/scripts`;
const MOCK_DATA_DIR = `${SCRIPTS_DIR}/mock_data`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;
const MOCK_DOKUMENTER_DATA_DIR = `${MOCK_DATA_DIR}/dokumenter`;



const schemajson = `${SCHEMA_DIR}/dokumenter-post-schema.json`;
const schema = Schema.lesSchemaSync(schemajson);
const validate = ajv.compile(schema);

module.exports.hentPdf = (req, res) => {
  const mockfile = `${MOCK_DOKUMENTER_DATA_DIR}/dokumenttest.pdf`;
  //const journalpostID = req.params.journalpostID;
  //const dokumentID = req.params.dokumentID;
  logger.trace(mockfile);
  res.type('application/pdf');
  res.sendFile(mockfile);
};
// Forhåndsvisning pdf, eks brev, etc.
// http://localhost:3002/api/dokumenter/utkast/pdf/3/4000074/?fritext=blahblah&mottaker=BRUKER
module.exports.lagPdfUtkast = (req, res) => {
  const url = URL.parse(req.url);
  const { body, params } = req;
  const { behandlingID, dokumentTypeID } = params;
  if (!behandlingID) {
    const melding = ERR.badRequest400(url, 'REST param, :behandlingID, /dokumenter/utkast/pdf/:behandlingID/:dokumentTypeID mangler');
    res.status(400).send(melding);
  }
  if (!dokumentTypeID) {
    const melding = ERR.badRequest400(url, 'REST param, :dokumentTypeID, /dokumenter/utkast/pdf/:behandlingID/:dokumentTypeID mangler');
    res.status(400).send(melding);
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
  const url = URL.parse(req.url);
  const { body, params } = req;
  const { behandlingID, dokumentTypeID } = params;
  if (!behandlingID) {
    const melding = ERR.badRequest400(url, 'REST param, :behandlingID, /dokumenter/utkast/pdf/:behandlingID/:dokumentTypeID mangler');
    res.status(400).send(melding);
  }
  if (!dokumentTypeID) {
    const melding = ERR.badRequest400(url, 'REST param, :dokumentTypeID, /dokumenter/utkast/pdf/:behandlingID/:dokumentTypeID mangler');
    res.status(400).send(melding);
  }

  try {
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    logger.debug("dokument:opprettDokument", JSON.stringify(jsBody));

    const label = "Dokument::opprettDokument";
    const valid = test(label, validate, jsBody);
    return (valid) ? res.status(204).json('') : valideringFeil(req, res);
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
