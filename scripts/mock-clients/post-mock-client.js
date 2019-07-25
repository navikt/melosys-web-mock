const { MOCK_DATA_DIR } = require('../../mock.config');
const { httpClient, printheader, printoppsummering, printerror, printresult } = require('./helpers');
const Schema = require('../utils/schema-util');
const client = httpClient();
const Katalog = require('../katalog');
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
printheader('POST');

const pathname2String = (pathname, params) => {
  const paths = pathname.split('/');
  let path = paths.shift();
  console.log(paths);
  paths.forEach(item => {
    if (item.startsWith(':')) {
      const param = params[item.slice(1)];
      path += `/${param}`;
    }
    else {
      const param = params[item] ? params[item] : item;
      path += `/${param}`;
    }
  });
  return path;
};
const pathObject2String = pathobject => {
  const { pathname, params } = pathobject;
  return pathname2String(pathname, params);
};
const testAll = () => {
  Katalog.katalogMap.forEach((uri, navn) => {
    if (uri && uri.post) {
      const POST_MOCK_DIR = `${MOCK_DATA_DIR}/${navn}/post`;
      const katalog = Schema.lesKatalogSync(POST_MOCK_DIR);
      katalog.forEach(item => console.dir(item));
      const document = katalog[0].document;
      const pathname = pathObject2String(uri.post);
      // console.log('post',pathname);
      // console.log(document);
      // console.log();
      //client.post(pathname, document).then(reportResult).catch(reportError);
    }
  });
};

testAll();

const testAlleEndepunkter = async () => {
  try {
    // Fagsaker
    const henlegg_fagsak = require(`${MOCK_DATA_DIR}/fagsaker/post/henlegg-fagsak`);
    await client.post('/fagsaker/17117802280/henlegg', henlegg_fagsak).then(reportResult).catch(reportError);
    const aktoer = require(`${MOCK_DATA_DIR}/fagsaker/aktoerer/post/aktoer`);
    await client.post('/fagsaker/4/aktoerer', aktoer).then(reportResult).catch(reportError);
    const kontaktopplysninger = require(`${MOCK_DATA_DIR}/fagsaker/kontaktopplysninger/post/kontaktopplysninger`);
    await client.post('/fagsaker/4/kontaktopplysninger/810072512', kontaktopplysninger).then(reportResult).catch(reportError);

    // Behandlinger
    const behandinger_status = require(`${MOCK_DATA_DIR}/behandlinger/status/post/behandlings-status-post`);
    await client.post('/behandlinger/4/status', behandinger_status).then(reportResult).catch(reportError);

    const behandlinger_perioder = require(`${MOCK_DATA_DIR}/behandlinger/tidligeremedlemsperioder/post/medlemsperioder-post`);
    await client.post('/behandlinger/4/medlemsperioder', behandlinger_perioder).then(reportResult).catch(reportError);

    // Soknader
    const soknad = require(`${MOCK_DATA_DIR}/soknader/post/soknad-post`);
    await client.post('/soknader/4', soknad).then(reportResult).catch(reportError);

    // Avklartefakta
    const avklartefakta4 = require(`${MOCK_DATA_DIR}/avklartefakta/post/avklartefakta-post`);
    await client.post('/avklartefakta/4', avklartefakta4).then(reportResult).catch(reportError);

    // Lovvalgsperioder
    const lovvalgsperioder = require(`${MOCK_DATA_DIR}/lovvalgsperioder/lovvalgsperiode-bid-4`);
    await client.post('/lovvalgsperioder/4', lovvalgsperioder).then(reportResult).catch(reportError);

    // Oppgaver
    const oversikt = require(`${MOCK_DATA_DIR}/oppgaver/oversikt`);
    await client.post('/oppgaver/opprett', oversikt).then(reportResult).catch(reportError);

    const tilbakelegg = require(`${MOCK_DATA_DIR}/oppgaver/post/tilbakelegge`);
    await client.post('/oppgaver/tilbakelegge', tilbakelegg).then(reportResult).catch(reportError);

    const plukk = require(`${MOCK_DATA_DIR}/oppgaver/plukk/post/oppgaver-plukk-post`);
    await client.post('/oppgaver/plukk', plukk).then(reportResult).catch(reportError);

    // Journalforing
    const journal_post_opprett = require(`${MOCK_DATA_DIR}/journalforing/post/opprett`);
    await client.post('/journalforing/opprett', journal_post_opprett).then(reportResult).catch(reportError);

    const journal_post_tilordne = require(`${MOCK_DATA_DIR}/journalforing/post/tilordne`);
    await client.post('/journalforing/tilordne', journal_post_tilordne).then(reportResult).catch(reportError);

    // Saksflyt - Vedtak
    const saksflyt_vedtak_post = require(`${MOCK_DATA_DIR}/saksflyt/vedtak/post/saksflyt-vedtak-post`);
    await client.post('/saksflyt/vedtak/4', saksflyt_vedtak_post).then(reportResult).catch(reportError);

    // Saksflyt - unntaksperioder
    const saksflyt_unntaksperiode_post = require(`${MOCK_DATA_DIR}/saksflyt/unntaksperioder/post/saksflyt-unntaksperioder-post`);
    await client.post('/saksflyt/unntaksperioder/4/ikkegodkjenn', saksflyt_unntaksperiode_post).then(reportResult).catch(reportError);

    // Vilkar
    const vilkar_post = require(`${MOCK_DATA_DIR}/vilkar/post/vilkar-post`);
    await client.post('/vilkaar/4', vilkar_post).then(reportResult).catch(reportError);

    // Dokumenter
    const dokument_post_utkast = require(`${MOCK_DATA_DIR}/dokumenter/post/post_utkast_og_opprett`);
    const behandlingID = 3;
    const produserbartDokument = 'MELDING_MANGLENDE_OPPLYSNINGER';
    await client.post(`/dokumenter/utkast/pdf/${behandlingID}/${produserbartDokument}`, dokument_post_utkast).then(reportResult).catch(reportError);
    await client.post(`/dokumenter/opprett/${behandlingID}/${produserbartDokument}`, dokument_post_utkast).then(reportResult).catch(reportError);

    // Anmodningsperioder
    const anmodningsperioder = require(`${MOCK_DATA_DIR}/anmodningsperioder/post/anmodningsperioder-post.json`);
    const anmodningsperiodeSvar = require(`${MOCK_DATA_DIR}/anmodningsperioder/svar/post/anmodningsperiodersvar-post.json`);
    await client.post('/anmodningsperioder/4', anmodningsperioder).then(reportResult).catch(reportError);
    await client.post('/anmodningsperioder/svar/4', anmodningsperiodeSvar).then(reportResult).catch(reportError);

    // Eessi
    const opprettbuc_post = require(`${MOCK_DATA_DIR}/eessi/post/opprettbuc`);
    await client.post(`/eessi/bucer/${behandlingID}/opprett`, opprettbuc_post).then(reportResult).catch(reportError);

    printoppsummering(oppsummering, 'POST');
  }
  catch (e) {
    console.error(e);
  }
};

//testAlleEndepunkter();
/*
PUT vs POST for Creation
In short, favor using POST for resource creation.
Otherwise, use PUT when the client is in charge of deciding which URI (via it's resource name or ID) the new resource will have:
if the client knows what the resulting URI (or resource ID) will be,
use PUT at that URI. Otherwise, use POST when the server or service is in charge of deciding the URI for the newly-created resource.
In other words, when the client doesn't (or shouldn't) know what the resulting URI will be before creation,
use POST to create the new resource.
 */
