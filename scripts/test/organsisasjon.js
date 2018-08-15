const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Utils = require('../modules/utils');
const Organisasjoner = require('../modules/organisasjoner');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemapath = `${SCHEMA_DIR}/organisasjoner-schema.json`;
const schema = Utils.lesSchema(schemapath);
const catalog = Organisasjoner.lesAlleOrganisasjoner();

const validate = ajv.compile(schema);


const test = () => {
  console.log(colors.blue('Organisasjon'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const organisasjon = {
  test,
};
module.exports.organisasjon = organisasjon;

