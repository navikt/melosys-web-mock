const { httpClient, printheader, printoppsummering, printerror, printresult } = require('./helpers');

const client = httpClient();

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
    await client.get('/saksbehandler').then(reportResult).catch(reportError);
    await client.get('/anmodningsperioder/4').then(reportResult).catch(reportError);
    await client.get('/anmodningsperioder/svar/4').then(reportResult).catch(reportError);

    await client.get('/behandlinger/4').then(reportResult).catch(reportError);
    await client.get('/behandlinger/4/medlemsperioder').then(reportResult).catch(reportError);
    await client.get('/fagsaker/sok/').then(reportResult).catch(reportError);
    await client.get('/fagsaker/4').then(reportResult).catch(reportError);
    await client.get('/fagsaker/3/kontaktopplysninger/810072512').then(reportResult).catch(reportError);
    await client.get('/fagsaker/3/aktoerer/?rolle=BRUKER&presenterer=BRUKER').then(reportResult).catch(reportError);
    await client.get('/soknader/4').then(reportResult).catch(reportError);
    await client.get('/avklartefakta/4').then(reportResult).catch(reportError);
    await client.get('/inngang/4').then(reportResult).catch(reportError);
    await client.get('/lovvalgsperioder/4').then(reportResult).catch(reportError);
    await client.get('/opprinneligLovvalgsperiode/4').then(reportResult).catch(reportError);
    await client.get('/oppgaver/sok').then(reportResult).catch(reportError);
    await client.get('/oppgaver/plukk').then(reportResult).catch(reportError);
    await client.get('/oppgaver/oversikt').then(reportResult).catch(reportError);
    await client.get('/oppgaver/reset').then(reportResult).catch(reportError);
    await client.get('/journalforing/4').then(reportResult).catch(reportError);
    await client.get('/personer/?fnr=17117802280').then(reportResult).catch(reportError);
    await client.get('/organisasjoner/?orgnr=810072512').then(reportResult).catch(reportError);
    await client.get('/saksopplysninger/oppfriskning/4/status').then(reportResult).catch(reportError);
    await client.get('/saksopplysninger/oppfriskning/4').then(reportResult).catch(reportError);
    await client.get('/vilkaar/4').then(reportResult).catch(reportError);
    await client.get('/eessi/mottakerinstitusjoner/LA_BUC_01').then(reportResult).catch(reportError);
    await client.get('/eessi/bucer/4?status=utkast').then(reportResult).catch(reportError);
  }
  catch (e) {
    console.log(e);
  }
  printoppsummering(oppsummering, 'GET');
};

printheader('GET');
testAlleEndepunkter();
