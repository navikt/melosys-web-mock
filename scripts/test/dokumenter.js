const Schema = require('../utils/schema-util');

const Dokumenter = require('../modules/dokumenter');
const catalog = Dokumenter.lesDokumenterKatalog();

const testAll = () => {
  Schema.prettyTittel('Dokumenter');
  const validate = Schema.schemaValidator('dokumenter-oversikt-schema.json');
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const dokumenter = {
  testAll,
};
module.exports.dokumenter = dokumenter;

