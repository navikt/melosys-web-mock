const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');
const fs = require('fs');

const Utils = require('../modules/utils');
const Personer = require('../modules/personer');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/person-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
const catalog = Personer.lesAllePersoner();

const validate = ajv.compile(schema);


const test = () => {
  console.log(colors.blue('Person'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const person = {
  test,
};
exports.person = person;

