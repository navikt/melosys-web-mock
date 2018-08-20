const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Utils = require('../modules/utils');
const { lesFaktaavklaringKatalog } = require('../modules/faktaavklaring');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemapath = `${SCHEMA_DIR}/faktaavklaring-schema.json`;
const schema = Utils.lesSchema(schemapath);

const catalog = lesFaktaavklaringKatalog();

const validate = ajv.compile(schema);


const test = () => {
  console.log(colors.blue('Faktaavklaring'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const faktaavklaring = {
  test,
};
module.exports.faktaavklaring = faktaavklaring;

