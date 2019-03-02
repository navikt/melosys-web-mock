const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const { SCHEMA_DIR } = require('../../mock.config');
const Schema = require('./schema-util');

const Dokumenter = require('../modules/dokumenter');

const definitionsPath = `${SCHEMA_DIR}/definitions-schema.json`;
const definitions = Schema.lesSchemaSync(definitionsPath);
const schemajson = `${SCHEMA_DIR}/dokumenter-oversikt-schema.json`;
const schema = Schema.lesSchemaSync(schemajson);
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

