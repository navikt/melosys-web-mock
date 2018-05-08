const express = require('express');
const bodyParser = require('body-parser');

const serverinfo = require('./modules/server-info');
const fagsaker = require('./modules/fagsaker');
const oppgaver = require('./modules/oppgaver');
const journalforing = require('./modules/journalforing');
const soknader = require('./modules/soknader');
const Kodeverk = require('./modules/kodeverk');
const saksbehandler = require('./modules/saksbehandler');
const vurdering = require('./modules/vurdering');
const faktaavklaring = require('./modules/faktaavklaring');
const personer = require('./modules/personer');
const organisasjoner = require('./modules/organisasjoner');
const dokumenter = require('./modules/dokumenter');

const app = express();

const allowCrossDomain = (req, res, next)  => {
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

/**
 * FAGSAKER
 * ----------------------------------------------------------------------------
 * Henter fagsak med alle behandlinger for en enkelt søknad, basert på "snr" som backend omtales som "fagsak_id".
 * Data som returneres som en del av fagsaken er data som kommer fra registre.
 *
 * GET /f/:snr
 * POST (dette endpointet har ingen POST)
 *
 */

router.get('/fagsaker/sok/', fagsaker.sok);

router.get('/fagsaker/:snr', fagsaker.hent);
router.get('/fagsaker/ny/:fnr', fagsaker.opprett);
router.post('/fagsaker/journalforing', fagsaker.send);


/**
 * SØKNAD
 * ----------------------------------------------------------
 * Endpoint for søknaden, enten den registreres manuelt eller kommer inn elektronisk.
 * GET /soknader Returnerer evt. tidligere registrerte data fra søknaden eller elektronisk søknad.
 * POST /soknader Poster dataene i søknaden DERSOM det dreier seg om en manuell registrert søknad.
 *
 */
router.get('/soknader/:behandlingID', soknader.getSoknad);
router.post('/soknader/:behandlingID', soknader.postSoknad);

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
router.get('/faktaavklaring/:behandlingID', faktaavklaring.getFaktaavklaring);
router.post('/faktaavklaring/:behandlingID', faktaavklaring.postFaktaavklaring);

/**
 * VURDERING (FRA REGELMOTOREN)
 * ---------------------------------------------------------------
 * Vurdering (vurderingsforslag) fra regelmotor for soknaden. Denne kalles når regelmotor har (1) fagsaken (2) søknaden og
 * (3) faktaavklaring.
 * GET /vurdering Returnerer regelmotorens forslag til vurdering i tillegg til evt lagrede overprøvinger fra saksbehandler.
 * POST /vurdering Lagrer en vurdering, enten den er lik regelmotoren eller det er en overprøvelse fra saksbehandler.
 *
 */
router.get('/vurdering/:behandlingID', vurdering.hentVurdering);
router.post('/vurdering/:behandlingID', vurdering.postVurdering);

/**
 * SAKSBEHANDLER
 */
router.get('/saksbehandler', saksbehandler.hentSakbehandler);

/**
 * KODEVERK
 */
router.get('/kodeverk', Kodeverk.hentKodeverk);

/**
 * OPPGAVEBEHANDLING
 * ---------------------------------------------------------------
 */
router.get('/oppgaver/sok', oppgaver.sokOppgaver);
router.post('/oppgaver/plukk', oppgaver.sendPlukkOppgave);
router.get('/oppgaver/oversikt', oppgaver.hentOversikt);
router.get('/oppgaver/reset', oppgaver.reset);

/**
 * JOURNALFORING
 * ---------------------------------------------------------------
 */
router.get('/journalforing/:journalpostID', journalforing.hentOppgave);
router.post('/journalforing/opprett', journalforing.sendOpprettNySak);
router.post('/journalforing/tilordne', journalforing.sendTilordneSak);

/**
 * PERSON
 * ---------------------------------------------------------------
 */
router.get('/personer', personer.hentPerson);

/**
 * ORGANISASJON
 * ---------------------------------------------------------------
 */
router.get('/organisasjoner', organisasjoner.hentOrganisasjon);

/**
 * DOKUMENTER
 *  * ---------------------------------------------------------------
 */
router.get('/dokumenter/pdf/:journalpostID/:dokumentID', dokumenter.hentPdfDokument);

app.use(allowCrossDomain);
app.use('/api', router);

app.listen(port);


console.log('Test MeloSys mock API server running on http://'+serverinfo.getIpAdress()+':' + port+'/api');
