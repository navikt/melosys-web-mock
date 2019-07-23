const Schema = require('../../utils/schema-util');
const Anmodningsperioder = require('../../modules/anmodningsperioder');

const validate = Schema.schemaValidator('anmodningsperioder-get-schema.json');

const testAll = () => {
  const catalog = Anmodningsperioder.lesAnmodningsKatalog();
  Schema.prettyTittel('Anmodningsperioder');
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const anmodningsperioder = {
  testAll,
  testOne,
};
module.exports.anmodningsperioder = anmodningsperioder;

