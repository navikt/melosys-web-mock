const fs = require('fs');
const _ = require('underscore');

const Utils = require('./utils');
const { kodeverk } = require('./kodeverk');
const { lesSoknad } = require('./soknader');

const MOCK_DATA_DIR  = `${process.cwd()}/scripts/mock_data`;
const MOCK_DATA_OPPGAVRE_DIR = `${MOCK_DATA_DIR}/oppgaver`;

const lesOppgaveListe = () => {
  const mockfile = `${MOCK_DATA_OPPGAVRE_DIR}/oppgaveliste.json`;
  return JSON.parse(fs.readFileSync(mockfile, "utf8"));
};

const mineOppgaver = (oppgaveliste) => {
  return oppgaveliste.map(oppgave => {
    const mock = _.sample([{
      sammensattNavn: 'LILLA HEST',
      saksnummer: '3'
    }, {
      sammensattNavn: 'GLITRENDE HATT',
      saksnummer: '4'
    }]);
    const bid = 4;
    const soknaden = lesSoknad(bid);
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

module.exports.lesOppgaveKatalog = () => {
  const navn = 'oppgaver.json';
  const jasonfile = `${MOCK_DATA_OPPGAVRE_DIR}/${navn}`;
  const document =  JSON.parse(fs.readFileSync(jasonfile, "utf8"));
  return [{
    navn,
    document
  }];
};

module.exports.hentAlle = (req, res) => {
  try {
    const oppgaveobjekt = lesOppgaveListe();
    const { oppgaveListe } = oppgaveobjekt;

    //const fnummere = oppgaveListe.reduce((acc, oppgave) => [...acc, oppgave.gjelder.brukerId], []);
    //const fnummere = oppgaveListe.reduce((acc, oppgave) => acc.includes(oppgave.gjelder.brukerId) ? acc : [...acc, oppgave.gjelder.brukerId], []);
    //console.log(fnummere);
    const mineoppgaver = mineOppgaver(oppgaveListe);
    return res.json(mineoppgaver);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.hentPlukk = (req, res) => {
  try {
    const oppgaveobjekt = lesOppgaveListe();
    const { oppgaveListe } = oppgaveobjekt;
    const plukkliste = oppgaveListe.slice(-oppgaveListe.length, -oppgaveListe.length/2);
    const mineoppgaver = mineOppgaver(plukkliste) ;
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

module.exports.sendPlukk = (req, res) => {
  const body = req.body;
  const jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
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
/**
 * Oversikt
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.oversikt = (req, res) => {
  try {
    const oppgaveobjekt = lesOppgaveListe();
    const { oppgaveListe } = oppgaveobjekt;
    const firstHalf = oppgaveListe.slice(0, 4);
    const mineoppgaver = mineOppgaver(firstHalf);
    return res.json([...mineoppgaver]);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
module.exports.opprett = (req, res) => {
  const body = req.body;
  const jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  res.json(jsonBody);
};

module.exports.reset = (req, res) => {
  res.json({});
};
