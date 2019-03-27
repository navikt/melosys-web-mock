const colors = require('colors/safe');
const Schema = require('../utils/schema-util');

const { lesOrganisasjonsKatalog } = require('../modules/organisasjoner');

const catalog = lesOrganisasjonsKatalog();

const validate = Schema.schemaValidator('organisasjoner-schema.json');

const testAll = () => {
  Schema.prettyTittel('Organisasjon');
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = path => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const organisasjon = {
  testAll,
  testOne,
};
module.exports.organisasjon = organisasjon;

