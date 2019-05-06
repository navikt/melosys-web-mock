const colors = require('colors/safe');
const axios = require('axios');
const { printerror, printresult } = require('./helpers');

axios.defaults.headers.post['Content-Type'] = 'application/json';

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
  await instance.put('/fagsaker/4/avsluttsaksombortfalt').then(handleresult).catch(handleerror);

  console.log('[PUT]',colors.green('yarn mock:put'));
  console.dir(oppsummering);
};

console.log('\n=======================================================');
console.log('[PUT] Mock server');
console.log('---------------------------------------------------------');

testAlleEndepunkter();
