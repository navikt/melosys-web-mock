/* eslint-disable */
const express = require('express');
const fs = require('fs');
const os = require('os');
const URL = require('url');
const bodyParser = require('body-parser');
const moment = require('moment');
const _ = require('underscore');
const readableRandom = require('readable-random');

const MOCK_DATA_DIR = './scripts/mock_data';
const timestamp = moment();
const errorMessage = (status, error, message, path) => ({
  timestamp,
  status,
  error,
  message,
  path,
});

const badRequest400 = (path) => {
  return errorMessage(400,
    'Bad Request',
    'The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).',
    path);
};
const unauthorizedRequest401 = (path) => {
  return errorMessage(401, 'Unauthorized',
    'Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.',
    path);
};
const forbiddenRequest403 = (path) => {
  return errorMessage(403, 'Unauthorized',
    'The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource, or may need an account of some sort.',
    path);
};
const notFound404 = (path) => {
  return errorMessage(404, 'Not Found',
    'The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.',
    path);
};
const serverError500 = (path) => {
  return errorMessage(500, 'Internal Server Error',
    'A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.',
    path);
};
const ERR = {
  badRequest400,
  unauthorizedRequest401,
  forbiddenRequest403,
  notFound404,
  serverError500,
};

function happyStatus(statusarray) {
  const HAPPY = process.env.HAPPY || false;
  return (HAPPY) ? 200 : _.sample(statusarray);
}

const app = express();

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = process.env.PORT || 3002;
const router = express.Router();


router.get('/oppgaver/hentoppgave/:oppgaveID', (req, res) => {
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
});
const lesOppgaveObjekt = () => {
  const mockfile = `${MOCK_DATA_DIR}/oppgaver/oppgaveliste.json`;
  const oppgaveobjekt = JSON.parse(fs.readFileSync(mockfile, "utf8"));
  return oppgaveobjekt;
};


const minesaker = (oppgaveliste) => {
  return oppgaveliste.map(oppgave => {
    const mock = _.sample([{
      sammensattNavn: 'LILLA HEST',
      saksnummer: 3
    }, {
      sammensattNavn: 'GLITRENDE HATT',
      saksnummer: 4
    }]);
    const { status, aktivTil, oppgaveId } = oppgave;
    const { sammensattNavn, saksnummer } = mock;

    return {
      oppgaveId,
      oppgavetype: _.sample(['behandling','journalforing']),
      grunnlagstype: {
        kode: 'MEDEOS',
        term: 'Medlem, EØS-avtalen',
      },
      sammensattNavn,
      saksnummer,
      dokumentID: null,
      status: {
        kode: status.kode,
        term: 'Oversett kode til display tekst',
      },
      aktivTil,
      soknadsperiode: {
        fom: '2016-01-01',
        tom: '2020-01-01',
      },
    }
  });
};
const finnoppgaveliste = (req, res) => {
  try {
    const oppgaveobjekt = lesOppgaveObjekt();
    return res.json(oppgaveobjekt);
  }
  catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
router.get('/oppgaver/finnoppgaveliste', finnoppgaveliste);

router.get('/oppgaver', (req, res) => {
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
});

// Kodeverk: https://kodeverkviewer.adeo.no/kodeverk/xml/index.html
// fagomrade: https://kodeverkviewer.adeo.no/kodeverk/xml/fagomrade.xml
//
router.get('/oppgaver/plukkoppgave/:fagomrade?/:underkategori?/:oppgavetype?', (req, res) => {
  const { fagomrade='F', underkategori='U', oppgavetype='T' } = req.params;
  try {
    const oppgaveobjekt = lesOppgaveObjekt();
    const { oppgaveListe } = oppgaveobjekt;
    const plukkliste = oppgaveListe.slice(-oppgaveListe.length, -oppgaveListe.length/2);
    const mineoppgaver = minesaker(plukkliste) ;
    let oppgave = _.sample(mineoppgaver);
    oppgave.status.term = 'plukkliste';

    const mockfile = `${MOCK_DATA_DIR}/oppgaver/plukkoppgave-${oppgave.oppgaveId}.json`;
    fs.writeFileSync(mockfile, JSON.stringify(oppgave, null, 2));
    return res.json(oppgave);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
const lesPlukkOppgaver = () => {
  const mockOppgaverDir = `${MOCK_DATA_DIR}/oppgaver`;
  let plukkOppgaver = [];
  fs.readdirSync(mockOppgaverDir).forEach(file => {
    if (file.startsWith('plukkoppgave')) {
      const plukkoppgave = JSON.parse(fs.readFileSync(`${mockOppgaverDir}/${file}`, 'UTF-8'));
      plukkOppgaver.push(plukkoppgave);
    }
  });
  return plukkOppgaver;
};
const hentMineOppgaver = (req, res) => {
  try {
    const plukkoppgaver = lesPlukkOppgaver();
    const oppgaveobjekt = lesOppgaveObjekt();
    const { oppgaveListe } = oppgaveobjekt;
    const firstHalf = oppgaveListe.slice(0, 4);
    const mineoppgaver = minesaker(firstHalf);
    return res.json([...plukkoppgaver, ...mineoppgaver]);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
router.get('/oppgaver/hentSaksoversikt', hentMineOppgaver);
router.get('/oppgaver/hentMineOppgaver', hentMineOppgaver);

  /**
 * OPPRETTSAK
 */
router.post('/opprettsak/:fnr', function(req, res) {
  try {
    const fnr = req.params.fnr.toString();
    const nysak = {
      fnr,
      saksnummer: _.random(100,9999).toString(),
      kjoenn: 'K',
      sammensattNavn: 'GRØNN ELEFANT',
      registrertDato: moment(),
      status: 'Ikke påbegynnt'
    };
    res.json(nysak);
  }
  catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

/**
 * FAGSAKER
 * ----------------------------------------------------------------------------
 * Henter fagsak med alle behandlinger for en enkelt søknad, basert på "snr" som backend omtales som "fagsak_id".
 * Data som returneres som en del av fagsaken er data som kommer fra registre.
 *
 * GET /fagsaker/:snr
 * POST (dette endpointet har ingen POST)
 *
 */

function fagsaker_snr(req, res) {
    try {
        const snr = req.params.snr && req.params.snr.toString() || '';
        const mockfile = `${MOCK_DATA_DIR}/fagsaker/snr-${snr}.json`;
        if (fs.existsSync(mockfile)) {
          const fagsaker = JSON.parse(fs.readFileSync(mockfile, "utf8"));
          return res.json(fagsaker);
        }
        else {
          console.error("File not found:"+ mockfile);
          const melding = ERR.notFound404(req.url);
          return res.status(404).send(melding);
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
}

router.get('/fagsaker/:snr', fagsaker_snr);

function opprettNyFagsak(req, res) {
  try {

    const fnr = req.params.fnr && req.params.fnr.toString() || '';
    const mockFagsakerDir = `${MOCK_DATA_DIR}/fagsaker`;

    fs.readdirSync(mockFagsakerDir).forEach(file => {
      const fagsak = JSON.parse(fs.readFileSync(`${mockFagsakerDir}/${file}`, 'UTF-8'));
      if (fagsak.behandlinger[0].saksopplysninger.person.fnr === fnr) {
        return res.json(fagsak);
      }
    });
    /*
    if (!funnet) {
      console.error(`Ingen fagsak funnet for fnr=${fnr}`);
      const error404Message = errorMessage(404,'Not Found', req.url);
      return res.status(404).send(JSON.stringify(error404Message));
    }
    */
    const fornavn = readableRandom.getString(5).toUpperCase();
    const etternavn = readableRandom.getString(8).toUpperCase();
    const mockfagsak = {
      saksnummer: _.random(5,20).toString(),
      fnr,
      sammensattNavn: `${fornavn} ${etternavn}`,
      type: 'A1',
      status: 'OPPRETTET',
      registrertDato: timestamp,
      kjoenn: _.sample(['M','K']),
    };
    const mockfile = `${MOCK_DATA_DIR}/sok/fagsaker/fnr-${fnr}.json`;
    mockfagsaker = [mockfagsak];
    fs.writeFileSync(mockfile, JSON.stringify(mockfagsaker, null, 2));
    return res.status(201).send(mockfagsak);
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}
router.get('/fagsaker/ny/:fnr', opprettNyFagsak);

function sokFagsaker_fnr(req, res) {
    try {
      const fnr = req.query.fnr.toString();
      const mockfile = `${MOCK_DATA_DIR}/sok/fagsaker/fnr-${fnr}.json`;
      if (fs.existsSync(mockfile)) {
        const nyesaker = JSON.parse(fs.readFileSync(mockfile, "utf8"));

        if (nyesaker && nyesaker.length) {
          return res.json(nyesaker);
        }
      }
      else {
        const url = URL.parse(req.url);
        // Søk på fagsaker med fnr kan gi tomt svar, eller gi unauthorized
        const status = happyStatus([200, 200, 403, 500]);
        switch (status) {
          case 200: {
            const tom_soknad = [];
            return res.json(tom_soknad);
          }
          case 403: {
            const melding = ERR.forbiddenRequest403(url.pathname);
            return res.status(status).send(melding);
          }
          case 500: {
            const melding = ERR.serverError500(url.pathname);
            return res.status(status).send(melding);
          }
        }

      }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}
router.get('/sok/fagsaker', sokFagsaker_fnr);
router.get('/sok/fagsaker/liste', (req, res) => {
  let fagsakListe = [];
  try {
    const mockSokFagsakerDir = `${MOCK_DATA_DIR}/sok/fagsaker/`;
    fs.readdirSync(mockSokFagsakerDir).forEach(file => {
      const fagsaker = JSON.parse(fs.readFileSync(`${mockSokFagsakerDir}/${file}`, 'UTF-8'));
      fagsaker.every((fagsak) => {
        fagsakListe.push(fagsak);
      })
    });
    fagsakListe = _.uniq(fagsakListe.sort((a, b) => {
      return a.saksnummer - b.saksnummer;
    }), true);
    return res.json(fagsakListe);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/**
 * SØKNAD
 * ----------------------------------------------------------
 * Endpoint for søknaden, enten den registreres manuelt eller kommer inn elektronisk.
 * GET /soknader Returnerer evt. tidligere registrerte data fra søknaden eller elektronisk søknad.
 * POST /soknader Poster dataene i søknaden DERSOM det dreier seg om en manuell registrert søknad.
 *
 */

function getSoknad(req, res) {
  try {
    const behandlingID = req.params.behandlingID;
    const mockfileSoknad = `${MOCK_DATA_DIR}/soknader/soknad-bid-${behandlingID}.json`;
    if (fs.existsSync(mockfileSoknad)) {
      const soknad = JSON.parse(fs.readFileSync(mockfileSoknad, "utf8"));
      return res.json(soknad);
    }
    else {
      console.error('Not Found', mockfileSoknad);
      return res.status(404).send(ERR.notFound404( req.url));
    }
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}
router.get('/soknader/:behandlingID', getSoknad);

function postSoknad(req, res) {
  const behandlingID = req.params.behandlingID;
  const body = req.body;
  let jsonBody = isJSON(body) ? JSON.parse(body) : body;

  const mockfileSoknad = `${MOCK_DATA_DIR}/soknader/soknad-bid-${behandlingID}.json`;

  try {
    if (fs.existsSync(mockfileSoknad)) {
      const soknad = JSON.parse(fs.readFileSync(mockfileSoknad, "utf8"));
      return res.json(soknad);
    }
    else {
      const { soknadDokument } = jsonBody;
      // Triks for å sikre at behandlingsID kommmer som forste key og ikke sist
      const soknad = {
        behandlingID,
        soknadDokument,
      };
      fs.writeFileSync(mockfileSoknad, JSON.stringify(soknad, null, 2));
      return res.json(soknad);
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
router.post('/soknader/:behandlingID', postSoknad);



/**
 * FAKTAVKLARING (FRA STEGVELGEREN ++)
 * ----------------------------------------------------------
 * Faktaavklaring for soknaden. Inneholder datagrunnlag fra saksbehandlers faktaavklaring som ikke direkte
 * kommer fra søknad eller registere men som saksbehandler kan trekke slutninger rundt.
 * GET /faktaavklaring Returnerer evt. tidligere vurderinger for aktuell sak slik at disse kan settes inn i grensesnittet.
 * POST /faktaavklaring Sender alle faktaavklaringer som saksbehandler har gjort. Se Confluence
 * (https://confluence.adeo.no/pages/viewpage.action?pageId=257676957)
 *
 */
function getFaktaavklaring(req, res) {
    try {
        const behandlingID = req.params.behandlingID;
        const mockfile = `${MOCK_DATA_DIR}/faktaavklaring/faktaavklaring-bid-${behandlingID}.json`;
        if (fs.existsSync(mockfile)) {
          const faktaavklaring = JSON.parse(fs.readFileSync(mockfile, "utf8"));
          return res.json(faktaavklaring);
        }
        else {
          return res.status(404).send(ERR.notFound404(req.url));
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
}
router.get('/faktaavklaring/:behandlingID', getFaktaavklaring);

router.post('/faktaavklaring/:behandlingID', function (req, res) {
    const behandlingID = req.params.behandlingID;
    const body = req.body;
    const jsonBody = isJSON(body) ? JSON.parse(body) : body;
    const faktaavklaring = {
      behandlingID,
      faktaavklaring: { ...jsonBody.faktaavklaring }
    };

    return res.json(faktaavklaring);
});



/**
 * VURDERING (FRA REGELMOTOREN)
 * ---------------------------------------------------------------
 * Vurdering (vurderingsforslag) fra regelmotor for soknaden. Denne kalles når regelmotor har (1) fagsaken (2) søknaden og
 * (3) faktaavklaring.
 * GET /vurdering Returnerer regelmotorens forslag til vurdering i tillegg til evt lagrede overprøvinger fra saksbehandler.
 * POST /vurdering Lagrer en vurdering, enten den er lik regelmotoren eller det er en overprøvelse fra saksbehandler.
 *
 */
function getVurdering(req, res) {
    try {
      const behandlingID = req.params.behandlingID;
      const mockfile = `${MOCK_DATA_DIR}/vurdering/vurdering-bid-${behandlingID}.json`;
      if (fs.existsSync(mockfile)) {
        const data = JSON.parse(fs.readFileSync(mockfile, "utf8"));
        const status = happyStatus([200, 200, 404]);
        if (status === 200) {
          data.vurdering.feilmeldinger = [];
        }
        return res.json(data);
      }
      else {
        return res.status(404).send(ERR.notFound404(req.url));
      }
    }
    catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
}
router.get('/vurdering/:behandlingID', getVurdering);

router.post('/vurdering/:behandlingID', function (req, res) {
    const behandlingID = req.params.behandlingID;
    const body = req.body;
    let responseBody = isJSON(body) ? JSON.parse(body) : body;
    responseBody.behandlingID = behandlingID;
    return res.json(responseBody);
});

router.get('/saksbehandler', function (req, res) {
  try {
    const mockfile = `${MOCK_DATA_DIR}/saksbehandler.json`;
    const saksbehandlere =  JSON.parse(fs.readFileSync(mockfile, "utf8"));
    const status = happyStatus([200, 200, 200, 401, 500]);
    const url = '/saksbehandler';
    switch (status) {
      case 200:
        return res.json(_.sample(saksbehandlere));
      case 401: {
        const melding = ERR.unauthorizedRequest401(url);
        return res.status(status).send(melding);
      }
      case 500: {
        const melding = ERR.serverError500(url);
        return res.status(status).send(melding);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});
router.get('/landkoder', function (req, res) {
  try {
    const mockfile = `${MOCK_DATA_DIR}/landkoder/landkoder.json`;
    const land =  JSON.parse(fs.readFileSync(mockfile, "utf8"));
    return res.json(land);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});
app.use(allowCrossDomain);
app.use('/melosys-api', router);
app.use('/api', router);

app.listen(port);

function platformNIC() {
  const interfaces = os.networkInterfaces();
  switch (process.platform) {
    case 'darwin':
      return interfaces.lo0;
      case 'linux':
      return interfaces.ens192 ? interfaces.ens192 : interfaces.eno16780032;
    default: // win32
      return interfaces.Ethernet0
  }
}

function getIpAdress() {
  const nic = platformNIC();
  const ipv4 = _.find(nic, function(item){
    return item.family === 'IPv4';
  });
  return ipv4.address;
}

function isJSON(str) {
  try {
    return (JSON.parse(str) && !!str);
  } catch (e) {
    return false;
  }
}
console.log('Test MeloSys mock API server running on http://'+getIpAdress()+':' + port+'/api');
