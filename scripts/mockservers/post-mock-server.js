const colors = require('colors/safe');
const axios = require('axios');
const { MOCK_DATA_DIR } = require('../../mock.config');
const { printerror, printresult } = require('./helpers');

axios.defaults.headers.post['Content-Type'] = 'application/json';

const instance = axios.create({
  baseURL: 'http://localhost:3002/api',
  timeout: 1000
});

const oppsummering = {
  success: 0,
  failure: 0,
};

const reportResult = res => {
  oppsummering.success += 1;
  printresult(res);
};

const reportError = res => {
  oppsummering.failure += 1;
  printerror(res);
};

const testAlleEndepunkter = async () => {
  try {
    // Fagsaker
    const henlegg_fagsak = require(`${MOCK_DATA_DIR}/fagsaker/post/henlegg-fagsak`);
    await instance.post('/fagsaker/17117802280/henlegg', henlegg_fagsak).then(reportResult).catch(reportError);
    const aktoer = require(`${MOCK_DATA_DIR}/fagsaker/aktoerer/post/aktoer`);
    await instance.post('/fagsaker/4/aktoerer', aktoer).then(reportResult).catch(reportError);
    const kontaktopplysninger = require(`${MOCK_DATA_DIR}/fagsaker/kontaktopplysninger/post/kontaktopplysninger`);
    await instance.post('/fagsaker/4/kontaktopplysninger/810072512', kontaktopplysninger).then(reportResult).catch(reportError);

    // Behandlinger
    const behandinger_status = require(`${MOCK_DATA_DIR}/behandlinger/status/post/behandlings-status-post`);
    await instance.post('/behandlinger/4/status', behandinger_status).then(reportResult).catch(reportError);

    const medlems_perioder = require(`${MOCK_DATA_DIR}/behandlinger/tidligeremedlemsperioder/post/medlemsperioder-post`);
    await instance.post('/behandlinger/4/medlemsperioder', medlems_perioder).then(reportResult).catch(reportError);

    // Soknader
    const soknad = require(`${MOCK_DATA_DIR}/soknader/post/soknad-post`);
    await instance.post('/soknader/4', soknad).then(reportResult).catch(reportError);

    // Avklartefakta
    const avklartefakta4 = require(`${MOCK_DATA_DIR}/avklartefakta/post/avklartefakta-post`);
    await instance.post('/avklartefakta/4', avklartefakta4).then(reportResult).catch(reportError);

    // Lovvalgsperioder
    const lovvalgsperioder = require(`${MOCK_DATA_DIR}/lovvalgsperioder/lovvalgsperiode-bid-4`);
    await instance.post('/lovvalgsperioder/4', lovvalgsperioder).then(reportResult).catch(reportError);

    // Oppgaver
    const oversikt = require(`${MOCK_DATA_DIR}/oppgaver/oversikt`);
    await instance.post('/oppgaver/opprett', oversikt).then(reportResult).catch(reportError);

    const tilbakelegg = require(`${MOCK_DATA_DIR}/oppgaver/post/tilbakelegge`);
    await instance.post('/oppgaver/tilbakelegge', tilbakelegg).then(reportResult).catch(reportError);

    const plukk = require(`${MOCK_DATA_DIR}/oppgaver/plukk/post/oppgaver-plukk-post`);
    await instance.post('/oppgaver/plukk', plukk).then(reportResult).catch(reportError);

    // Journalforing
    const journal_post_opprett = require(`${MOCK_DATA_DIR}/journalforing/post/opprett`);
    await instance.post('/journalforing/opprett', journal_post_opprett).then(reportResult).catch(reportError);

    const journal_post_tilordne = require(`${MOCK_DATA_DIR}/journalforing/post/tilordne`);
    await instance.post('/journalforing/tilordne', journal_post_tilordne).then(reportResult).catch(reportError);

    // Vedtak
    const vedtak_post = require(`${MOCK_DATA_DIR}/saksflyt/vedtak/post/saksflyt-vedtak-post`);
    await instance.post('/vedtak/4', vedtak_post).then(reportResult).catch(reportError);

    // Vilkar
    const vilkar_post = require(`${MOCK_DATA_DIR}/vilkar/post/vilkar-post`);
    await instance.post('/vilkaar/4', vilkar_post).then(reportResult).catch(reportError);

    // Dokumenter
    const dokument_post_utkast = require(`${MOCK_DATA_DIR}/dokumenter/post/post_utkast_og_opprett`);
    const behandlingID = 3;
    const produserbartDokument = 'MELDING_MANGLENDE_OPPLYSNINGER';
    await instance.post(`/dokumenter/utkast/pdf/${behandlingID}/${produserbartDokument}`, dokument_post_utkast).then(reportResult).catch(reportError);
    await instance.post(`/dokumenter/opprett/${behandlingID}/${produserbartDokument}`, dokument_post_utkast).then(reportResult).catch(reportError);

    console.log('[POST]',colors.green('yarn mock:post'));
    console.dir(oppsummering);
  }
  catch (e) {
    console.error(e);
  }
};

console.log('\n=======================================================');
console.log('[POST] Mock server');
console.log('---------------------------------------------------------');

testAlleEndepunkter();
/*
PUT vs POST for Creation
In short, favor using POST for resource creation.
Otherwise, use PUT when the client is in charge of deciding which URI (via it's resource name or ID) the new resource will have:
if the client knows what the resulting URI (or resource ID) will be,
use PUT at that URI. Otherwise, use POST when the server or service is in charge of deciding the URI for the newly-created resource.
In other words, when the client doesn't (or shouldn't) know what the resulting URI will be before creation,
use POST to create the new resource.
 */
