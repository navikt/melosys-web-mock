const colors = require('colors/safe');
const axios = require("axios");
axios.defaults.headers.post['Content-Type'] = 'application/json';

const instance = axios.create({
  baseURL: 'http://localhost:3002/api',
  timeout: 1000
});

const oppsummering = {
  success: 0,
  failure: 0,
};
const printresult = res => {
  oppsummering.success += 1;
  const { method, url} = res.config;
  console.log(`[${method.toUpperCase()}]`, url);
  console.log(res.status, res.statusText);
  console.log("-------------------------------------------------------\n");
};

const printerror = res => {
  oppsummering.failure += 1;
  const { request, response } = res;

  const { method, path } = request;
  const { status, statusText, data } = response;

  const message = (data && data.message) ? data.message : 'Ukjent validering feil';
  console.error(`[${method.toUpperCase()}]`, path);
  console.error(colors.bgRed(`${status} ${statusText}`));
  console.error(message);
  console.error("-------------------------------------------------------\n");
};

const testAlleEndepunkter = async () => {
  try {
    // Fagsaker
    const henlegg_fagsak = require('./mock_data/fagsaker/post/henlegg-fagsak');
    await instance.post('/fagsaker/17117802280/henlegg', henlegg_fagsak);
    const aktoer = require('./mock_data/fagsaker/aktoerer/post/aktoer');
    await instance.post('/fagsaker/4/aktoerer', aktoer).then(printresult).catch(printerror);
    const kontaktopplysninger = require('./mock_data/fagsaker/kontaktopplysninger/post/kontaktopplysninger');
    await instance.post('/fagsaker/4/kontaktopplysninger/810072512', kontaktopplysninger).then(printresult).catch(printerror);

    // Behandlinger
    const behandinger_status = require('./mock_data/behandlinger/post/behandlinger-status');
    await instance.post('/behandlinger/4/status', behandinger_status).then(printresult).catch(printerror);

    const behandlinger_perioder = require('./mock_data/behandlinger/post/behandlinger-perioder');
    await instance.post('/behandlinger/4/perioder', behandlinger_perioder).then(printresult).catch(printerror);

    // Soknader
    const soknad = require('./mock_data/soknader/post/soknad-post');
    await instance.post('/soknader/4', soknad).then(printresult).catch(printerror);

    // Avklartefakta
    const avklartefakta4 = require('./mock_data/avklartefakta/avklartefakta-bid-4');
    await instance.post('/avklartefakta/4', avklartefakta4).then(printresult).catch(printerror);

    // Lovvalgsperioder
    const lovvalgsperioder = require('./mock_data/lovvalgsperioder/lovvalgsperiode-bid-4');
    await instance.post('/lovvalgsperioder/4', lovvalgsperioder).then(printresult).catch(printerror);

    // Oppgaver
    const oversikt = require('./mock_data/oppgaver/oversikt');
    await instance.post('/oppgaver/opprett', oversikt).then(printresult).catch(printerror);

    const tilbakelegg = require('./mock_data/oppgaver/post/tilbakelegge');
    await instance.post('/oppgaver/tilbakelegge', tilbakelegg).then(printresult).catch(printerror);

    // Journalforing
    const journal_post_opprett = require('./mock_data/journalforing/post/opprett');
    await instance.post('/journalforing/opprett', journal_post_opprett).then(printresult).catch(printerror);

    const journal_post_tilordne = require('./mock_data/journalforing/post/tilordne');
    await instance.post('/journalforing/tilordne', journal_post_tilordne).then(printresult).catch(printerror);

    // Vedtak
    const vedtak_post = require('./mock_data/vedtak/post/vedtak-post');
    await instance.post('/vedtak/4', vedtak_post).then(printresult).catch(printerror);

    // Vilkar
    const vilkar_post = require('./mock_data/vilkar/post/vilkar-post');
    await instance.post('/vilkaar/4', vilkar_post);

    // Dokumenter
    const dokument_post_utkast = require('./mock_data/dokumenter/post/post_utkast_og_opprett');
    const behandlingID = 3;
    const produserbartDokument = 'MELDING_MANGLENDE_OPPLYSNINGER';
    await instance.post(`/dokumenter/utkast/pdf/${behandlingID}/${produserbartDokument}`, dokument_post_utkast).then(printresult).catch(printerror);
    await instance.post(`/dokumenter/opprett/${behandlingID}/${produserbartDokument}`, dokument_post_utkast).then(printresult).catch(printerror);

    console.log('[POST]',colors.green('yarn post-mock'));
    console.dir(oppsummering);
  }
  catch (e) {
    console.error(e);
  }
};

console.log('\n=======================================================');
console.log('[POST] Mock server');
console.log("---------------------------------------------------------");
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
