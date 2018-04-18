// const fs = require('fs');
const Kodeverk = require('./kodeverk');

const kategorier = [{
  kode: 'BREV',
  term: 'Brev'
}, {
  kode: 'ELEKTRONISK_DIALOG',
  term: 'Elektronisk Dialog'
}, {
  kode: 'ELEKTRONISK_SKJEMA',
  term: 'Elektronisk Skjema'
}, {
  kode: 'FORVALNINGSNOTAT',
  term: 'Forvaltningsnotat'
}, {
  kode: 'FORVALTNINGSBREV',
  term: 'Forvaltningsbrev'
}, {
  kode: 'IKKE_TOLKBART_SKJEMA',
  term: 'Ikke tolkbart skjema'
}, {
  kode: 'KLAGE_ELLER_ANKE',
  term: 'Klage eller Anke'
}, {
  kode: 'KONVERTERT_FRA_ELEKTRONISK_ARKIV',
  term: 'Konvertert fra elektronisk Arkiv'
},  {
  kode: 'KONVERTERT_DATA_FRA_SYSTEM',
  term: 'Konverterte data fra system'
}, {
  kode: 'PUBLIKUMSBLANKETT_EOS',
  term: 'Publikumsblankett EØS'
}, {
  kode: 'STRUKTURERT_ELEKTRONISK_DOKUMENT_EU/EOS',
  term: 'Strukturert elektronisk dokument - EU/EØS'
}, {
  kode: 'SOKNAD',
  term: 'SØKNAD'
}, {
  kode: 'TOLKBART_SKJEMA',
  term: 'Tolkbart skjema'
}, {
  kode: 'VEDTAKSBREV',
  term: 'Vedtaksbrev'
}];


const tittler = [{
  kode: 'UNNTAK',
  term: 'Unntak'
}, {
  kode: 'STUDIEDOKUMENTASJON',
  term: 'Studiedokumentasjon'
}, {
  kode: 'SOKNAD',
  term: 'SØKNAD'
}, {
  kode: 'MERKNAD_TIL_SAK',
  term: 'Merknad til sak'
}, {
  kode: 'ARBEIDSFORHOLD',
  term: 'Arbeidsforhold'
}, {
  kode: 'A1',
  term: 'A1'
}, {
  kode: 'BEKREFTELSE_MEDLEMSSKAP',
  term: 'Bekreftelse på medlemsskap'
}, {
  kode: 'ANNET',
  term: 'Annet...'
}];

const oppgave = {
  bruker: {
    fnr: '05056335023',
    sammensattNavn: 'LILLA HEST',
  },
  erBrukerAvsender: false,
  avsender: {
    fnr: '05056335023',
    sammensattNavn: 'LILLA HEST',
  },
  dokument: {
    kategorier,
    tittler,
  },
  behandlingstyper: Kodeverk.behandlingstyper,
  vedleggstittler: tittler,
  inneholderSensitivInfo: true,
  dokumentURL: '/dokumenttest.pdf'
};

exports.hentOppgave  = (req, res) => {
  const journalpostID = req.params.journalpostID;
  try {
    return res.json(oppgave);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
