const colors = require('colors/safe');
const axios = require('axios');

axios.defaults.headers.post['Content-Type'] = 'application/json';

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
  await instance.put('/fagsaker/4/avsluttsaksombortfalt').then(printresult).catch(printerror);

  console.log('[PUT]',colors.green('yarn mock:put'));
  console.dir(oppsummering);
};

console.log('\n=======================================================');
console.log('[PUT] Mock server');
console.log('---------------------------------------------------------');

testAlleEndepunkter();
