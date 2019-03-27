const colors = require('colors/safe');
const axios = require("axios");
axios.defaults.headers.get['Content-Type'] = 'application/json';

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
    await instance.get('/saksbehandler').then(printresult).catch(printerror);
    await instance.get('/fagsaker/sok/').then(printresult).catch(printerror);
    await instance.get('/fagsaker/4').then(printresult).catch(printerror);
    await instance.get('/fagsaker/3/kontaktopplysninger/810072512').then(printresult).catch(printerror);
    await instance.get('/fagsaker/3/aktoerer/?rolle=BRUKER&presenterer=BRUKER').then(printresult).catch(printerror);
    await instance.get('/soknader/4').then(printresult).catch(printerror);
    await instance.get('/avklartefakta/4').then(printresult).catch(printerror);
    await instance.get('/inngang/4').then(printresult).catch(printerror);
    await instance.get('/lovvalgsperioder/4').then(printresult).catch(printerror);
    await instance.get('/oppgaver/sok').then(printresult).catch(printerror);
    await instance.get('/oppgaver/plukk').then(printresult).catch(printerror);
    await instance.get('/oppgaver/oversikt').then(printresult).catch(printerror);
    await instance.get('/oppgaver/reset').then(printresult).catch(printerror);
    await instance.get('/journalforing/4').then(printresult).catch(printerror);
    await instance.get('/personer/?fnr=17117802280').then(printresult).catch(printerror);
    await instance.get('/organisasjoner/?orgnr=810072512').then(printresult).catch(printerror);
    await instance.get('/saksopplysninger/oppfriskning/4/status').then(printresult).catch(printerror);
    await instance.get('/saksopplysninger/oppfriskning/4').then(printresult).catch(printerror);
    await instance.get('/vilkaar/4').then(printresult).catch(printerror);
  }
  catch (e) {
    console.log(e);
  }
  console.log('[GET]',colors.green('yarn get-mock'));
  console.dir(oppsummering);
};


console.log('\n=======================================================');
console.log('[GET] Mock server');
console.log("-------------------------------------------------------");
testAlleEndepunkter();
