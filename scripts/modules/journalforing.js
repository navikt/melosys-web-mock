// const fs = require('fs');
const fs = require('fs');
const Soknader = require('./soknader');
const _ = require('underscore');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
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

const lesOppgaveObjekt = () => {
  const mockfile = `${MOCK_DATA_DIR}/oppgaver/oppgaveliste.json`;
  const oppgaveobjekt = JSON.parse(fs.readFileSync(mockfile, "utf8"));
  return oppgaveobjekt.oppgaveListe;
};

const byggEksisterendeSakerMock = () => {
  const oppgaveliste = lesOppgaveObjekt();

  return oppgaveliste
    .reduce((samling, oppgave) => {
    const mock = _.sample([{
      sammensattNavn: 'LILLA HEST',
      saksnummer: 3
    }, {
      sammensattNavn: 'GLITRENDE HATT',
      saksnummer: 4
    }]);
    const bid = 4;
    const soknaden = Soknader.lesSoknad(bid);
    const {
      soknadDokument: {
        arbeidUtland: {
          arbeidsland,
          arbeidsperiode,
        }
      },
    } = soknaden;
    const { aktivTil, oppgaveID } = oppgave;
    const { sammensattNavn, saksnummer } = mock;

    const type = _.sample(Kodeverk.behandlingstyper);
    const status = _.sample(Kodeverk.behandlingsstatus);
    const behandling = {
      type,
      status,
    };

    const minbehandling = {
      oppgaveID,
      oppgavetype: Kodeverk.oppgavetyper[0],
      sammensattNavn,
      saksnummer,
      sakstype: _.sample(Kodeverk.sakstyper),
      behandling,
      aktivTil,
      soknadsperiode: arbeidsperiode,
      land: arbeidsland,
    };

    // Ikke gi saker som er avsluttet. Fjern derfor de som har blitt _.sample-plukket og som endte
    // opp med behandling-status 'AVSLU';

    return minbehandling.behandling.status.kode === 'AVSLU' ? [...samling] : [...samling, minbehandling];
  }, [])
};

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
  dokumentURL: '/dokumenttest.pdf',
  saksListe: byggEksisterendeSakerMock(),
};

exports.hentOppgave  = (req, res) => {
  const journalpostID = req.params.journalpostID;
  const journalPayload = {...oppgave, saksListe: oppgave.saksListe.slice(0, _.random(0,5))}
  try {
    return res.json(journalPayload);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
