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

printheader('PUT');

const testAlleEndepunkter = async () => {
  // Fagsaker
  await client.put('/fagsaker/4/avsluttsaksombortfalt').then(reportResult).catch(reportError);

  // Saksflyt - unntaksperioder
  await client.put('/saksflyt/unntaksperioder/4/godkjenn').then(reportResult).catch(reportError);
  await client.put('/saksflyt/unntaksperioder/4/innhentinfo').then(reportResult).catch(reportError);
  await client.put('/saksflyt/unntaksperioder/4/anmodning').then(reportResult).catch(reportError);
  printoppsummering(oppsummering,'PUT')
};

testAlleEndepunkter();
