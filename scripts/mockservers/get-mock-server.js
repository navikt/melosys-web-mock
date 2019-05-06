const colors = require('colors/safe');
const axios = require("axios");
const { printerror, printresult } = require('./helpers');

axios.defaults.headers.get['Content-Type'] = 'application/json';

const instance = axios.create({
  baseURL: 'http://localhost:3002/api',
  timeout: 1000
});

const oppsummering = {
  success: 0,
  failure: 0,
};

const handleresult = res => {
  oppsummering.success += 1;
  printresult(res);
};

const handleerror = res => {
  oppsummering.failure += 1;
  printerror(res);
};

const testAlleEndepunkter = async () => {
  try {
    await instance.get('/saksbehandler').then(handleresult).catch(handleerror);
    await instance.get('/behandlinger/4').then(handleresult).catch(handleerror);
    await instance.get('/behandlinger/4/perioder').then(handleresult).catch(handleerror);
    await instance.get('/fagsaker/sok/').then(handleresult).catch(handleerror);
    await instance.get('/fagsaker/4').then(handleresult).catch(handleerror);
    await instance.get('/fagsaker/3/kontaktopplysninger/810072512').then(handleresult).catch(handleerror);
    await instance.get('/fagsaker/3/aktoerer/?rolle=BRUKER&presenterer=BRUKER').then(handleresult).catch(handleerror);
    await instance.get('/soknader/4').then(handleresult).catch(handleerror);
    await instance.get('/avklartefakta/4').then(handleresult).catch(handleerror);
    await instance.get('/inngang/4').then(handleresult).catch(handleerror);
    await instance.get('/lovvalgsperioder/4').then(handleresult).catch(handleerror);
    await instance.get('/opprinneligLovvalgsperiode/4').then(handleresult).catch(handleerror);
    await instance.get('/oppgaver/sok').then(handleresult).catch(handleerror);
    await instance.get('/oppgaver/plukk').then(handleresult).catch(handleerror);
    await instance.get('/oppgaver/oversikt').then(handleresult).catch(handleerror);
    await instance.get('/oppgaver/reset').then(handleresult).catch(handleerror);
    await instance.get('/journalforing/4').then(handleresult).catch(handleerror);
    await instance.get('/personer/?fnr=17117802280').then(handleresult).catch(handleerror);
    await instance.get('/organisasjoner/?orgnr=810072512').then(handleresult).catch(handleerror);
    await instance.get('/saksopplysninger/oppfriskning/4/status').then(handleresult).catch(handleerror);
    await instance.get('/saksopplysninger/oppfriskning/4').then(handleresult).catch(handleerror);
    await instance.get('/vilkaar/4').then(handleresult).catch(handleerror);
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
