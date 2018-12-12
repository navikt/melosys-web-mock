const colors = require('colors/safe');
const axios = require("axios");
axios.defaults.headers.post['Content-Type'] = 'application/json';

const instance = axios.create({
  baseURL: 'http://localhost:3002/api',
  timeout: 1000
});

const printresult = res => {
  const { method, url} = res.config;
  console.log(`[${method.toUpperCase()}]`, url);
  console.log(res.status, res.statusText);
  // console.log(res.data);
  console.log("-------------------------------------------------------\n");
};

const printerror = res => {
  const { request, response } = res;
  console.error(`[${request.method.toUpperCase()}]`, request.path);
  console.error(colors.bgRed(`${response.status} ${response.statusText}`));
  console.error(response.data.message);
  console.error("-------------------------------------------------------\n");
};


instance.get('/saksbehandler').then(printresult).catch(printerror);

const behandinger_status = require('./mock_data/behandlinger/post/behandlinger-status');
instance.post('/behandlinger/4/status', behandinger_status).then(printresult).catch(printerror);

const behandlinger_perioder= require('./mock_data/behandlinger/post/behandlinger-perioder');
instance.post('/behandlinger/4/perioder', behandlinger_perioder).then(printresult).catch(printerror);

const soknad = require('./mock_data/soknader/post/soknad-post');
instance.post('/soknader/4', soknad).then(printresult).catch(error => printerror(error.response.data));

const avklartefakta4 = require('./mock_data/avklartefakta/avklartefakta-bid-4');
instance.post('/avklartefakta/4', avklartefakta4).then(printresult).catch(printerror);

const lovvalgsperioder = require('./mock_data/lovvalgsperioder/lovvalgsperiode-bid-4');
instance.post('/lovvalgsperioder/4', lovvalgsperioder).then(printresult).catch(printerror);

const oversikt = require('./mock_data/oppgaver/oversikt');
instance.post('/oppgaver/opprett', oversikt).then(printresult).catch(printerror);

const tilbakelegg = require('./mock_data/oppgaver/post/tilbakelegge');
instance.post('/oppgaver/tilbakelegge', tilbakelegg).then(printresult).catch(printerror);

const journal_post_opprett = require('./mock_data/journalforing/post/opprett');
instance.post('/journalforing/opprett', journal_post_opprett).then(printresult).catch(printerror);

const journal_post_tilordne = require('./mock_data/journalforing/post/tilordne');
instance.post('/journalforing/tilordne', journal_post_tilordne).then(printresult).catch(printerror);

const vedtak_post = require('./mock_data/vedtak/post/vedtak-post');
instance.post('/vedtak/4', vedtak_post).then(printresult).catch(printerror);

const dokument_post_utkast = require('./mock_data/dokumenter/post/post_utkast_og_opprett');
const behandlingID = 3;
const dokumentTypeID = 'MELDING_MANGLENDE_OPPLYSNINGER';
instance.post(`/dokumenter/utkast/pdf/${behandlingID}/${dokumentTypeID}`, dokument_post_utkast).then(printresult).catch(printerror);
instance.post(`/dokumenter/opprett/${behandlingID}/${dokumentTypeID}`, dokument_post_utkast).then(printresult).catch(printerror);

/*
PUT vs POST for Creation
In short, favor using POST for resource creation.
Otherwise, use PUT when the client is in charge of deciding which URI (via it's resource name or ID) the new resource will have:
if the client knows what the resulting URI (or resource ID) will be,
use PUT at that URI. Otherwise, use POST when the server or service is in charge of deciding the URI for the newly-created resource.
In other words, when the client doesn't (or shouldn't) know what the resulting URI will be before creation,
use POST to create the new resource.
 */
