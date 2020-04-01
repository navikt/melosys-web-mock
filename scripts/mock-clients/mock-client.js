const { MOCK_DATA_DIR } = require('../../mock.config');
const { httpClient, printheader, printoppsummering, printerror, printresult } = require('./helpers');
const { pathObject2Filename } = require('../utils/pathnames');
const Katalog = require('../katalog');
const Utils = require('../utils/utils');
const client = httpClient();

const lesMockDoc = async (dirname, verb) => {
  const MOCK_DIR = `${MOCK_DATA_DIR}/${dirname}/${verb}`;
  try {
    const exists = await Utils.existsAsync(MOCK_DIR);
    if (!exists) {
      console.log('Invalid file path:', MOCK_DIR);
      return {};
    }
    const filenames = await Utils.readDirSync(MOCK_DIR);
    const mockfile = `${MOCK_DIR}/${filenames[0]}`;
    return await Utils.readJsonAndParseAsync(mockfile);
  }
  catch (e) {
    console.log(`Reading ${verb} directory failed`, e);
  }
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
      const pathname = pathObject2Filename(pathObject);
      const config = {
        method: verb,
        url: pathname,
      };
      if (VERB === 'POST') {
        config.data = await lesMockDoc(endepunkt.moduleName, 'post');
      }
      if(VERB === 'PUT') {
        config.data = await lesMockDoc(endepunkt.moduleName, 'put');
      }
      try {
        await client(config).then(reportResult).catch(reportError);
      }
      catch (e) {
        oppsummering.failure += 1;
        console.log(e);
      }
    }
  }
  printoppsummering(oppsummering, VERB);

  if (oppsummering.failure > 0) process.exitCode = 1;
};
module.exports.testAll = testAll;
