const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');
const fs = require('fs');

const Utils = require('../modules/utils');
const { lesFaktaavklaringKatalog } = require('../modules/faktaavklaring');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/faktaavklaring-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
const catalog = lesFaktaavklaringKatalog();

const validate = ajv.compile(schema);


const test = () => {
  console.log(colors.blue('Faktaavklaring'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const fagsak = {
  test,
};
module.exports.fagsak = fagsak;

