const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Schema = require('./schema-util');

const { lesOrganisasjonsKatalog } = require('../modules/organisasjoner');

const schema = Schema.lesSchemaFileSync('organisasjoner-schema.json');
const catalog = lesOrganisasjonsKatalog();

const definitions = Schema.lesSchemaDefinitonsSync();
const validate = ajv.addSchema(definitions).compile(schema);

const testAll = () => {
  Schema.prettyTittel('Organisasjon');
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const organisasjon = {
  testAll,
  testOne,
};
module.exports.organisasjon = organisasjon;

