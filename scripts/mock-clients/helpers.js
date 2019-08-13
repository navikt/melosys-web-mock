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
    timeout: 1000,
    proxy: false,
  });
};

module.exports.printheader = method => {
  console.log('\n');
  console.log('=======================================================');
  console.log(`[${method.toUpperCase()}] Mock client`);
  console.log("-------------------------------------------------------");
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

module.exports.printoppsummering = (oppsummering, method) => {
  console.log(`[${method.toUpperCase()}]`, colors.green(`yarn mock:${method.toLowerCase()}`));
  const successText = `Success: ${colors.green(oppsummering.success)}`;
  let failureText = oppsummering.failure > 0 ? `Failure: ${colors.bgRed(oppsummering.failure)}`: `Failure: ${colors.white(oppsummering.failure)}`;
  console.log(`{ ${successText}, ${failureText} }`);
};
