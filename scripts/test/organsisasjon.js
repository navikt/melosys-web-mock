const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Utils = require('../modules/utils');
const { lesOrganisasjonsKatalog } = require('../modules/organisasjoner');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemapath = `${SCHEMA_DIR}/organisasjoner-schema.json`;
const schema = Utils.lesSchema(schemapath);
const catalog = lesOrganisasjonsKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Organisasjon'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Utils.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Utils.lesKatalogElement(path);
  return Utils.runTest(elem, ajv, validate);
};

const organisasjon = {
  testAll,
  testOne,
};
module.exports.organisasjon = organisasjon;

