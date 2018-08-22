/*
module.exports.trace = (req, res) => {
  const body = req.body;
  //const jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  console.trace(body);
  res.status(200).send('OK');
};
module.exports.debug = (req, res) => {
  const body = req.body;
  //const jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  console.debug(body);
  res.status(200).send('OK');
};
*/
const logmerge = (loglevel, body) => ({ loglevel, timestamp: new Date().toISOString(), ...body});
module.exports.info = (req, res) => {
  const body = req.body;
  console.info(logmerge('info', body));
  res.status(200).send('OK');
};
module.exports.warn = (req, res) => {
  const body = req.body;
  console.warn(logmerge('warn', body));
  res.status(200).send('OK');
};
module.exports.error = (req, res) => {
  const body = req.body;
  console.error(logmerge('error', body));
  res.status(200).send('OK');
};
