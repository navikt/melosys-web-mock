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

printheader('DELETE');
const testAll = async () => {
  for (const key of Katalog.katalogMap.keys()) {
    const endepunkt = Katalog.katalogMap.get(key);
    if (endepunkt && endepunkt.delete) {
      const { delete: verb } = endepunkt;
      const pathname = pathObject2String(verb);
      try {
        await client.delete(pathname).then(reportResult).catch(reportError);
      }
      catch (e) {
        console.log(e);
      }
    }
  }
  printoppsummering(oppsummering, 'DELETE');
};
testAll();
