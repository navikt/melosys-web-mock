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
const Inngangsvilkaar = require('./modules/inngangsvilkaar');
const Journalforing = require('./modules/journalforing');
const Lovvalgsperioder = require('./modules/lovvalgsperioder');
const Oppgaver = require('./modules/oppgaver');
const Organisasjoner = require('./modules/organisasjoner');
const Personer = require('./modules/personer');
const Saksbehandler = require('./modules/saksbehandler');
const Saksopplysninger = require('./modules/saksopplysninger');
const Soknader = require('./modules/soknader');
const Saksflyt = require('./modules/saksflyt');
const Utpekingsperioder = require('./modules/utpekingsperioder');
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
 * UTPEKNINGSPERIOER
 */
router.get('/utpekingsperioder/:behandlingID', Utpekingsperioder.hent);
router.post('/utpekingsperioder/:behandlingID', Utpekingsperioder.send);

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
router.post('/dokumenter/opprett/:behandlingID/:produserbartDokument', Dokumenter.dokument.opprett.send);
router.get('/dokumenter/oversikt/:snr', Dokumenter.dokument.oversikt.hent);

// Henter et eksisterende dokument fra dokumentarkiv
router.get('/dokumenter/pdf/:journalpostID/:dokumentID', Dokumenter.pdf.hent);

// Henter forhåndsvisning som byte stream fra dokumentproduksjon
router.post('/dokumenter/pdf/brev/utkast/:behandlingID/:produserbartDokument', Dokumenter.pdf.brev.utkast.send);

// Henter forhåndsvisning av sed som byte stream fra rina
router.get('/dokumenter/pdf/sed/utkast/:behandlingID/:sedType', Dokumenter.pdf.sed.utkast.hent);

/**
 * EESSI
 * ----------------------------------------------------------------
 */
router.get('/eessi/mottakerinstitusjoner/:bucType', Eessi.mottakerinstitusjoner.hent);
router.get('/eessi/bucer/:behandlingID', Eessi.bucer.hentBucerUnderArbeid);
router.post('/eessi/bucer/:behandlingID/opprett', Eessi.bucer.opprett.send);

/**
 * FAGSAKER
 * ----------------------------------------------------------------------------
 * Henter fagsak med alle behandlinger for en enkelt søknad, basert på "snr" som backend omtales som "fagsak_id".
 * Data som returneres som en del av fagsaken er data som kommer fra registre.
 *
 */
router.get('/fagsaker/sok/', Fagsaker.sok.hent);

router.get('/fagsaker/:saksnummer', Fagsaker.fagsak.hent);
router.post('/fagsaker/:saksnummer/henlegg', Fagsaker.fagsak.henlegg.send);
router.put('/fagsaker/:saksnummer/avsluttsaksombortfalt', Fagsaker.fagsak.avsluttsaksombortfalt.put);
router.put('/fagsaker/:saksnummer/avslutt', Fagsaker.fagsak.avslutt.put);
router.post('/fagsaker/:saksnummer/henlegg-videresend', Fagsaker.fagsak.henleggVideresend.send);
router.post('/fagsaker/:saksnummer/utpek', Fagsaker.fagsak.utpek.send);
router.post('/fagsaker/opprett', Fagsaker.fagsak.opprett.send);

router.get('/fagsaker/:saksnummer/aktoerer', Fagsaker.aktoer.hent);
router.post('/fagsaker/:saksnummer/aktoerer', Fagsaker.aktoer.send);
router.delete('/fagsaker/aktoerer/:databaseid', Fagsaker.aktoer.slett);

router.get('/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr', Fagsaker.kontaktopplysninger.hent);
router.post('/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr', Fagsaker.kontaktopplysninger.send);
router.delete('/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr', Fagsaker.kontaktopplysninger.slett);

/**
 * INNGANGSVILKAAR (Første steg i STEGVELGEREN)
 * ----------------------------------------------------------
 */
router.get('/inngangsvilkaar/:snr', Inngangsvilkaar.hent);

/**
 * JOURNALFORING
 * ---------------------------------------------------------------
 */
router.get('/journalforing/:journalpostID', Journalforing.hent);
router.post('/journalforing/opprett', Journalforing.opprett.send);
router.post('/journalforing/sed', Journalforing.sed.send);
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
router.get('/oppgaver/oversikt', Oppgaver.oversikt.hent);
router.get('/oppgaver/sok', Oppgaver.sok.hent);
router.post('/oppgaver/plukk', Oppgaver.plukk.send);
router.post('/oppgaver/tilbakelegg', Oppgaver.tilbakelegg.send);

/**
 * ORGANISASJONER
 * ---------------------------------------------------------------
 */
router.get('/organisasjoner/:orgnr', Organisasjoner.hent);

/**
 * PERSONER
 * ---------------------------------------------------------------
 */
router.get('/personer/:fnr', Personer.hent);

/**
 * SAKSBEHANDLER
 */
router.get('/saksbehandler', Saksbehandler.hent);

/**
 * SAKSFLYT
 * ---------------------------------------------------------------
 */
router.post('/saksflyt/anmodningsperioder/:behandlingID/bestill', Saksflyt.anmodningsperioder.bestill.post);
router.put('/saksflyt/anmodningsperioder/:behandlingID/svar', Saksflyt.anmodningsperioder.svar.put);
router.put('/saksflyt/unntaksperioder/:behandlingID/godkjenn', Saksflyt.unntaksperioder.godkjenn.put);
router.post('/saksflyt/unntaksperioder/:behandlingID/ikkegodkjenn', Saksflyt.unntaksperioder.ikkegodkjenn.send);
router.put('/saksflyt/unntaksperioder/:behandlingID/innhentinfo', Saksflyt.unntaksperioder.innhentinfo.put);
router.post('/saksflyt/vedtak/:behandlingID/fatt', Saksflyt.vedtak.fatt.send);
router.post('/saksflyt/vedtak/:behandlingID/endre', Saksflyt.vedtak.endre.send);
router.post('/saksflyt/vedtak/:behandlingID/revurder', Saksflyt.vedtak.revurder.send);

/**
 * SAKSOPPLYSNINGER
 * ---------------------------------------------------------------
 */
router.get('/saksopplysninger/oppfriskning/:behandlingID/status', Saksopplysninger.oppfriskning.status.hent);
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
