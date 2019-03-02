const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const Schema = require('./schema-util');

const Dokumenter = require('../modules/dokumenter');

const definitions = Schema.lesSchemaDefinitonsSync();
const schema = Schema.lesSchemaFileSync('dokumenter-oversikt-schema.json');
const catalog = Dokumenter.lesDokumenterKatalog();

const validate = ajv.addSchema(definitions).compile(schema);

const testAll = () => {
  Schema.prettyTittel('Dokumenter');
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const dokumenter = {
  testAll,
};
module.exports.dokumenter = dokumenter;

