const colors = require('colors/safe');
const { deleteAsJson} = require('./http-client-api');
const { API_BASE_URL} = require('../../mock.config');
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

const slett = url => {
  const URI_SLETT = `${API_BASE_URL}${url}`;
  return deleteAsJson(URI_SLETT);
};

const testAlleEndepunkter = () => {
  try {
    const databaseid = 955006279357058;
    slett(`/fagsaker/aktoerer/${databaseid}`, true).then(reportResult).catch(reportError);

    const saksnummer = '4', juridiskorgnr = '810072512';
    slett(`/fagsaker/${saksnummer}/kontaktopplysninger/${juridiskorgnr}`).then(reportResult).catch(reportError);

    console.log('[DELETE]',colors.green('yarn mock:delete'));
    console.dir(oppsummering);
  }
  catch (e) {
    console.error(e);
  }
};

console.log('\n=======================================================');
console.log('[DELETE] Mock server');
console.log('---------------------------------------------------------');

testAlleEndepunkter();
