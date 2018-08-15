const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');
const fs = require('fs');

const Utils = require('../modules/utils');
const saksbehandler = require('../modules/saksbehandler');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/saksbehandler-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
const catalog = saksbehandler.lesAlleSaksbehandlere();

const validate = ajv.compile(schema);


const test = () => {
  console.log(colors.blue('Saksbehandler'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const Saksbehandler = {
  test,
};
exports.Saksbehandler = Saksbehandler;

