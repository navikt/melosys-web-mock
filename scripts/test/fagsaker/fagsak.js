const Schema = require('../../utils/schema-util');

const Fagsaker = require('../../modules/fagsaker');
const catalog = Fagsaker.lesFagsakerKatalog();

const validate = Schema.schemaValidator('fagsaker-schema.json');

const testAll = () => {
  Schema.prettyTittel('Fagsaker Fagsak');
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = path => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const fagsak = {
  testAll,
  testOne,
};
module.exports.fagsak = fagsak;

