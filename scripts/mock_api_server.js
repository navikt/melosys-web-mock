const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const NodeCache = require('node-cache');
const nodeCache = new NodeCache();
global.nodeCache = nodeCache;

const serverinfo = require('./utils/server-info');
const logging = require('./utils/logging');

const Anmodningsperioder = require('./modules/anmodningsperioder');
const Avklartefakta = require('./modules/avklartefakta');
const Behandlinger = require('./modules/behandlinger');
const Dokumenter = require('./modules/dokumenter');
const Eessi = require('./modules/eessi');
const Fagsaker = require('./modules/fagsaker');
const Inngang = require('./modules/inngang');
const Journalforing = require('./modules/journalforing');
const Lovvalgsperioder = require('./modules/lovvalgsperioder');
const Oppgaver = require('./modules/oppgaver');
const Organisasjoner = require('./modules/organisasjoner');
const Personer = require('./modules/personer');
const Registrering = require('./modules/registrering');
const Saksbehandler = require('./modules/saksbehandler');
const Saksopplysninger = require('./modules/saksopplysninger');
const Soknader = require('./modules/soknader');
const Saksflyt = require('./modules/saksflyt');
const Vilkaar = require('./modules/vilkaar');

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
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = process.env.PORT || 3002;
const router = express.Router();

router.get('/serverinfo', serverinfo.hentServerInfo);
// router.post('/logger/trace', logging.trace);
// router.post('/logger/debug', logging.debug);
router.post('/logger/info', logging.info);
router.post('/logger/warn', logging.warn);
router.post('/logger/error', logging.error);

/**
 * ANMODNINGSPERIODER
 */
router.get('/anmodningsperioder/:behandlingID', Anmodningsperioder.hent);
router.post('/anmodningsperioder/:behandlingID', Anmodningsperioder.send);
router.get('/anmodningsperioder/:anmodningsperiodeID/svar', Anmodningsperioder.svar.hent);
router.post('/anmodningsperioder/:anmodningsperiodeID/svar', Anmodningsperioder.svar.send);

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
router.get('/avklartefakta/:behandlingID', Avklartefakta.hent);
router.post('/avklartefakta/:behandlingID', Avklartefakta.send);

/**
 * BEHANDLINGER
 * ----------------------------------------------------------------
 */
router.get('/behandlinger/:behandlingID', Behandlinger.behandling.hent);
router.post('/behandlinger/:behandlingID/status', Behandlinger.status.send);
router.get('/behandlinger/:behandlingID/tidligeremedlemsperioder', Behandlinger.tidligeremedlemsperioder.hent);
router.post('/behandlinger/:behandlingID/tidligeremedlemsperioder', Behandlinger.tidligeremedlemsperioder.send);
router.get('/behandlinger/:behandlingID/resultat', Behandlinger.resultat.hent);

/**
 * DOKUMENTER
 * ---------------------------------------------------------------
 */
// Oppretter en bestilling av dokument i dokumentproduksjon
router.post('/dokumenter/opprett/:behandlingID/:dokumenttypeKode', Dokumenter.dokument.opprett);
router.get('/dokumenter/oversikt/:snr', Dokumenter.dokument.oversikt);
// Henter et eksisterende dokument fra dokumentarkiv
router.get('/dokumenter/pdf/:journalpostID/:dokumentID', Dokumenter.pdf.hent);
// Henter forhåndsvisning som byte stream fra dokumentproduksjon
router.post('/dokumenter/utkast/pdf/:behandlingID/:dokumenttypeKode', Dokumenter.pdf.utkast);
// TODO '/dokumenter/pdf/utkast/:behandlingID/:dokumenttypeKode'
/**
 * EESSI
 * ----------------------------------------------------------------
 */
router.get('/eessi/mottakerinstitusjoner/:bucType', Eessi.mottakerinstitusjoner.hent);
router.get('/eessi/bucer/:behandlingID', Eessi.bucer.hentBucerUnderArbeid);
router.post('/eessi/bucer/:behandlingID/opprett', Eessi.bucer.opprett);

/**
 * FAGSAKER
 * ----------------------------------------------------------------------------
 * Henter fagsak med alle behandlinger for en enkelt søknad, basert på "snr" som backend omtales som "fagsak_id".
 * Data som returneres som en del av fagsaken er data som kommer fra registre.
 *
 */
router.get('/fagsaker/sok/', Fagsaker.sok.fagsak);

router.get('/fagsaker/:saksnummer', Fagsaker.fagsak.hent);
router.post('/fagsaker/:saksnummer/henlegg', Fagsaker.fagsak.henlegg);
router.put('/fagsaker/:saksnummer/avsluttsaksombortfalt', Fagsaker.fagsak.avsluttsaksombortfalt);

router.get('/fagsaker/:saksnummer/aktoerer', Fagsaker.aktoer.hent);
router.post('/fagsaker/:saksnummer/aktoerer', Fagsaker.aktoer.send);
router.delete('/fagsaker/aktoerer/:databaseid', Fagsaker.aktoer.slett);

router.get('/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr', Fagsaker.kontaktopplysninger.hent);
router.post('/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr', Fagsaker.kontaktopplysninger.send);
router.delete('/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr', Fagsaker.kontaktopplysninger.slett);

/**
 * INNGANG (Første steg i STEGVELGEREN)
 * ----------------------------------------------------------
 */
router.get('/inngang/:snr', Inngang.hent);

/**
 * JOURNALFORING
 * ---------------------------------------------------------------
 */
router.get('/journalforing/:journalpostID', Journalforing.hent);
router.post('/journalforing/opprett', Journalforing.opprett.send);
router.post('/journalforing/tilordne', Journalforing.tilordne.send);

/**
 * LOVVALGSPERIODER
 * ---------------------------------------------------------------
 */
router.get('/lovvalgsperioder/:behandlingID', Lovvalgsperioder.hent);
router.post('/lovvalgsperioder/:behandlingID', Lovvalgsperioder.send);
router.get('/lovvalgsperioder/:behandlingID/opprinnelig', Lovvalgsperioder.opprinnelig.hent);

/**
 * OPPGAVER
 * ---------------------------------------------------------------
 */
router.get('/oppgaver/oversikt', Oppgaver.oversikt);
router.post('/oppgaver/plukk', Oppgaver.sendPlukk);
router.get('/oppgaver/sok', Oppgaver.sok);
router.post('/oppgaver/tilbakelegg', Oppgaver.tilbakelegg);

/**
 * ORGANISASJONER
 * ---------------------------------------------------------------
 */
router.get('/organisasjoner', Organisasjoner.hent);

/**
 * PERSONER
 * ---------------------------------------------------------------
 */
router.get('/personer', Personer.hent);

/**
 * REGISTRERING av UNNTAKSPERIODER
 * ---------------------------------------------------------------
 */
router.post('/registrering/:behandlingID/unntaksperioder', Registrering.unntaksperioder.send);

/**
 * SAKSBEHANDLER
 */
router.get('/saksbehandler', Saksbehandler.hent);

/**
 * SAKSFLYT
 * ---------------------------------------------------------------
 */
router.put('/saksflyt/anmodningsperioder/:behandlingID/bestill', Saksflyt.anmodningsperioder.bestill);
router.post('/saksflyt/vedtak/:behandlingID/fatte', Saksflyt.vedtak.fatte);
router.post('/saksflyt/vedtak/:behandlingID/endreperiode', Saksflyt.vedtak.endreperiode);
router.put('/saksflyt/unntaksperioder/:behandlingID/anmodning', Saksflyt.unntaksperioder.anmodning);
router.put('/saksflyt/unntaksperioder/:behandlingID/godkjenn', Saksflyt.unntaksperioder.godkjenn);
router.post('/saksflyt/unntaksperioder/:behandlingID/ikkegodkjenn', Saksflyt.unntaksperioder.ikkegodkjenn);
router.put('/saksflyt/unntaksperioder/:behandlingID/innhentinfo', Saksflyt.unntaksperioder.innhentinfo);

/**
 * SAKSOPPLYSNINGER
 * ---------------------------------------------------------------
 */
router.get('/saksopplysninger/oppfriskning/:behandlingID/status', Saksopplysninger.oppfriskning.status);
router.get('/saksopplysninger/oppfriskning/:behandlingID', Saksopplysninger.oppfriskning.hent);

/**
 * SOKNADER
 * ----------------------------------------------------------
 * Endpoint for søknaden, enten den registreres manuelt eller kommer inn elektronisk.
 * GET /soknader Returnerer evt. tidligere registrerte data fra søknaden eller elektronisk søknad.
 * POST /soknader Poster dataene i søknaden DERSOM det dreier seg om en manuell registrert søknad.
 *
 */
router.get('/soknader/:behandlingID', Soknader.hent);
router.post('/soknader/:behandlingID', Soknader.send);

/**
 * VILKÅR
 * ---------------------------------------------------------------
 */
router.get('/vilkaar/:behandlingID', Vilkaar.hent);
router.post('/vilkaar/:behandlingID', Vilkaar.send);


app.use(allowCrossDomain);
app.use('/api', router);
app.use('/melosys/api', router);
app.use('/frontendlogger', express.static('static'));

app.listen(port);

/* eslint-disable-next-line no-console */
console.log('Test MeloSys mock API server running on http://'+serverinfo.getIpAdress()+':' + port+'/api');
