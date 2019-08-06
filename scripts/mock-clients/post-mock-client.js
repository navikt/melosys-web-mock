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
/*
const pathname2String = (pathname, params) => {
  if (pathname.indexOf(':') === -1) return pathname;
  const paths = pathname.split('/');
  let path = paths.shift();
  paths.forEach(item => {
    if (item.startsWith(':')) {
      const param = params[item.slice(1)];
      path += `/${param}`;
    }
    else {
      const param = params[item] ? params[item] : item;
      path += `/${param}`;
    }
  });
  return path;
};
const pathObject2String = pathobject => {
  const { pathname, params } = pathobject;
  const queryStartIndex = pathname.indexOf('?');
  if (queryStartIndex > 0) {
    const path = pathname.substring(0, queryStartIndex);
    const queryString = pathname.substr(queryStartIndex);
    return pathname2String(path, params) + queryString;
  }
  return pathname2String(pathname, params);
};
*/
const testAll = async () => {
  for (const key of Katalog.katalogMap.keys()) {
    const endepunkt = Katalog.katalogMap.get(key);
    if (endepunkt && endepunkt.post) {
      const { moduleName: navn, post } = endepunkt;
      //console.log(navn, post);

      const POST_MOCK_DIR = `${MOCK_DATA_DIR}/${navn}/post`;
      console.log(POST_MOCK_DIR);
      const katalog = Schema.lesKatalogSync(POST_MOCK_DIR);
      const document = katalog[0].document;
      const pathname = pathObject2String(post);
      // console.log('post',pathname);
      // console.log(JSON.stringify(document, null, 2));
      // console.log();
      await client.post(pathname, document).then(reportResult).catch(reportError);
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
