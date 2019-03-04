const URL = require('url');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const ERR = require('../utils/errors');
const Utils = require('../utils/utils');
const Schema = require('../utils/schema-util');

const SchemaPostValidator  = require('./schema-post-validator');

const postValidator = (req, res, label, schema) => {
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const valid = SchemaPostValidator.test(label, schema, jsBody);
  return valid ? res.status(204).send() : SchemaPostValidator.valideringFeil(req, res);
};

module.exports.fattet = (req, res) => {
  const url = URL.parse(req.url);
  const schema = Schema.lesSchemaFileSync('vedtak-post-schema.json');

  const label = 'Vedtak:fattet';
  try {
    postValidator(req, res, label, schema)
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(url, err);
    res.status(500).send(melding);
  }
};

module.exports.endreperiode = (req, res) => {
  const schema = Schema.lesSchemaFileSync('vedtak-endre-periode-schema.json');
  const url = URL.parse(req.url);
  const label = 'Vedtak:endre';

  try {
    postValidator(req, res, label, schema);
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(url, err);
    res.status(500).send(melding);
  }
};
