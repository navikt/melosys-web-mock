const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');
const fs = require('fs');

const Utils = require('../modules/utils');
const SokFagsaker = require('../modules/sok-fagsaker');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/sok-fagsaker-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
const catalog = SokFagsaker.lesAlleSokFagsaker();

const validate = ajv.compile(schema);


const test = () => {
  console.log(colors.blue('Sok Fagsak'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const SokFagsak = {
  test,
};
exports.SokFagsak = SokFagsak;

