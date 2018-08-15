const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Utils = require('../modules/utils');
const Inngang = require('../modules/inngang');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/inngang-schema.json`;
const schema = Utils.lesSchema(schemajson);
const catalog = Inngang.lesAlleInngang();

const validate = ajv.compile(schema);


const test = () => {
  console.log(colors.blue('Inngang'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const inngang = {
  test,
};
module.exports.inngang = inngang;

