const { httpClient, printheader, printoppsummering, printerror, printresult } = require('./helpers');
const { pathObject2String } = require('../utils/pathnames');
const Katalog = require('../katalog');

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
/*

const testAlleEndepunkter = async () => {
  // Fagsaker
  await client.put('/fagsaker/4/avsluttsaksombortfalt').then(reportResult).catch(reportError);

  // Saksflyt - unntaksperioder
  await client.put('/saksflyt/unntaksperioder/4/godkjenn').then(reportResult).catch(reportError);
  await client.put('/saksflyt/unntaksperioder/4/innhentinfo').then(reportResult).catch(reportError);
  await client.put('/saksflyt/unntaksperioder/4/anmodning').then(reportResult).catch(reportError);
  await client.put('/saksflyt/anmodningsperioder/4/bestill').then(reportResult).catch(reportError);
  printoppsummering(oppsummering,'PUT')
};

testAlleEndepunkter();
*/

printheader('PUT');
const testAll = async () => {
  for (const key of Katalog.katalogMap.keys()) {
    const endepunkt = Katalog.katalogMap.get(key);
    if (endepunkt && endepunkt.put) {
      const { put: verb } = endepunkt;
      const pathname = pathObject2String(verb);
      await client.put(pathname).then(reportResult).catch(reportError);
    }
  }
  printoppsummering(oppsummering, 'PUT');
};
testAll();
