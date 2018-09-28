const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const serverinfo = require('./modules/server-info');
const fagsaker = require('./modules/fagsaker');
const saksopplysninger = require('./modules/saksopplysninger');
const sokFagsaker = require('./modules/sok-fagsaker');
const oppgaver = require('./modules/oppgaver');
const sokOppgaver = require('./modules/sok-oppgaver');
const journalforing = require('./modules/journalforing');
const soknader = require('./modules/soknader');
const Kodeverk = require('./modules/kodeverk');
const saksbehandler = require('./modules/saksbehandler');
const vurdering = require('./modules/vurdering');
const faktaavklaring = require('./modules/faktaavklaring');
const inngang = require('./modules/inngang');
const personer = require('./modules/personer');
const organisasjoner = require('./modules/organisasjoner');
const dokumenter = require('./modules/dokumenter');
const logging = require('./modules/logging');

const createLogDirIfnotExists = (dir) => !fs.existsSync(dir) && fs.mkdirSync(dir);
const LOGDIR = `${process.cwd()}/logdir`;
createLogDirIfnotExists(LOGDIR);

const MOCK_LOG_FILE = `${LOGDIR}/mock-errors.log`;
const log4js = require('log4js');
log4js.configure({
  appenders: { mock: { type: 'file', filename: MOCK_LOG_FILE } },
  categories: { default: { appenders: ['mock'], level: 'debug' } }
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
 * FAKTAVKLARING (FRA STEGVELGEREN ++)
 * ----------------------------------------------------------
 * Faktaavklaring for soknaden. Inneholder datagrunnlag fra saksbehandlers faktaavklaring som ikke direkte
 * kommer fra søknad eller registere men som saksbehandler kan trekke slutninger rundt.
 * GET /faktaavklaring Returnerer evt. tidligere vurderinger for aktuell sak slik at disse kan settes inn i grensesnittet.
 * POST /faktaavklaring Sender alle faktaavklaringer som saksbehandler har gjort. Se Confluence
 * (https://confluence.adeo.no/pages/viewpage.action?pageId=257676957)
 *
 */
router.get('/faktaavklaring/:behandlingID', faktaavklaring.hent);
router.post('/faktaavklaring/:behandlingID', faktaavklaring.send);

/**
 * INNGANG (Første steg i STEGVELGEREN)
 * ----------------------------------------------------------
 */
router.get('/inngang/:snr', inngang.hent);

/**
 * VURDERING (FRA REGELMOTOREN)
 * ---------------------------------------------------------------
 * Vurdering (vurderingsforslag) fra regelmotor for soknaden. Denne kalles når regelmotor har (1) fagsaken (2) søknaden og
 * (3) faktaavklaring.
 * GET /vurdering Returnerer regelmotorens forslag til vurdering i tillegg til evt lagrede overprøvinger fra saksbehandler.
 * POST /vurdering Lagrer en vurdering, enten den er lik regelmotoren eller det er en overprøvelse fra saksbehandler.
 *
 */
router.get('/vurdering/:behandlingID', vurdering.hent);
router.post('/vurdering/:behandlingID', vurdering.send);

/**
 * SAKSBEHANDLER
 */
router.get('/saksbehandler', saksbehandler.hent);

/**
 * KODEVERK
 */
router.get('/kodeverk', Kodeverk.hent);

/**
 * OPPGAVEBEHANDLING
 * ---------------------------------------------------------------
 */
router.get('/oppgaver/sok', sokOppgaver.sok);
router.post('/oppgaver/plukk', oppgaver.sendPlukk);
router.get('/oppgaver/oversikt', oppgaver.oversikt);
router.post('/oppgaver/opprett', oppgaver.opprett);
router.get('/oppgaver/reset', oppgaver.reset);

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
router.get('/saksopplysninger/oppfrisk/:behandlingID', saksopplysninger.oppfrisk);
router.get('/behandlinger/:behandlingID/status', saksopplysninger.status);

/**
 * DOKUMENTER
 *  * ---------------------------------------------------------------
 */
router.get('/dokumenter/pdf/:journalpostID/:dokumentID', dokumenter.hentPdf);

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
