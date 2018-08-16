const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Utils = require('../modules/utils');
const { lesSoknadKatalog } = require('../modules/soknader');
const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/soknad-schema.json`;
const schema = Utils.lesSchema(schemajson);
const katalog = lesSoknadKatalog();

const validate = ajv.compile(schema);

const test = () => {
  console.log(colors.blue('Soknad'));
  katalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const soknad = {
  test,
};
module.exports.soknad = soknad;

