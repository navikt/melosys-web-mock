const colors = require('colors/safe');

const { putAsText} = require('./http-client-api');
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
const put = url => {
  const URL_PUT = `${API_BASE_URL}${url}`;
  return putAsText(URL_PUT);
};

const testAlleEndepunkter = () => {
  // Fagsaker
  put('/fagsaker/4/avsluttsaksombortfalt').then(reportResult).catch(reportError);

  // Saksflyt - unntaksperioder
  put('/saksflyt/unntaksperioder/4/godkjenn').then(reportResult).catch(reportError);
  put('/saksflyt/unntaksperioder/4/innhentinfo').then(reportResult).catch(reportError);
  put('/saksflyt/unntaksperioder/4/anmodning').then(reportResult).catch(reportError);

  console.log('[PUT]',colors.green('yarn mock:put'));
  console.dir(oppsummering);
};

console.log('\n=======================================================');
console.log('[PUT] Mock server');
console.log('---------------------------------------------------------');

testAlleEndepunkter();
