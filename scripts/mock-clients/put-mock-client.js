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
  // Fagsaker
  await client.put('/fagsaker/4/avsluttsaksombortfalt').then(reportResult).catch(reportError);

  // Saksflyt - unntaksperioder
  await client.put('/saksflyt/unntaksperioder/4/godkjenn').then(reportResult).catch(reportError);
  await client.put('/saksflyt/unntaksperioder/4/innhentinfo').then(reportResult).catch(reportError);
  await client.put('/saksflyt/unntaksperioder/4/anmodning').then(reportResult).catch(reportError);

  console.log('[PUT]',colors.green('yarn mock:put'));
  console.dir(oppsummering);
};

console.log('\n=======================================================');
console.log('[PUT] Mock client');
console.log('---------------------------------------------------------');

testAlleEndepunkter();
