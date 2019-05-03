const Schema = require('../utils/schema-util');
const OpprinneligLovvalgsperiode = require('../modules/opprinneligLovvalgsperiode');
const katalog = OpprinneligLovvalgsperiode.lesOpprinneligLovvalgsPeriodeKatalog();
const validate = Schema.schemaValidator('opprinneligLovvalgsperiode-schema.json');

const testAll = () => {
  Schema.prettyTittel('OpprinneligLovvalgsperiode');
  katalog.forEach((elem) => Schema.runTest(elem, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const opprinneligLovvalgsperiode = {
  testAll,
  testOne,
};
module.exports.opprinneligLovvalgsperiode = opprinneligLovvalgsperiode;
