const { MOCK_DATA_DIR } = require('../../mock.config');
const { httpClient, printheader, printoppsummering, printerror, printresult } = require('./helpers');
const { pathObject2String } = require('../utils/pathnames');
const Katalog = require('../katalog');
const Schema = require('../utils/schema-util');
const client = httpClient();

const lesMockPostDoc = navn => {
  const POST_MOCK_DIR = `${MOCK_DATA_DIR}/${navn}/post`;
  const katalog = Schema.lesKatalogSync(POST_MOCK_DIR);
  return katalog[0].document;
};

const testAll = async (verb, oppsummering) => {
  const reportResult = res => {
    oppsummering.success += 1;
    printresult(res);
  };

  const reportError = res => {
    oppsummering.failure += 1;
    printerror(res);
  };
  const VERB = verb.toUpperCase();
  printheader(VERB);
  for (const key of Katalog.katalogMap.keys()) {
    const endepunkt = Katalog.katalogMap.get(key);
    if (endepunkt && endepunkt[verb]) {
      const pathObject = endepunkt[verb];
      const pathname = pathObject2String(pathObject);
      try {
        if (VERB === 'POST') {
          const dokument = lesMockPostDoc(endepunkt.moduleName);
          await client.post(pathname, dokument).then(reportResult).catch(reportError);
        }
        else {
          await client[verb](pathname).then(reportResult).catch(reportError);
        }
      }
      catch (e) {
        oppsummering.failure += 1;
        console.log(e);
      }
    }
  }
  printoppsummering(oppsummering, VERB);
};
module.exports.testAll = testAll;
