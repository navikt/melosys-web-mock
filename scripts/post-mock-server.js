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

console.log('query testing|\n');

instance.get('/saksbehandler').then(printresult).catch(console.error);

const soknad4 = require('./mock_data/soknader/soknad-bid-4');
instance.post('/soknader/4', soknad4).then(printresult).catch(console.error);

const avklartefakta4 = require('./mock_data/avklartefakta/avklartefakta-bid-4');
instance.post('/avklartefakta/4', avklartefakta4).then(printresult).catch(console.error);

const vurdering4 = require('./mock_data/vurdering/vurdering-bid-4');
instance.post('/vurdering/4', vurdering4).then(printresult).catch(console.error);

const lovvalgsperiode = require('./mock_data/lovvalgsperiode/lovvalgsperiode-bid-4');
instance.post('/lovvalgsperiode/4', lovvalgsperiode).then(printresult).catch(console.error);

const oversikt = require('./mock_data/oppgaver/oversikt');
instance.post('/oppgaver/opprett', oversikt).then(printresult).catch(console.error);

const journal_post_opprett = require('./mock_data/journalforing/post/opprett');
instance.post('/journalforing/opprett', journal_post_opprett).then(printresult).catch(console.error);

const journal_post_tilordne = require('./mock_data/journalforing/post/tilordne');
instance.post('/journalforing/tilordne', journal_post_tilordne).then(printresult).catch(console.error);

const dokument_post_utkast = require('./mock_data/dokumenter/post/post_utkast_og_opprett');
const behandlingID = 3;
const dokumentTypeID = 'MELDING_MANGLENDE_OPPLYSNINGER';
instance.post(`/dokumenter/utkast/pdf/${behandlingID}/${dokumentTypeID}`, dokument_post_utkast).then(printresult).catch(console.error);
instance.post(`/dokumenter/opprett/${behandlingID}/${dokumentTypeID}`, dokument_post_utkast).then(printresult).catch(console.error);
/*
PUT vs POST for Creation
In short, favor using POST for resource creation.
Otherwise, use PUT when the client is in charge of deciding which URI (via it's resource name or ID) the new resource will have:
if the client knows what the resulting URI (or resource ID) will be,
use PUT at that URI. Otherwise, use POST when the server or service is in charge of deciding the URI for the newly-created resource.
In other words, when the client doesn't (or shouldn't) know what the resulting URI will be before creation,
use POST to create the new resource.
 */
