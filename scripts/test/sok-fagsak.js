const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const Schema = require('../utils/schema-util');

const { lesSokFagsakerKatalog } = require('../modules/fagsaker/sok');

const definitions = Schema.lesSchemaDefinitonsSync();

const schema = Schema.lesSchemaFileSync('sok-fagsaker-schema.json');
const catalog = lesSokFagsakerKatalog();

const validate = ajv.addSchema(definitions).compile(schema);


const testAll = () => {
  Schema.prettyTittel('Sok Fagsak');
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const SokFagsak = {
  testAll,
  testOne,
};
module.exports.SokFagsak = SokFagsak;

