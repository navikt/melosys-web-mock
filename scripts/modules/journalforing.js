// const fs = require('fs');

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
    },
    vedleggstitler: [
      {
        kode: 'TITTEL_1',
        term: 'Vedleggstittel 1'
      },
      {
        kode: 'TITTEL_2',
        term: 'Vedleggstittel 2'
      }
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
