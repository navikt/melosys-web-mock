const utils = require('./utils');

const journalpost = {
  brukerID: '05056335023',
  erBrukerAvsender: false,
  avsenderID: '05056335023',
  dokument: {
    ID: 'MockDokumentID',
    mottattDato: '2018-04-20',
    tittel: 'Søknad om medlemskap',
  }
};
exports.hentOppgave = (req, res) => {
  try {
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
