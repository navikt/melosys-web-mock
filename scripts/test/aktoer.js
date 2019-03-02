const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const { SCHEMA_DIR } = require('../../mock.config');
const Schema = require('./schema-util');
const { lesAktoerKatalog } = require('../modules/aktoer');
const definitionsPath = `${SCHEMA_DIR}/definitions-schema.json`;
const definitions = Schema.lesSchemaSync(definitionsPath);
const schemajson = `${SCHEMA_DIR}/aktoer-schema.json`;
const schema = Schema.lesSchemaSync(schemajson);

const catalog = lesAktoerKatalog();

const validate = ajv.addSchema(definitions).compile(schema);
const printTitle = () => Schema.prettyTittel('Aktoer');

const testAll = () => {
  printTitle();
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  printTitle();
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const aktoer = {
  testAll,
  testOne,
};
module.exports.aktoer = aktoer;
