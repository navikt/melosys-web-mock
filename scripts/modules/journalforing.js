const fs = require('fs');
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const utils = require('./utils');
const ERR = require('./errors');

const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_JOURNALFORING_DIR = `${MOCK_DATA_DIR}/journalforing`;

const finnJournalpostFil = (journalpostID) => {
  const mockfiles = fs.readdirSync(MOCK_JOURNALFORING_DIR);
  return mockfiles.find(function (filnavn) {
    return filnavn.startsWith(journalpostID);
  });
  return null;
};
const lesOppgave = (journalpostID) => {
  /* TODO lage flere filer.
  const filnavn = finnJournalpostFil(journalpostID);
  return filnavn ? JSON.parse(fs.readFileSync(`${MOCK_JOURNALFORING_DIR}/${filnavn}`, "utf8")) : {};
  */
  return JSON.parse(fs.readFileSync(`${MOCK_JOURNALFORING_DIR}/DOK_3789-30098000492.json`, "utf8"))
};

exports.hent = (req, res) => {
  try {
    const journalpostID = req.params.journalpostID;
    const journalpost = lesOppgave(journalpostID);
    return res.json(journalpost);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.sendOpprettNySak = (req, res) => {
  const schemajson = `${MOCK_JOURNALFORING_DIR}/opprett-schema.json`;
  const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
  const validate = ajv.compile(schema);

  const body = req.body;
  try {
    let jsonBody = utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = test(validate, jsonBody);
    return (valid) ? res.json('') : valideringFeil(req, res);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.sendTilordneSak = (req, res) => {
  const schemajson = `${MOCK_JOURNALFORING_DIR}/tilordne-schema.json`;
  const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
  const validate = ajv.compile(schema);

  const body = req.body;
  try {
    let jsonBody = utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = test(validate, jsonBody);
    return (valid) ? res.json('') : valideringFeil(req, res);
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

function test(validate, data) {
  const valid = validate(data);
  if (valid) console.log('Valid!');
  else console.log('Invalid: ' + ajv.errorsText(validate.errors));
  return valid;
}
