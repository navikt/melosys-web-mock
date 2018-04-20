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
    navn: 'Dokumentes navn',
    registrertDato: '2018-04-20',
    tittel: 'SØKNAD_MEDLEMSSKAP',
    vedlegg: [
      'TODO_1',
      'TODO_2',
      'TODO_3'
    ],
    url: '/dokumenttest.pdf'
  },
  status: {

  },
  behandlingsType: {
    kode: 'SKND',
    term: 'Søknad'
  },
  sakstype: {
    kode: 'EU/EOS',
    term: "EU/EØS"
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
