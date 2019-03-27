const Schema = require('../utils/schema-util');
const Vilkarer = require('../modules/vilkar');

const katalog = Vilkarer.lesVilkarsKatalog();

const validate = Schema.schemaValidator('vilkar-schema.json');

const testAll = () => {
  Schema.prettyTittel('Vilkar');
  katalog.forEach((elem) => Schema.runTest(elem, validate));
};

const testOne = path => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const vilkar = {
  testAll,
  testOne,
};
module.exports.vilkar = vilkar;

