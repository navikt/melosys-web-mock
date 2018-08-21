const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');
const fs = require('fs');

const Utils = require('../modules/utils');
const { lesFagsakerKatalog } = require('../modules/fagsaker');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/fagsaker-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
const catalog = lesFagsakerKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Fagsak'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Utils.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Utils.lesKatalogElement(path);
  return Utils.runTest(elem, ajv, validate);
};

const fagsak = {
  testAll,
  testOne,
};
module.exports.fagsak = fagsak;

