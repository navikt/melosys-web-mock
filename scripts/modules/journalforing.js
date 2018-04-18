const oppgaveDokument = {
  bruker: {
    personnummer: '05056335023',
    sammensattNavn: 'LILLA HEST',
  },
  avsender: {
    personnummer: '05056335023',
    sammensattNavn: 'LILLA HEST',
  },
  erBrukerAvsender: false,
  dokument: {
    navn: 'Navn',
    mottattDato: '2018-04-18',
    tittel: 'ØKNAD_MEDLEMSSKAP',
    vedleggstitler: [ "TODO_1", "TODO_2" ],
  }
};

exports.hentOppgave  = (req, res) => {
  const journalpostID = req.params.journalpostID;
  // Triks for å sikre at journalpostID kommmer som forste key og ikke sist
  const oppgave = {
    journalpostID,
    ...oppgaveDokument,
  };
  try {
    return res.json(oppgave);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
