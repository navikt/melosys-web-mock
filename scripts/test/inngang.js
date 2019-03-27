const Schema = require('../utils/schema-util');

const { lesInngangKatalog } = require('../modules/inngang');

const catalog = lesInngangKatalog();
const validate = Schema.schemaValidator('inngang-schema.json');

const testAll = () => {
  Schema.prettyTittel('Inngang');
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = path => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const inngang = {
  testAll,
  testOne,
};
module.exports.inngang = inngang;

