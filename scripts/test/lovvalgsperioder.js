const Schema = require('../utils/schema-util');
const Lovvalgsperioder = require('../modules/lovvalgsperioder');

const katalog = Lovvalgsperioder.lesLovvalgsperiodersKatalog();

const validate = Schema.schemaValidator('lovvalgsperioder-schema.json');

const testAll = () => {
  Schema.prettyTittel('Lovvalgsperioder');
  katalog.forEach((elem) => Schema.runTest(elem, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const lovvalgsperioder = {
  testAll,
  testOne,
};
module.exports.lovvalgsperioder = lovvalgsperioder;

