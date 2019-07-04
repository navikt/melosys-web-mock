const Schema = require('../utils/schema-util');
const { lesSoknadKatalog } = require('../modules/soknader');

const katalog = lesSoknadKatalog();

const validate = Schema.schemaValidator('soknad-schema.json');

const testAll = () => {
  Schema.prettyTittel('Soknad');
  katalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = path => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const soknad = {
  testAll,
  testOne,
};
module.exports.soknad = soknad;

