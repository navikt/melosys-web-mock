const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Schema = require('./schema-util');
const { lesSaksbehandlerKatalog } = require('../modules/saksbehandler');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/saksbehandler-schema.json`;
const schema = Schema.lesSchema(schemajson);
const catalog = lesSaksbehandlerKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Saksbehandler'));
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const Saksbehandler = {
  testAll,
  testOne,
};
module.exports.Saksbehandler = Saksbehandler;

