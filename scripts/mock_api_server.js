const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const NodeCache = require('node-cache');
const nodeCache = new NodeCache();
global.nodeCache = nodeCache;

const serverinfo = require('./utils/server-info');
const logging = require('./utils/logging');
const { graphqlRouter } = require('./graphql');

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
const restRouter = express.Router();

// router.post('/logger/trace', logging.trace);
// router.post('/logger/debug', logging.debug);
restRouter.post('/logger/info', logging.info);
restRouter.post('/logger/warn', logging.warn);
restRouter.post('/logger/error', logging.error);

/**
 * ANMODNINGSPERIODER
 */
restRouter.get('/anmodningsperioder/:behandlingID', Anmodningsperioder.hent);
restRouter.post('/anmodningsperioder/:behandlingID', Anmodningsperioder.send);
restRouter.get('/anmodningsperioder/:anmodningsperiodeID/svar', Anmodningsperioder.svar.hent);
restRouter.post('/anmodningsperioder/:anmodningsperiodeID/svar', Anmodningsperioder.svar.send);

/**
 * UTPEKNINGSPERIOER
 */
restRouter.get('/utpekingsperioder/:behandlingID', Utpekingsperioder.hent);
restRouter.post('/utpekingsperioder/:behandlingID', Utpekingsperioder.send);

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
restRouter.get('/avklartefakta/:behandlingID', Avklartefakta.avklartefakta.hent);
restRouter.post('/avklartefakta/:behandlingID', Avklartefakta.avklartefakta.send);
restRouter.get('/avklartefakta/:behandlingID/oppsummering', Avklartefakta.oppsummering.hent);
restRouter.post('/avklartefakta/:behandlingID/virksomheter', Avklartefakta.virksomhet.send);
restRouter.post('/avklartefakta/:behandlingID/medfolgendeFamilie', Avklartefakta.medfolgendeFamilie.send);

/**
 * BEHANDLINGER
 * ----------------------------------------------------------------
 */
restRouter.get('/behandlinger/:behandlingID', Behandlinger.behandling.hent);
restRouter.post('/behandlinger/:behandlingID/status', Behandlinger.status.send);
restRouter.get('/behandlinger/:behandlingID/muligeStatuser', Behandlinger.status.hent);
restRouter.get('/behandlinger/:behandlingID/tidligeremedlemsperioder', Behandlinger.tidligeremedlemsperioder.hent);
restRouter.post('/behandlinger/:behandlingID/tidligeremedlemsperioder', Behandlinger.tidligeremedlemsperioder.send);
restRouter.get('/behandlinger/:behandlingID/resultat', Behandlinger.resultat.hent);
restRouter.get('/behandlinger/:behandlingID/muligeBehandlingstema', Behandlinger.endreBehandlingstema.hent);
restRouter.post('/behandlinger/:behandlingID/endreBehandlingstema', Behandlinger.endreBehandlingstema.send);
restRouter.post('/behandlinger/:behandlingID/behandlingsfrist', Behandlinger.endreBehandlngsfrist.send);

/**
 * DOKUMENTER
 * ---------------------------------------------------------------
 */
// Oppretter en bestilling av dokument i dokumentproduksjon
restRouter.post('/dokumenter/opprett/:behandlingID/:produserbartDokument', Dokumenter.dokument.opprett.send);
restRouter.get('/dokumenter/oversikt/:snr', Dokumenter.dokument.oversikt.hent);

// Henter et eksisterende dokument fra dokumentarkiv
restRouter.get('/dokumenter/pdf/:journalpostID/:dokumentID', Dokumenter.pdf.hent);

// Henter forhåndsvisning som byte stream fra dokumentproduksjon
restRouter.post('/dokumenter/pdf/brev/utkast/:behandlingID/:produserbartDokument', Dokumenter.pdf.brev.utkast.send);

// Henter forhåndsvisning av sed som byte stream fra rina
restRouter.post('/dokumenter/pdf/sed/utkast/:behandlingID/:sedType', Dokumenter.pdf.sed.utkast.send);

/**
 * DOKUMENTER-V2
 * ---------------------------------------------------------------
 */
restRouter.post('/dokumenter/v2/opprett/:behandlingID', DokumenterV2.opprett.send);
restRouter.post('/dokumenter/v2/pdf/brev/utkast/:behandlingID', DokumenterV2.utkast.send);
restRouter.get('/dokumenter/v2/tilgjengelige-maler/:behandlingID', DokumenterV2.tilgjengeligemaler.hent);
restRouter.post('/dokumenter/v2/mulige-mottakere/:behandlingID', DokumenterV2.muligeMottakere.send);

/**
 * EESSI
 * ----------------------------------------------------------------
 */
restRouter.get('/eessi/mottakerinstitusjoner/:bucType', Eessi.mottakerinstitusjoner.hent);
restRouter.get('/eessi/bucer/:behandlingID', Eessi.bucer.hentBucerUnderArbeid);
restRouter.post('/eessi/bucer/:behandlingID/opprett', Eessi.bucer.opprett.send);

/**
 * FAGSAKER
 * ----------------------------------------------------------------------------
 * Henter fagsak med alle behandlinger for en enkelt søknad, basert på "snr" som backend omtales som "fagsak_id".
 * Data som returneres som en del av fagsaken er data som kommer fra registre.
 *
 */
restRouter.post('/fagsaker/sok', Fagsaker.sok.send);

restRouter.get('/fagsaker/:saksnummer', Fagsaker.fagsak.hent);
restRouter.post('/fagsaker/:saksnummer/henlegg', Fagsaker.fagsak.henlegg.send);
restRouter.put('/fagsaker/:saksnummer/avsluttsaksombortfalt', Fagsaker.fagsak.avsluttsaksombortfalt.put);
restRouter.put('/fagsaker/:saksnummer/avslutt', Fagsaker.fagsak.avslutt.put);
restRouter.post('/fagsaker/:saksnummer/henlegg-videresend', Fagsaker.fagsak.henleggVideresend.send);
restRouter.post('/fagsaker/:saksnummer/utpek', Fagsaker.fagsak.utpek.send);
restRouter.post('/fagsaker/opprett', Fagsaker.fagsak.opprett.send);
restRouter.post('/fagsaker/:saksnummer/revurder', Fagsaker.fagsak.revurder.send);

restRouter.get('/fagsaker/:saksnummer/notater', Fagsaker.notater.hent);
restRouter.post('/fagsaker/:saksnummer/notater', Fagsaker.notater.send);
restRouter.put('/fagsaker/:saksnummer/notater/:notatid', Fagsaker.notater.put);

restRouter.get('/fagsaker/:saksnummer/aktoerer', Fagsaker.aktoer.hent);
restRouter.post('/fagsaker/:saksnummer/aktoerer', Fagsaker.aktoer.send);
restRouter.delete('/fagsaker/aktoerer/:databaseid', Fagsaker.aktoer.slett);

restRouter.get('/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr', Fagsaker.kontaktopplysninger.hent);
restRouter.post('/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr', Fagsaker.kontaktopplysninger.send);
restRouter.delete('/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr', Fagsaker.kontaktopplysninger.slett);

/**
 * FEATURETOGGLE
 * ----------------------------------------------------------
 */
restRouter.get('/featuretoggle', FeatureToggle.hent);

/**
 * JOURNALFORING
 * ---------------------------------------------------------------
 */
restRouter.get('/journalforing/:journalpostID', Journalforing.hent);
restRouter.post('/journalforing/opprett', Journalforing.opprett.send);
restRouter.post('/journalforing/sed', Journalforing.sed.send);
restRouter.post('/journalforing/tilordne', Journalforing.tilordne.send);

/**
 * KODEVERK
 * ---------------------------------------------------------------
 */
restRouter.get('/kodeverk/nav-felles/:kodeverknavn', Kodeverk.navFelles.hentKodeverk);
restRouter.get('/kodeverk/melosys-internt/folketrygden', Kodeverk.melosysInternt.folketrygden);
/**
 * LOVVALGSPERIODER
 * ---------------------------------------------------------------
 */
restRouter.get('/lovvalgsperioder/:behandlingID', Lovvalgsperioder.hent);
restRouter.post('/lovvalgsperioder/:behandlingID', Lovvalgsperioder.send);
restRouter.get('/lovvalgsperioder/:behandlingID/opprinnelig', Lovvalgsperioder.opprinnelig.hent);
/**
 * MEDLEMSKAPSPERIODER
 * ---------------------------------------------------------------
 */
restRouter.get('/behandlinger/:behandlingID/medlemskapsperioder', Medlemskapsperioder.medlemskapsperioder.hent);
restRouter.post('/behandlinger/:behandlingID/medlemskapsperioder', Medlemskapsperioder.medlemskapsperioder.post);
restRouter.put('/behandlinger/:behandlingID/medlemskapsperioder/:medlemskapsperiodeID', Medlemskapsperioder.medlemskapsperioder.put);
restRouter.delete('/behandlinger/:behandlingID/medlemskapsperioder/:medlemskapsperiodeID', Medlemskapsperioder.medlemskapsperioder.delete);
restRouter.get('/behandlinger/medlemskapsperioder/bestemmelser', Medlemskapsperioder.bestemmelser.hent);
restRouter.post('/behandlinger/:behandlingID/medlemskapsperioder/bestemmelser', Medlemskapsperioder.bestemmelser.opprettMedlemskap);
/**
 * OPPGAVER
 * ---------------------------------------------------------------
 */
restRouter.get('/oppgaver/oversikt', Oppgaver.oversikt.hent);
restRouter.get('/oppgaver/sok', Oppgaver.sok.hent);
restRouter.post('/oppgaver/plukk', Oppgaver.plukk.send);
restRouter.post('/oppgaver/tilbakelegg', Oppgaver.tilbakelegg.send);

/**
 * ORGANISASJONER
 * ---------------------------------------------------------------
 */
restRouter.get('/organisasjoner/:orgnr', Organisasjoner.hent);

/**
 * PERSONER
 * ---------------------------------------------------------------
 */
restRouter.get('/personer/:fnr', Personer.hent);

/**
 * REPRESENTANT
 * ---------------------------------------------------------------
 */
restRouter.get('/representant/liste', Representant.liste.hent);
restRouter.get('/representant/:representantID', Representant.representant.hent);
restRouter.get('/representant/valgt/:behandlingID', Representant.valgt.hent);
restRouter.post('/representant/valgt/:behandlingID', Representant.valgt.send);

/**
 * SAKSBEHANDLER
 */
restRouter.get('/saksbehandler', Saksbehandler.hent);

/**
 * SAKSFLYT
 * ---------------------------------------------------------------
 */
restRouter.post('/saksflyt/anmodningsperioder/:behandlingID/bestill', Saksflyt.anmodningsperioder.bestill.post);
restRouter.post('/saksflyt/anmodningsperioder/:behandlingID/svar', Saksflyt.anmodningsperioder.svar.send);
restRouter.post('/saksflyt/unntaksperioder/:behandlingID/godkjenn', Saksflyt.unntaksperioder.godkjenn.send);
restRouter.post('/saksflyt/unntaksperioder/:behandlingID/ikkegodkjenn', Saksflyt.unntaksperioder.ikkegodkjenn.send);
restRouter.put('/saksflyt/unntaksperioder/:behandlingID/innhentinfo', Saksflyt.unntaksperioder.innhentinfo.put);
restRouter.post('/saksflyt/vedtak/:behandlingID/fatt', Saksflyt.vedtak.fatt.send);
restRouter.post('/saksflyt/vedtak/:behandlingID/endre', Saksflyt.vedtak.endre.send);
restRouter.post('/saksflyt/utpeking/:behandlingID/avvis', Saksflyt.utpeking.avvis.send);

/**
 * SAKSOPPLYSNINGER
 * ---------------------------------------------------------------
 */
restRouter.get('/saksopplysninger/oppfriskning/:behandlingID', Saksopplysninger.oppfriskning.hent);

/**
 * STATISTIKK
 */
restRouter.get('/statistikk', Statistikk.hent);

/**
 * TRYGDEAVGIFT
 */
restRouter.get('/behandlinger/:behandlingID/trygdeavgift/beregning', Trygdeavgift.beregning.hent);
restRouter.put('/behandlinger/:behandlingID/trygdeavgift/beregning', Trygdeavgift.beregning.send);
restRouter.get('/behandlinger/:behandlingID/trygdeavgift/grunnlag', Trygdeavgift.grunnlag.hent);
restRouter.put('/behandlinger/:behandlingID/trygdeavgift/grunnlag', Trygdeavgift.grunnlag.send);

/**
 * BEHANDLINGSGRUNNLAG
 * ----------------------------------------------------------
 * Endpoint for søknaden, enten den registreres manuelt eller kommer inn elektronisk.
 * GET /behandlingsgrunnlag Returnerer evt. tidligere registrerte data fra søknaden eller elektronisk søknad.
 * POST /behandlingsgrunnlag Poster dataene i søknaden DERSOM det dreier seg om en manuell registrert søknad.
 *
 */
restRouter.get('/behandlingsgrunnlag/:behandlingID', Behandlingsgrunnlag.hent);
restRouter.post('/behandlingsgrunnlag/:behandlingID', Behandlingsgrunnlag.send);

/**
 * VILKÅR
 * ---------------------------------------------------------------
 */
restRouter.get('/vilkaar/:behandlingID', Vilkaar.hent);
restRouter.post('/vilkaar/:behandlingID', Vilkaar.send);
restRouter.put('/vilkaar/:behandlingID/inngangsvilkaar/overstyr', Vilkaar.overstyrinngangsvilkaar);

/**
 * HEALTH
 * ---------------------------------------------------------------
 */
restRouter.get('/health', (__, res) => res.status(200).send());

app.use(allowCrossDomain);
app.use('/api', restRouter);
app.use('/melosys/api', restRouter);
app.use("/graphql", graphqlRouter);
app.use("/melosys/graphql", graphqlRouter);

app.listen(port);

/* eslint-disable-next-line no-console */
console.log('Test MeloSys mock API server running on http://'+serverinfo.getIpAdress()+':' + port+'/api');
