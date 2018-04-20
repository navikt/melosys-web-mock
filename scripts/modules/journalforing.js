// const fs = require('fs');

const oppgave = {
  bruker: {
    id: '05056335023',
    navn: 'LILLA HEST',
  },
  erBrukerAvsender: false,
  avsender: {
    id: '05056335023',
    navn: 'LILLA HEST',
  },
  dokument: {
    navn: 'Dokumentets navn',
    mottattDato: '2018-04-20',
    tittel: 'SØKNAD_MEDLEMSSKAP',
    vedlegg: [
      'TITTEL_1',
      'TITTEL_2'
    ],
    url: '/dokumenttest.pdf'
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
