const Schema = require('../../utils/schema-util');

const Fagsaker = require('../../modules/fagsaker');
const catalog = Fagsaker.lesAktoerKatalog();

const validate = Schema.schemaValidator('aktoer-schema.json');
const printTitle = () => Schema.prettyTittel('Fagsaker Aktoerer');

const testAll = () => {
  printTitle();
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = (path) => {
  printTitle();
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const aktoer = {
  testAll,
  testOne,
};
module.exports.aktoer = aktoer;
