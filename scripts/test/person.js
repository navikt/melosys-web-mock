const Schema = require('../utils/schema-util');

const { lesPersonKatalog } = require('../modules/personer');

const catalog = lesPersonKatalog();

const validate = Schema.schemaValidator('person-schema.json');

const testAll = () => {
  Schema.prettyTittel('Person');
  catalog.forEach(elem => Schema.runTest(elem, validate));
};
const testOne = (path) => {
  Schema.prettyTittel('Person');
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const person = {
  testAll,
  testOne,
};
module.exports.person = person;

