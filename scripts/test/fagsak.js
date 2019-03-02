const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const Schema = require('./schema-util');

const { lesFagsakerKatalog } = require('../modules/fagsaker');

const definitions = Schema.lesSchemaDefinitonsSync();
const schema = Schema.lesSchemaFileSync('fagsaker-schema.json');
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

