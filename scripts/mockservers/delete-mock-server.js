const colors = require('colors/safe');
const axios = require('axios');
const { printerror, printresult } = require('./helpers');

axios.defaults.headers.delete['Content-Type'] = 'application/json';

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
    const databaseid = 955006279357058;
    await instance.delete(`/fagsaker/aktoerer/${databaseid}`).then(handleresult).catch(handleerror);
    const saksnummer = '4', juridiskorgnr = '810072512';
    await instance.delete(`/fagsaker/${saksnummer}/kontaktopplysninger/${juridiskorgnr}`).then(handleresult).catch(handleerror);

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
