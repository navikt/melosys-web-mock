const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const { SCHEMA_DIR } = require('../../mock.config');
const Schema = require('./schema-util');

const { lesOrganisasjonsKatalog } = require('../modules/organisasjoner');

const schemapath = `${SCHEMA_DIR}/organisasjoner-schema.json`;
const schema = Schema.lesSchemaSync(schemapath);
const catalog = lesOrganisasjonsKatalog();

const definitionsPath = `${SCHEMA_DIR}/definitions-schema.json`;
const definitions = Schema.lesSchemaSync(definitionsPath);
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

