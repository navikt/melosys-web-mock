const colors = require('colors');

module.exports.printresult = res => {
  const {method, url, status, statusText} = res.response;
  console.log(`[${method.toUpperCase()}]`, url);
  console.log(status, statusText);
  console.log("-------------------------------------------------------\n");
};

module.exports.printerror = (res) => {
  const {message: errorMessage, path, response} = res;
  const {method, status, statusText} = response;

  const message = (errorMessage) ? errorMessage : 'Ukjent validering feil';
  console.error(`[${method.toUpperCase()}]`, path);
  console.error(colors.bgRed(`${status} ${statusText}`));
  console.error(message);
  console.error("-------------------------------------------------------\n");
};
