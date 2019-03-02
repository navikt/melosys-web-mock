const URL = require('url');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const ERR = require('./errors');
const Utils = require('./utils');
const Schema = require('../test/schema-util');

const SchemaPostValidator  = require('./schema-post-validator');

module.exports.fattet = (req, res) => {
  const schema = Schema.lesSchemaFileSync('vedtak-post-schema.json')

  const url = URL.parse(req.url);
  const body = req.body;
  const label = 'Vedtak:fattet';

  try {
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = SchemaPostValidator.test(label, schema, jsBody);
    return valid ? res.status(204).send() : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(url, err);
    res.status(500).send(melding);
  }
};

module.exports.endreperiode = (req, res) => {
  const schema = Schema.lesSchemaFileSync('vedtak-endre-periode-schema.json')

  const url = URL.parse(req.url);
  const body = req.body;
  const label = 'Vedtak:endre';

  try {
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = SchemaPostValidator.test(label, schema, jsBody);
    return valid ? res.status(204).send() : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(url, err);
    res.status(500).send(melding);
  }
};
