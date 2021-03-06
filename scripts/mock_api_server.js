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
const Behandlingsgrunnlag = require('./modules/behandlingsgrunnlag');
const Dokumenter = require('./modules/dokumenter');
const DokumenterV2 = require('./modules/dokumenter-v2');
const Eessi = require('./modules/eessi');
const Fagsaker = require('./modules/fagsaker');
const FeatureToggle = require('./modules/featuretoggle');
const Journalforing = require('./modules/journalforing');
const Kodeverk = require('./modules/kodeverk');
const Lovvalgsperioder = require('./modules/lovvalgsperioder');
const Medlemskapsperioder = require('./modules/medlemskapsperioder');
const Oppgaver = require('./modules/oppgaver');
const Organisasjoner = require('./modules/organisasjoner');
const Personer = require('./modules/personer');
const Representant = require('./modules/representant');
const Saksbehandler = require('./modules/saksbehandler');
const Saksopplysninger = require('./modules/saksopplysninger');
const Saksflyt = require('./modules/saksflyt');
const Statistikk = require('./modules/statistikk');
const Trygdeavgift = require('./modules/trygdeavgift');
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
router.get('/avklartefakta/:behandlingID', Avklartefakta.avklartefakta.hent);
router.post('/avklartefakta/:behandlingID', Avklartefakta.avklartefakta.send);
router.get('/avklartefakta/:behandlingID/oppsummering', Avklartefakta.oppsummering.hent);
router.post('/avklartefakta/:behandlingID/virksomheter', Avklartefakta.virksomhet.send);
router.post('/avklartefakta/:behandlingID/medfolgendeFamilie', Avklartefakta.medfolgendeFamilie.send);

/**
 * BEHANDLINGER
 * ----------------------------------------------------------------
 */
router.get('/behandlinger/:behandlingID', Behandlinger.behandling.hent);
router.post('/behandlinger/:behandlingID/status', Behandlinger.status.send);
router.get('/behandlinger/:behandlingID/muligeStatuser', Behandlinger.status.hent);
router.get('/behandlinger/:behandlingID/tidligeremedlemsperioder', Behandlinger.tidligeremedlemsperioder.hent);
router.post('/behandlinger/:behandlingID/tidligeremedlemsperioder', Behandlinger.tidligeremedlemsperioder.send);
router.get('/behandlinger/:behandlingID/resultat', Behandlinger.resultat.hent);
router.get('/behandlinger/:behandlingID/muligeBehandlingstema', Behandlinger.endreBehandlingstema.hent);
router.post('/behandlinger/:behandlingID/endreBehandlingstema', Behandlinger.endreBehandlingstema.send);
router.post('/behandlinger/:behandlingID/behandlingsfrist', Behandlinger.endreBehandlngsfrist.send);

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
router.post('/dokumenter/pdf/sed/utkast/:behandlingID/:sedType', Dokumenter.pdf.sed.utkast.send);

/**
 * DOKUMENTER-V2
 * ---------------------------------------------------------------
 */
router.post('/dokumenter/v2/opprett/:behandlingID', DokumenterV2.opprett.send);
router.post('/dokumenter/v2/pdf/brev/utkast/:behandlingID', DokumenterV2.utkast.send);
router.get('/dokumenter/v2/tilgjengelige-maler/:behandlingID', DokumenterV2.tilgjengeligemaler.hent);
router.post('/dokumenter/v2/mulige-mottakere/:behandlingID', DokumenterV2.muligeMottakere.send);

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
router.post('/fagsaker/sok', Fagsaker.sok.send);

router.get('/fagsaker/:saksnummer', Fagsaker.fagsak.hent);
router.post('/fagsaker/:saksnummer/henlegg', Fagsaker.fagsak.henlegg.send);
router.put('/fagsaker/:saksnummer/avsluttsaksombortfalt', Fagsaker.fagsak.avsluttsaksombortfalt.put);
router.put('/fagsaker/:saksnummer/avslutt', Fagsaker.fagsak.avslutt.put);
router.post('/fagsaker/:saksnummer/henlegg-videresend', Fagsaker.fagsak.henleggVideresend.send);
router.post('/fagsaker/:saksnummer/utpek', Fagsaker.fagsak.utpek.send);
router.post('/fagsaker/opprett', Fagsaker.fagsak.opprett.send);
router.post('/fagsaker/:saksnummer/revurder', Fagsaker.fagsak.revurder.send);

router.get('/fagsaker/:saksnummer/notater', Fagsaker.notater.hent);
router.post('/fagsaker/:saksnummer/notater', Fagsaker.notater.send);
router.put('/fagsaker/:saksnummer/notater/:notatid', Fagsaker.notater.put);

router.get('/fagsaker/:saksnummer/aktoerer', Fagsaker.aktoer.hent);
router.post('/fagsaker/:saksnummer/aktoerer', Fagsaker.aktoer.send);
router.delete('/fagsaker/aktoerer/:databaseid', Fagsaker.aktoer.slett);

router.get('/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr', Fagsaker.kontaktopplysninger.hent);
router.post('/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr', Fagsaker.kontaktopplysninger.send);
router.delete('/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr', Fagsaker.kontaktopplysninger.slett);

/**
 * FEATURETOGGLE
 * ----------------------------------------------------------
 */
router.get('/featuretoggle', FeatureToggle.hent);

/**
 * JOURNALFORING
 * ---------------------------------------------------------------
 */
router.get('/journalforing/:journalpostID', Journalforing.hent);
router.post('/journalforing/opprett', Journalforing.opprett.send);
router.post('/journalforing/sed', Journalforing.sed.send);
router.post('/journalforing/tilordne', Journalforing.tilordne.send);

/**
 * KODEVERK
 * ---------------------------------------------------------------
 */
router.get('/kodeverk/nav-felles/:kodeverknavn', Kodeverk.navFelles.hentKodeverk);
router.get('/kodeverk/melosys-internt/folketrygden', Kodeverk.melosysInternt.folketrygden);
/**
 * LOVVALGSPERIODER
 * ---------------------------------------------------------------
 */
router.get('/lovvalgsperioder/:behandlingID', Lovvalgsperioder.hent);
router.post('/lovvalgsperioder/:behandlingID', Lovvalgsperioder.send);
router.get('/lovvalgsperioder/:behandlingID/opprinnelig', Lovvalgsperioder.opprinnelig.hent);
/**
 * MEDLEMSKAPSPERIODER
 * ---------------------------------------------------------------
 */
router.get('/behandlinger/:behandlingID/medlemskapsperioder', Medlemskapsperioder.medlemskapsperioder.hent);
router.post('/behandlinger/:behandlingID/medlemskapsperioder', Medlemskapsperioder.medlemskapsperioder.post);
router.put('/behandlinger/:behandlingID/medlemskapsperioder/:medlemskapsperiodeID', Medlemskapsperioder.medlemskapsperioder.put);
router.delete('/behandlinger/:behandlingID/medlemskapsperioder/:medlemskapsperiodeID', Medlemskapsperioder.medlemskapsperioder.delete);
router.get('/behandlinger/medlemskapsperioder/bestemmelser', Medlemskapsperioder.bestemmelser.hent);
router.post('/behandlinger/:behandlingID/medlemskapsperioder/bestemmelser', Medlemskapsperioder.bestemmelser.opprettMedlemskap);
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
 * REPRESENTANT
 * ---------------------------------------------------------------
 */
router.get('/representant/liste', Representant.liste.hent);
router.get('/representant/:representantID', Representant.representant.hent);
router.get('/representant/valgt/:behandlingID', Representant.valgt.hent);
router.post('/representant/valgt/:behandlingID', Representant.valgt.send);

/**
 * SAKSBEHANDLER
 */
router.get('/saksbehandler', Saksbehandler.hent);

/**
 * SAKSFLYT
 * ---------------------------------------------------------------
 */
router.post('/saksflyt/anmodningsperioder/:behandlingID/bestill', Saksflyt.anmodningsperioder.bestill.post);
router.post('/saksflyt/anmodningsperioder/:behandlingID/svar', Saksflyt.anmodningsperioder.svar.send);
router.post('/saksflyt/unntaksperioder/:behandlingID/godkjenn', Saksflyt.unntaksperioder.godkjenn.send);
router.post('/saksflyt/unntaksperioder/:behandlingID/ikkegodkjenn', Saksflyt.unntaksperioder.ikkegodkjenn.send);
router.put('/saksflyt/unntaksperioder/:behandlingID/innhentinfo', Saksflyt.unntaksperioder.innhentinfo.put);
router.post('/saksflyt/vedtak/:behandlingID/fatt', Saksflyt.vedtak.fatt.send);
router.post('/saksflyt/vedtak/:behandlingID/endre', Saksflyt.vedtak.endre.send);
router.post('/saksflyt/utpeking/:behandlingID/avvis', Saksflyt.utpeking.avvis.send);

/**
 * SAKSOPPLYSNINGER
 * ---------------------------------------------------------------
 */
router.get('/saksopplysninger/oppfriskning/:behandlingID', Saksopplysninger.oppfriskning.hent);

/**
 * STATISTIKK
 */
router.get('/statistikk', Statistikk.hent);

/**
 * TRYGDEAVGIFT
 */
router.get('/behandlinger/:behandlingID/trygdeavgift/beregning', Trygdeavgift.beregning.hent);
router.put('/behandlinger/:behandlingID/trygdeavgift/beregning', Trygdeavgift.beregning.send);
router.get('/behandlinger/:behandlingID/trygdeavgift/grunnlag', Trygdeavgift.grunnlag.hent);
router.put('/behandlinger/:behandlingID/trygdeavgift/grunnlag', Trygdeavgift.grunnlag.send);

/**
 * BEHANDLINGSGRUNNLAG
 * ----------------------------------------------------------
 * Endpoint for søknaden, enten den registreres manuelt eller kommer inn elektronisk.
 * GET /behandlingsgrunnlag Returnerer evt. tidligere registrerte data fra søknaden eller elektronisk søknad.
 * POST /behandlingsgrunnlag Poster dataene i søknaden DERSOM det dreier seg om en manuell registrert søknad.
 *
 */
router.get('/behandlingsgrunnlag/:behandlingID', Behandlingsgrunnlag.hent);
router.post('/behandlingsgrunnlag/:behandlingID', Behandlingsgrunnlag.send);

/**
 * VILKÅR
 * ---------------------------------------------------------------
 */
router.get('/vilkaar/:behandlingID', Vilkaar.hent);
router.post('/vilkaar/:behandlingID', Vilkaar.send);
router.put('/vilkaar/:behandlingID/inngangsvilkaar/overstyr', Vilkaar.overstyrinngangsvilkaar);

/**
 * HEALTH
 * ---------------------------------------------------------------
 */
router.get('/health', (__, res) => res.status(200).send());

app.use(allowCrossDomain);
app.use('/api', router);
app.use('/melosys/api', router);

app.listen(port);

/* eslint-disable-next-line no-console */
console.log('Test MeloSys mock API server running on http://'+serverinfo.getIpAdress()+':' + port+'/api');
