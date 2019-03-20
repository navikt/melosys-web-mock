// const URL = require('url');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const Utils = require('../utils/utils');

module.exports.unntaksperioder = (req, res) => {
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const label = "Registring:unntaksperioder";
  logger.debug(`${label}`, body);
  res.json(jsBody);
  /*
  try {
    const valid = SchemaPostValidator.test(label, schema, jsBody);

    return valid ? res.json(body) : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    console.log(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
  */
};
