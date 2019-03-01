const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const Utils = require('./utils');
const Schema = require('../test/schema-util');
const SchemaPostValidator  = require('./schema-post-validator');
const ERR = require('./errors');

const {  SCHEMA_DIR } = require('../../dirconfig');

module.exports.status = (req, res) => {
  const schemajson = `${SCHEMA_DIR}/behandlinger-status-post-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);

  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      const melding = ERR.badRequest400(req.originalUrl, "behandlingID mangler");
      return res.status(400).send(melding);
    }
    const { body } = req;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const label = 'Behandlinger:status';
    const valid = SchemaPostValidator.test(label, schema, jsBody);

    return valid ? res.status(204).send() : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    console.log(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};

module.exports.perioder = (req, res) => {
  const schemajson = `${SCHEMA_DIR}/behandlinger-perioder-post-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);

  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      const melding = ERR.badRequest400(req.originalUrl, "behandlingID mangler");
      return res.status(400).send(melding);
    }
    const { body } = req;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const label = 'Behandlinger:perioder';

    const valid = SchemaPostValidator.test(label, schema, jsBody);
    return valid ? res.json(jsBody) : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    console.log(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};
