const Schema = require('../../utils/schema-util');
const { lesAnmodningsSvarKatalog } = require('../../modules/anmodningsperioder');

const validate = Schema.schemaValidator('anmodningsperiodersvar-schema.json');

const testAll = () => {
  const catalog = lesAnmodningsSvarKatalog();
  Schema.prettyTittel('Anmodningsperioder/Svar');
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const svar = {
  testAll,
  testOne,
};
module.exports.svar = svar;

