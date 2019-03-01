const log4js = require('log4js');
const logger = log4js.getLogger('mock');
/*
const URL = require('url');

const Utils = require('./utils');
const Schema = require('../test/schema-util');
const ERR = require('./errors');

const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const KONTAKTOPPLYSNINGER_DATA_DIR = `${MOCK_DATA_DIR}/aktoer`;
*/
module.exports.send = (req, res) => {
  const body = req.body;
  // const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const { saksnummer, orgnr } = req.params;
  const label = "Kontaktopplysninger:Send";
  console.log(`${label}`, body);
  console.log('saksnummer', saksnummer, 'orgnr', orgnr);
  logger.debug(`${label}`, body);
  res.json(body)
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
