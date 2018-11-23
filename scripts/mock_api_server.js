const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const serverinfo = require('./modules/server-info');
const behandlinger = require('./modules/behandlinger');
const fagsaker = require('./modules/fagsaker');
const saksflyt = require('./modules/saksflyt');
const sokFagsaker = require('./modules/sok-fagsaker');
const oppgaver = require('./modules/oppgaver');
const sokOppgaver = require('./modules/sok-oppgaver');
const journalforing = require('./modules/journalforing');
const soknader = require('./modules/soknader');
const lovvalgsperioder = require('./modules/lovvalgsperioder');
const Kodeverk = require('./modules/kodeverk');
const saksbehandler = require('./modules/saksbehandler');
const vilkar = require('./modules/vilkar');
const avklartefakta = require('./modules/avklartefakta');
const inngang = require('./modules/inngang');
const personer = require('./modules/personer');
const organisasjoner = require('./modules/organisasjoner');
const dokumenter = require('./modules/dokumenter');
const logging = require('./modules/logging');
const vedtak = require('./modules/vedtak');


const createLogDirIfnotExists = (dir) => !fs.existsSync(dir) && fs.mkdirSync(dir);
const LOGDIR = `${process.cwd()}/logdir`;
createLogDirIfnotExists(LOGDIR);

const MOCK_LOG_FILE = `${LOGDIR}/mock-errors.log`;
const WEB_MOCK_LOG_FILE = `${LOGDIR}/web-mock-errors.log`;
const log4js = require('log4js');
log4js.configure({
  appenders: {
    mock: { type: 'file', filename: MOCK_LOG_FILE, maxLogSize: 10485760, backups: 3, compress: true },
    webmock: { type: 'file', filename: WEB_MOCK_LOG_FILE, maxLogSize: 10485760, backups: 3, compress: true }
  },
  categories: { default: { appenders: ['mock','webmock'], level: 'debug' } }
});

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
 * BEHANDLINGER
 */
router.post('/behandlinger/:behandlingID/status', behandlinger.status);

/**
 * SOK-FAGSAKER basert på fnr
 */
router.get('/fagsaker/sok/', sokFagsaker.sok);

/**
 * FAGSAKER
 * ----------------------------------------------------------------------------
 * Henter fagsak med alle behandlinger for en enkelt søknad, basert på "snr" som backend omtales som "fagsak_id".
 * Data som returneres som en del av fagsaken er data som kommer fra registre.
 *
 * GET /f/:snr
 *
 */
router.get('/fagsaker/:snr', fagsaker.hent);
/* @deprecated  - benyttes kun i spark på T5 */
router.get('/fagsaker/ny/:fnr', fagsaker.opprett);

/**
 * SØKNAD
 * ----------------------------------------------------------
 * Endpoint for søknaden, enten den registreres manuelt eller kommer inn elektronisk.
 * GET /soknader Returnerer evt. tidligere registrerte data fra søknaden eller elektronisk søknad.
 * POST /soknader Poster dataene i søknaden DERSOM det dreier seg om en manuell registrert søknad.
 *
 */
router.get('/soknader/:behandlingID', soknader.hent);
router.post('/soknader/:behandlingID', soknader.send);

/**
 * AVKLARTEFAKTA (FRA STEGVELGEREN ++)
 * ----------------------------------------------------------
 * avklartefakta for soknaden. Inneholder datagrunnlag fra saksbehandlers avklartefakta som ikke direkte
 * kommer fra søknad eller registere men som saksbehandler kan trekke slutninger rundt.
 * GET /avklartefakta Returnerer evt. tidligere vurderinger for aktuell sak slik at disse kan settes inn i grensesnittet.
 * POST /avklartefakta Sender alle avklartefaktaer som saksbehandler har gjort. Se Confluence
 * (https://confluence.adeo.no/pages/viewpage.action?pageId=257676957)
 *
 */
router.get('/avklartefakta/:behandlingID', avklartefakta.hent);
router.post('/avklartefakta/:behandlingID', avklartefakta.send);

/**
 * INNGANG (Første steg i STEGVELGEREN)
 * ----------------------------------------------------------
 */
router.get('/inngang/:snr', inngang.hent);

/**
 * SAKSBEHANDLER
 */
router.get('/saksbehandler', saksbehandler.hent);

/**
 * KODEVERK
 */
router.get('/kodeverk', Kodeverk.hent);

/**
 * LOVVALGSPERIODER
 * ---------------------------------------------------------------
 */
router.get('/lovvalgsperioder/:behandlingID', lovvalgsperioder.hent);
router.post('/lovvalgsperioder/:behandlingID', lovvalgsperioder.send);

/**
 * OPPGAVEBEHANDLING
 * ---------------------------------------------------------------
 */
router.get('/oppgaver/sok', sokOppgaver.sok);
router.get('/oppgaver/plukk', oppgaver.hentPlukk);
router.post('/oppgaver/plukk', oppgaver.sendPlukk);
router.get('/oppgaver/oversikt', oppgaver.oversikt);
router.post('/oppgaver/opprett', oppgaver.opprett);
router.get('/oppgaver/reset', oppgaver.reset);
router.post('/oppgaver/tilbakelegge', oppgaver.tilbakelegg);

/**
 * JOURNALFORING
 * ---------------------------------------------------------------
 */
router.get('/journalforing/:journalpostID', journalforing.hent);
router.post('/journalforing/opprett', journalforing.sendOpprettNySak);
router.post('/journalforing/tilordne', journalforing.sendTilordneSak);

/**
 * PERSON
 * ---------------------------------------------------------------
 */
router.get('/personer', personer.hent);

/**
 * ORGANISASJON
 * ---------------------------------------------------------------
 */
router.get('/organisasjoner', organisasjoner.hent);

/**
 * SAKSOPPLYSNINGER
 * ---------------------------------------------------------------
 */
router.get('/saksopplysninger/oppfrisk/:behandlingID', saksflyt.oppfrisk);

/**
 * SAKSFLYT
 * ---------------------------------------------------------------
 */
router.get('/saksflyt/status/:behandlingID', saksflyt.status);

/**
 * VILKÅR
 * ---------------------------------------------------------------
 */
router.get('/vilkaar/:behandlingID', vilkar.hent);
router.post('/vilkaar/:behandlingID', vilkar.send);

/**
 * DOKUMENTER
 *  * ---------------------------------------------------------------
 */
// Henter et eksisterende dokument fra dokumentarkiv
router.get('/dokumenter/pdf/:journalforingID/:dokumentID', dokumenter.hentPdf);
// Henter forhåndsvisning som byte stream fra dokumentproduksjon
router.post('/dokumenter/utkast/pdf/:behandlingID/:dokumenttypeKode', dokumenter.lagPdfUtkast);
// Oppretter en bestilling av dokument i dokumentproduksjon
router.post('/dokumenter/opprett/:behandlingID/:dokumenttypeKode', dokumenter.opprettDokument);
router.get('/dokumenter/oversikt/:snr', dokumenter.oversikt);

/**
 * VEDTAK
 *  * ---------------------------------------------------------------
 */
router.post('/vedtak/:behandlingID', vedtak.lagre);

// router.post('/logger/trace', logging.trace);
// router.post('/logger/debug', logging.debug);
router.post('/logger/info', logging.info);
router.post('/logger/warn', logging.warn);
router.post('/logger/error', logging.error);

app.use(allowCrossDomain);
app.use('/api', router);
app.use('/melosys/api', router);
app.use('/frontendlogger', express.static('static'));

app.listen(port);

/* eslint-disable-next-line no-console */
console.log('Test MeloSys mock API server running on http://'+serverinfo.getIpAdress()+':' + port+'/api');
