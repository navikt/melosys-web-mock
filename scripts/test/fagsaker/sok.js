const Schema = require('../../utils/schema-util');

const { lesSokFagsakerKatalog } = require('../../modules/fagsaker');

const catalog = lesSokFagsakerKatalog();
const validate = Schema.schemaValidator('sok-fagsaker-schema.json');

const testAll = () => {
  Schema.prettyTittel('Fagsaker Sok');
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const sok = {
  testAll,
  testOne,
};
module.exports.sok = sok;

