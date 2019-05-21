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
    await instance.get('/saksbehandler').then(reportResult).catch(reportError);
    await instance.get('/behandlinger/4').then(reportResult).catch(reportError);
    await instance.get('/behandlinger/4/medlemsperioder').then(reportResult).catch(reportError);
    await instance.get('/fagsaker/sok/').then(reportResult).catch(reportError);
    await instance.get('/fagsaker/4').then(reportResult).catch(reportError);
    await instance.get('/fagsaker/3/kontaktopplysninger/810072512').then(reportResult).catch(reportError);
    await instance.get('/fagsaker/3/aktoerer/?rolle=BRUKER&presenterer=BRUKER').then(reportResult).catch(reportError);
    await instance.get('/soknader/4').then(reportResult).catch(reportError);
    await instance.get('/avklartefakta/4').then(reportResult).catch(reportError);
    await instance.get('/inngang/4').then(reportResult).catch(reportError);
    await instance.get('/lovvalgsperioder/4').then(reportResult).catch(reportError);
    await instance.get('/opprinneligLovvalgsperiode/4').then(reportResult).catch(reportError);
    await instance.get('/oppgaver/sok').then(reportResult).catch(reportError);
    await instance.get('/oppgaver/plukk').then(reportResult).catch(reportError);
    await instance.get('/oppgaver/oversikt').then(reportResult).catch(reportError);
    await instance.get('/oppgaver/reset').then(reportResult).catch(reportError);
    await instance.get('/journalforing/4').then(reportResult).catch(reportError);
    await instance.get('/personer/?fnr=17117802280').then(reportResult).catch(reportError);
    await instance.get('/organisasjoner/?orgnr=810072512').then(reportResult).catch(reportError);
    await instance.get('/saksopplysninger/oppfriskning/4/status').then(reportResult).catch(reportError);
    await instance.get('/saksopplysninger/oppfriskning/4').then(reportResult).catch(reportError);
    await instance.get('/vilkaar/4').then(reportResult).catch(reportError);
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
