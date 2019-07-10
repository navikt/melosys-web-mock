const colors = require('colors');
const axios = require('axios');

const { API_BASE_URL}  = require('../../mock.config');

module.exports.httpClient = () => {
  axios.defaults.crossdomain = true;
  axios.defaults.headers.get['Content-Type'] = 'application/json';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.delete['Content-Type'] = 'application/json';
  axios.defaults.headers.put['Content-Type'] = 'text/plain';
  return axios.create({
    baseURL: `${API_BASE_URL}`,
    timeout: 1000
  });
};

module.exports.printresult = (res) => {
  const { method, url} = res.config;
  console.log(`[${method.toUpperCase()}]`, url);
  console.log(res.status, res.statusText);
  console.log("-------------------------------------------------------\n");
};

module.exports.printerror = (res) => {
  const { request, response } = res;

  const { method, path } = request;
  const { status, statusText, data } = response;

  const message = (data && data.message) ? data.message : 'Ukjent validering feil';
  console.error(`[${method.toUpperCase()}]`, path);
  console.error(colors.bgRed(`${status} ${statusText}`));
  console.error(message);
  console.error("-------------------------------------------------------\n");
};
