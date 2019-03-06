const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const Schema = require('../../utils/schema-util');
const definitions = Schema.lesSchemaDefinitonsSync();
const schema = Schema.lesSchemaFileSync('aktoer-schema.json');

const Fagsaker = require('../../modules/fagsaker');
const catalog = Fagsaker.lesAktoerKatalog();

const validate = ajv.addSchema(definitions).compile(schema);
const printTitle = () => Schema.prettyTittel('Fagsaker Aktoerer');

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