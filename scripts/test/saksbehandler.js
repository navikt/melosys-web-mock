const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const Schema = require('./schema-util');
const { lesSaksbehandlerKatalog } = require('../modules/saksbehandler');
const { SCHEMA_DIR } = require('../../dirconfig');

const schemajson = `${SCHEMA_DIR}/saksbehandler-schema.json`;
const schema = Schema.lesSchemaSync(schemajson);
const catalog = lesSaksbehandlerKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  Schema.prettyTittel('Saksbehandler');
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const Saksbehandler = {
  testAll,
  testOne,
};
module.exports.Saksbehandler = Saksbehandler;

