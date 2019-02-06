const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const Schema = require('./schema-util');
const { lesPersonKatalog } = require('../modules/personer');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const definitionsPath = `${SCHEMA_DIR}/definitions-schema.json`;
const definitions = Schema.lesSchemaSync(definitionsPath);
const schemajson = `${SCHEMA_DIR}/person-schema.json`;
const schema = Schema.lesSchemaSync(schemajson);

const catalog = lesPersonKatalog();

const validate = ajv.addSchema(definitions).compile(schema);

const testAll = () => {
  Schema.prettyTittel('Person');
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};
const testOne = (path) => {
  Schema.prettyTittel('Person');
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const person = {
  testAll,
  testOne,
};
module.exports.person = person;

