const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const Schema = require('./schema-util');
const { lesFagsakerKatalog } = require('../modules/fagsaker');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const definitionsPath = `${SCHEMA_DIR}/definitions-schema.json`;
const definitions = Schema.lesSchemaSync(definitionsPath);

const schemajson = `${SCHEMA_DIR}/fagsaker-schema.json`;
const schema = Schema.lesSchemaSync(schemajson);
const catalog = lesFagsakerKatalog();

const validate = ajv.addSchema(definitions).compile(schema);

const testAll = () => {
  Schema.prettyTittel('Fagsak');
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const fagsak = {
  testAll,
  testOne,
};
module.exports.fagsak = fagsak;

