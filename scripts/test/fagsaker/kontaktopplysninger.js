const Schema = require('../../utils/schema-util');

const Fagsaker = require('../../modules/fagsaker');
const catalog = Fagsaker.lesKontaktopplysningerKatalog();

const validate = Schema.schemaValidator('kontaktopplysninger-schema.json');

const printTitle = () => Schema.prettyTittel('Fagsaker Kontaktopplysninger');

const testAll = () => {
  printTitle();
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = path => {
  printTitle();
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const kontaktopplysninger = {
  testAll,
  testOne,
};
module.exports.kontaktopplysninger = kontaktopplysninger;
