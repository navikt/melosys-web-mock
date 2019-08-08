const { MOCK_DATA_DIR } = require('../../mock.config');
const { httpClient, printheader, printoppsummering, printerror, printresult } = require('./helpers');
const { pathObject2Filename } = require('../utils/pathnames');
const Katalog = require('../katalog');
const Utils = require('../utils/utils');
const client = httpClient();

const lesMockPostDoc = async dirname => {
  const POST_MOCK_DIR = `${MOCK_DATA_DIR}/${dirname}/post`;
  try {
    const exists = await Utils.existsAsync(POST_MOCK_DIR);
    if (!exists) {
      console.log('Invalid file path:', POST_MOCK_DIR);
      return {};
    }
    const filenames = await Utils.readDirSync(POST_MOCK_DIR);
    const mockfile = `${POST_MOCK_DIR}/${filenames[0]}`;
    const jsondata = await Utils.readJsonAndParseAsync(mockfile);
    return jsondata;
  }
  catch (e) {
    console.log('Reading POST directory failed', e);
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
        const document = await lesMockPostDoc(endepunkt.moduleName);
        config.data = document;
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
};
module.exports.testAll = testAll;
