const fetch = require('node-fetch');

const toJsonExtended = async (fetchResponse, method, url) => {
  const contentType = fetchResponse.headers.get('content-type');
  const {
    ok, status, statusText, redirected,
  } = fetchResponse;

  const response = {
    ok,
    method,
    url,
    status,
    statusText,
    redirected,
    contentType,
  };
  if (!fetchResponse.ok) {
    const err = await fetchResponse.json();
    throw {
      ...err,
      response,
    };
  }
  else if (!contentType) {
    return {
      res: {},
      response,
    };
  }
  else if (contentType && contentType.startsWith('text')) {
    const txt = await fetchResponse.text();
    return {
      text: txt,
      response,
    };
  } else if (contentType && contentType.startsWith('application/json')) {
    const res = await fetchResponse.json();
    return {
      ...res,
      response,
    };
  } else if (contentType && contentType.startsWith('application/pdf')) {
    const res = await fetchResponse.blob();
    return {
      ...res,
      response,
    };
  }
  return fetchResponse;
};

const fetchToJson = async (url, config = {}) => {

  const fetchResponse = await fetch(url, config);

  return toJsonExtended(fetchResponse, config.method, url);
};

const methodToJson = (method, url, data, accept = 'application/json') => {
  const headers = {
    Accept: accept,
    'Accept-Charset': 'UTF-8',
    //'Content-Type': 'application/json',
    // 'Cache-control': 'no-store, must-revalidate, no-cache, max-age=0',
    // Expires: 'Mon, 01 Jan 1990 00:00:00 GMT',
    // Pragma: 'no-cache',
    // Origin: window.location.origin, // Set by fetch() automagically
    // 'Access-Control-Request-Method': method, // Kun ved preflight
  };

  const fetchConfig = {
    // body: below, for POST, PUT
    credentials: 'include', // *same-origin, include, omit; NB! MUST use 'include' to pass fetchConfig to fetch(),
    cache: 'no-cache', // *default, no-cache, force-cache, only-if-cached
    headers,
    method, // *GET, POST, ....
    mode: 'same-origin', // *same-origin, no-cors, cors
    redirect: 'follow', // *manual, follow, error
    // referrer: // *client, no-referrer
  };

  const httpVerbsWithBody = ['POST', 'PUT'];
  if (httpVerbsWithBody.includes(method)) {
    fetchConfig.body = JSON.stringify(data);
    fetchConfig.headers['content-type'] = 'application/json';
  }
  else {
    fetchConfig.body = null;
    fetchConfig.size = 0;
  }

  return fetchToJson(url, fetchConfig);
};

const methodToText = (method, url, data) => {
  const headers = {
    Accept: 'text/plain',
    'Accept-Charset': 'UTF-8',
    // 'Cache-control': 'no-store, must-revalidate, no-cache, max-age=0',
    // Expires: 'Mon, 01 Jan 1990 00:00:00 GMT',
    // Pragma: 'no-cache',
    // Origin: window.location.origin, // Set by fetch() automagically
    // 'Access-Control-Request-Method': method, // Kun ved preflight
  };

  const fetchConfig = {
    // body: below, for POST, PUT
    credentials: 'include', // *same-origin, include, omit; NB! MUST use 'include' to pass fetchConfig to fetch(),
    cache: 'no-cache', // *default, no-cache, force-cache, only-if-cached
    headers,
    method, // *GET, POST, ....
    mode: 'same-origin', // *same-origin, no-cors, cors
    redirect: 'follow', // *manual, follow, error
    // referrer: // *client, no-referrer
  };

  const httpVerbsWithBody = ['POST', 'PUT'];
  if (httpVerbsWithBody.includes(method)) {
    fetchConfig.body = data;
    fetchConfig.headers['content-type'] = 'text/plain';
  }

  return fetchToJson(url, fetchConfig);
};

module.exports.deleteAsJson = url => methodToJson('DELETE', url, null);
module.exports.getAsJson = url => methodToJson('GET', url, null);

// [post|put]AsJson, data MUST be a valid JSON object, ie. {} or []. Cannot be a empty "" string.
module.exports.postAsJson = (url, data = {}) => methodToJson('POST', url, data);
module.exports.postAsJsonReceiveAsPDF = (url, data = {}) => methodToJson('POST', url, data, 'application/pdf');
// putAsText, data can be empty string.
module.exports.putAsText = (url, data = '') => methodToText('PUT', url, data);

