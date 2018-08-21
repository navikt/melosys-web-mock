const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Utils = require('../modules/utils');
const { lesPersonKatalog } = require('../modules/personer');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/person-schema.json`;
const schema = Utils.lesSchema(schemajson);

const catalog = lesPersonKatalog();

const validate = ajv.compile(schema);

const testAll = () => {
  console.log(colors.blue('Person'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};
const testOne = (path) => {
  console.log(colors.blue('Person'));
  const elem = Utils.lesKatalogElement(path);
  return Utils.runTest(elem, ajv, validate);
};

const person = {
  testAll,
  testOne,
};
module.exports.person = person;

