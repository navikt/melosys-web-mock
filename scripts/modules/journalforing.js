const fs = require('fs');
const utils = require('./utils');

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
  return JSON.parse(fs.readFileSync(`${MOCK_JOURNALFORING_DIR}/DOK_3789-05056335023.json`, "utf8"))
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
  const body = req.body;
  try {
    let jsonBody = utils.isJSON(body) ? JSON.parse(body) : body;
    console.log('jornalforing::sendOpprettNySak', jsonBody);
    const response = {};
    res.json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.sendTilordneSak = (req, res) => {
  const body = req.body;
  try {
    let jsonBody = utils.isJSON(body) ? JSON.parse(body) : body;
    console.log('jornalforing::sendTilordneSak', jsonBody);
    const response = {};
    res.json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
