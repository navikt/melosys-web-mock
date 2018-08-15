const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');
const fs = require('fs');

const Utils = require('../modules/utils');
const Fagsaker = require('../modules/fagsaker');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/fagsaker-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
const catalog = Fagsaker.lesAlleFagsaker();

const validate = ajv.compile(schema);


const test = () => {
  console.log(colors.blue('Fagsak'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const fagsak = {
  test,
};
module.exports.fagsak = fagsak;

