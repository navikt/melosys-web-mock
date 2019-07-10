const colors = require('colors/safe');
const { httpClient, printerror, printresult } = require('./helpers');

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
    const databaseid = 955006279357058;
    await client.delete(`/fagsaker/aktoerer/${databaseid}`).then(reportResult).catch(reportError);
    const saksnummer = '4', juridiskorgnr = '810072512';
    await client.delete(`/fagsaker/${saksnummer}/kontaktopplysninger/${juridiskorgnr}`).then(reportResult).catch(reportError);

    console.log('[DELETE]',colors.green('yarn mock:delete'));
    console.dir(oppsummering);
  }
  catch (e) {
    console.error(e);
  }
};

console.log('\n=======================================================');
console.log('[DELETE] Mock client');
console.log('---------------------------------------------------------');

testAlleEndepunkter();
