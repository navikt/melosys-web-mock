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

printheader('GET');
const testAll = async () => {
  for (const key of Katalog.katalogMap.keys()) {
    const endepunkt = Katalog.katalogMap.get(key);
    if (endepunkt && endepunkt.get) {
      const { get: verb } = endepunkt;
      const pathname = pathObject2String(verb);
      console.log(pathname);
      try {
        await client.get(pathname).then(reportResult).catch(reportError);
      }
      catch (e) {
        console.error(e);
      }
    }
  }
  printoppsummering(oppsummering, 'GET');
};
testAll();
