const colors = require('colors/safe');

const { getAsJson } = require('./http-client-api');
const { API_BASE_URL } = require('../../mock.config');
const { printerror, printresult } = require('./helpers');

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

const hent = url => {
  const URI_HENT = `${API_BASE_URL}${url}`;
  return getAsJson(URI_HENT);
};

const testAlleEndepunkter = async () => {
  try {
    await hent('/saksbehandler').then(reportResult).catch(reportError);
    await hent('/behandlinger/4').then(reportResult).catch(reportError);
    await hent('/behandlinger/4/medlemsperioder').then(reportResult).catch(reportError);
    await hent('/fagsaker/sok/').then(reportResult).catch(reportError);
    await hent('/fagsaker/4').then(reportResult).catch(reportError);
    await hent('/fagsaker/3/kontaktopplysninger/810072512').then(reportResult).catch(reportError);
    await hent('/fagsaker/3/aktoerer/?rolle=BRUKER&presenterer=BRUKER').then(reportResult).catch(reportError);
    await hent('/soknader/4').then(reportResult).catch(reportError);
    await hent('/avklartefakta/4').then(reportResult).catch(reportError);
    await hent('/inngang/4').then(reportResult).catch(reportError);
    await hent('/lovvalgsperioder/4').then(reportResult).catch(reportError);
    await hent('/opprinneligLovvalgsperiode/4').then(reportResult).catch(reportError);
    await hent('/oppgaver/sok').then(reportResult).catch(reportError);
    await hent('/oppgaver/plukk').then(reportResult).catch(reportError);
    await hent('/oppgaver/oversikt').then(reportResult).catch(reportError);
    await hent('/oppgaver/reset').then(reportResult).catch(reportError);
    await hent('/journalforing/4').then(reportResult).catch(reportError);
    await hent('/personer/?fnr=17117802280').then(reportResult).catch(reportError);
    await hent('/organisasjoner/?orgnr=810072512').then(reportResult).catch(reportError);
    await hent('/saksopplysninger/oppfriskning/4/status').then(reportResult).catch(reportError);
    await hent('/saksopplysninger/oppfriskning/4').then(reportResult).catch(reportError);
    await hent('/vilkaar/4').then(reportResult).catch(reportError);
    await hent('/eessi/mottakerinstitusjoner/LA_BUC_01').then(reportResult).catch(reportError);
    await hent('/eessi/bucer/4?status=utkast').then(reportResult).catch(reportError);
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
