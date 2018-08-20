const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Utils = require('../modules/utils');
const { lesOppgaveKatalog } = require('../modules/oppgaver');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/oppgaver-schema.json`;
const schema = Utils.lesSchema(schemajson);

const catalog = lesOppgaveKatalog();
const validate = ajv.compile(schema);

const testAll = () => {
  console.log(colors.blue('Oppgaver'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const oppgaver = {
  testAll,
};
module.exports.oppgaver = oppgaver;
