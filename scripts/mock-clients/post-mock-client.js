const { MOCK_DATA_DIR } = require('../../mock.config');
const { httpClient, printheader, printoppsummering, printerror, printresult } = require('./helpers');
const { pathObject2String } = require('../utils/pathnames');
const Schema = require('../utils/schema-util');
const client = httpClient();
const Katalog = require('../katalog');
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

printheader('POST');
const testAll = async () => {
  for (const key of Katalog.katalogMap.keys()) {
    const endepunkt = Katalog.katalogMap.get(key);
    if (endepunkt && endepunkt.post) {
      const { moduleName: navn, post } = endepunkt;

      const POST_MOCK_DIR = `${MOCK_DATA_DIR}/${navn}/post`;
      console.log(POST_MOCK_DIR);
      const katalog = Schema.lesKatalogSync(POST_MOCK_DIR);
      const document = katalog[0].document;
      const pathname = pathObject2String(post);
      try {
        await client.post(pathname, document).then(reportResult).catch(reportError);
      }
      catch (e) {
        console.log(e);
      }
    }
  }
  printoppsummering(oppsummering, 'POST');
};
testAll();

/*
PUT vs POST for Creation
In short, favor using POST for resource creation.
Otherwise, use PUT when the client is in charge of deciding which URI (via it's resource name or ID) the new resource will have:
if the client knows what the resulting URI (or resource ID) will be,
use PUT at that URI. Otherwise, use POST when the server or service is in charge of deciding the URI for the newly-created resource.
In other words, when the client doesn't (or shouldn't) know what the resulting URI will be before creation,
use POST to create the new resource.
 */
