const _ = require('underscore');
const URL = require('url');
const ERR = require('./errors');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const statusarray = ['PROGRESS','ERROR', 'PROGRESS', 'PROGRESS','ERROR', 'PROGRESS','PROGRESS','PROGRESS','DONE','ERROR'];

module.exports.sjekkStatus = async (req, res) => {
  const url = URL.parse(req.url);
  const journalpostID = req.params.journalpostID;
  const status = _.sample(statusarray);
  await delay(1000);
  if (status === 'ERROR') {
    const melding = ERR.serverError500(url);
    return res.status(500).send(melding);
  }
  res.status(200).json(status);
};
