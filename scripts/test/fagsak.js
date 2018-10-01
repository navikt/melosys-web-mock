const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Schema = require('./schema-util');
const { lesFagsakerKatalog } = require('../modules/fagsaker');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/fagsaker-schema.json`;
const schema = Schema.lesSchemaSync(schemajson);
const catalog = lesFagsakerKatalog();

const validate = ajv.compile(schema);

const testAll = () => {
  console.log(colors.blue('Fagsak'));
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const fagsak = {
  testAll,
  testOne,
};
module.exports.fagsak = fagsak;

