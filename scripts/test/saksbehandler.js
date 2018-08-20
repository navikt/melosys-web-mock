const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');
const fs = require('fs');

const Utils = require('../modules/utils');
const { lesSaksbehandlerKatalog } = require('../modules/saksbehandler');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/saksbehandler-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
const catalog = lesSaksbehandlerKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Saksbehandler'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const Saksbehandler = {
  testAll,
};
module.exports.Saksbehandler = Saksbehandler;

