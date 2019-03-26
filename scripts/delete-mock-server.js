const colors = require('colors/safe');
const axios = require('axios');
axios.defaults.headers.delete['Content-Type'] = 'application/json';

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
    const databaseid = 955006279357058;
    await instance.delete(`/fagsaker/aktoerer/${databaseid}`).then(printresult).catch(printerror);
    const saksnummer = '4', juridiskorgnr = '810072512';
    await instance.delete(`/fagsaker/${saksnummer}/kontaktopplysninger/${juridiskorgnr}`).then(printresult).catch(printerror);

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
