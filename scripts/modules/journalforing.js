const utils = require('./utils');

const oppgave = {
  bruker: {
    navn: 'LILLA HEST',
    ID: '05056335023',
  },
  erBrukerAvsender: false,
  avsender: {
    navn: 'LILLA HEST',
    ID: '05056335023',
  },
  sakstype: {
    kode: 'EU_EOS',
    term: 'EU/EØS'
  },
  dokument: {
    navn: 'Dokumentets navn',
    mottattDato: '2018-04-20',
    tittel: {
      kode : 'SOK_MED',
      term : 'Søknad om medlemskap'
    }
  }
};

exports.hentOppgave = (req, res) => {
  try {
    return res.json(oppgave);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.postOppgave = (req, res) => {
  const body = req.body;
  try {
    /*let jsonBody = utils.isJSON(body) ? JSON.parse(body) : body;
    console.log('jornalforing::postOppgave', jsonBody);*/
    const response = {};
    res.json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
