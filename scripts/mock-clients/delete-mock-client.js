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

printheader('DELETE');

const testAlleEndepunkter = async () => {
  try {
    const databaseid = 955006279357058;
    await client.delete(`/fagsaker/aktoerer/${databaseid}`).then(reportResult).catch(reportError);
    const saksnummer = '4', juridiskorgnr = '810072512';
    await client.delete(`/fagsaker/${saksnummer}/kontaktopplysninger/${juridiskorgnr}`).then(reportResult).catch(reportError);

    printoppsummering(oppsummering, 'DELETE');
  }
  catch (e) {
    console.error(e);
  }
};

testAlleEndepunkter();
