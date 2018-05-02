const fs = require('fs');
const utils = require('./utils');
const { kodeverk } = require('./kodeverk');
const Soknader = require('./soknader');
const _ = require('underscore');
const ERR = require('./errors');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;

const lesOppgaveObjekt = () => {
  const mockfile = `${MOCK_DATA_DIR}/oppgaver/oppgaveliste.json`;
  const oppgaveobjekt = JSON.parse(fs.readFileSync(mockfile, "utf8"));
  return oppgaveobjekt;
};

const minesaker = (oppgaveliste) => {
  return oppgaveliste.map(oppgave => {
    const mock = _.sample([{
      sammensattNavn: 'LILLA HEST',
      saksnummer: '3'
    }, {
      sammensattNavn: 'GLITRENDE HATT',
      saksnummer: '4'
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

    const type = _.sample(kodeverk.behandlingstyper);
    const status = _.sample(kodeverk.behandlingsstatus);
    const behandling = {
      type,
      status,
    };

    const minbehandling = {
      oppgaveID,
      oppgavetype: kodeverk.oppgavetyper[0],
      sammensattNavn,
      saksnummer,
      sakstype: _.sample(kodeverk.sakstyper),
      behandling,
      aktivTil,
      soknadsperiode: arbeidsperiode,
      land: arbeidsland,
    };
    const minjournalforing = {
      oppgaveID,
      oppgavetype: kodeverk.oppgavetyper[1],
      journalpostID: 'DOK_321',
      aktivTil,
    };
    return _.sample([minbehandling, minjournalforing]);
  });
};

exports.hentOppgave = (req, res) => {
  try {
    const oppgaveID = req.params.oppgaveID;
    const mockfile = `${MOCK_DATA_DIR}/oppgaver/oppgave-id-${oppgaveID}.json`;
    if (fs.existsSync(mockfile)) {
      const oppgave = JSON.parse(fs.readFileSync(mockfile, "utf8"));
      return res.json(oppgave);
    }
    else {
      console.log("File Not found: "+ mockfile);
      const melding = ERR.notFound404(req.url);
      return res.status(404).send(melding);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.finnoppgaveliste = (req, res) => {
  try {
    const oppgaveobjekt = lesOppgaveObjekt();
    return res.json(oppgaveobjekt);
  }
  catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

exports.hentAlleOppgaver = (req, res) => {
  try {
    const oppgaveobjekt = lesOppgaveObjekt();
    const { oppgaveListe } = oppgaveobjekt;

    //const fnummere = oppgaveListe.reduce((acc, oppgave) => [...acc, oppgave.gjelder.brukerId], []);
    //const fnummere = oppgaveListe.reduce((acc, oppgave) => acc.includes(oppgave.gjelder.brukerId) ? acc : [...acc, oppgave.gjelder.brukerId], []);
    //console.log(fnummere);

    return res.json(oppgaveListe);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const lesPlukkOppgaver = () => {
  const mockOppgaverDir = `${MOCK_DATA_DIR}/oppgaver`;
  let plukkOppgaver = [];
  fs.readdirSync(mockOppgaverDir).forEach(file => {
    if (file.startsWith('plukkoppgave')) {
      const plukkoppgave = JSON.parse(fs.readFileSync(`${mockOppgaverDir}/${file}`, 'UTF-8'));
      plukkOppgaver.push(plukkoppgave);
    }
  });
  if (plukkOppgaver.length === 0) {
      console.log('lesPlukkOppgaver(), ingen plukkoppgave funnet!')
  }
  return plukkOppgaver;
};

exports.hentPlukkOppgave = (req, res) => {
  // fagomrade = ['MED','UFM']
  // underkategori = []
  // oppgavetype = []
  const { fagomrade='F', underkategori='U', oppgavetype='T' } = req.params;
  try {
    const oppgaveobjekt = lesOppgaveObjekt();
    const { oppgaveListe } = oppgaveobjekt;
    const plukkliste = oppgaveListe.slice(-oppgaveListe.length, -oppgaveListe.length/2);
    const mineoppgaver = minesaker(plukkliste) ;
    let oppgave = _.sample(mineoppgaver);

    const mockfile = `${MOCK_DATA_DIR}/oppgaver/plukkoppgave-${oppgave.oppgaveID}.json`;
    fs.writeFileSync(mockfile, JSON.stringify(oppgave, null, 2));
    return res.json(oppgave);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.sendPlukkOppgave = (req, res) => {
  const body = req.body;
  const jsonBody = utils.isJSON(body) ? JSON.parse(body) : body;
  const { oppgavetype } = jsonBody;
  let oppgave;
  if (oppgavetype === 'BEH_SAK') {
    oppgave = { oppgaveID:'1', oppgavetype, saksnummer:'4', journalpostID: null };
  }
  else { // JFR
    // saknummer optional
    oppgave = { oppgaveID:'2', oppgavetype, saksnummer: undefined, journalpostID:'DOK_321' };
  }
  res.json(oppgave);
};
exports.hentOversikt = (req, res) => {
  try {
    const plukkoppgaver = lesPlukkOppgaver();
    const oppgaveobjekt = lesOppgaveObjekt();
    const { oppgaveListe } = oppgaveobjekt;
    const firstHalf = oppgaveListe.slice(0, 4);
    const mineoppgaver = minesaker(firstHalf);
    return res.json([...mineoppgaver]);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.reset = (req, res) => {
  res.json({});
};
