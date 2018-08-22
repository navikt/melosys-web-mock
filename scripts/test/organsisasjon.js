const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Schema = require('./schema-util');
const { lesOrganisasjonsKatalog } = require('../modules/organisasjoner');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemapath = `${SCHEMA_DIR}/organisasjoner-schema.json`;
const schema = Schema.lesSchema(schemapath);
const catalog = lesOrganisasjonsKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Organisasjon'));
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const organisasjon = {
  testAll,
  testOne,
};
module.exports.organisasjon = organisasjon;

