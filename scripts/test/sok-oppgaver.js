const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Utils = require('../modules/utils');
const { lesSokOppgaveKatalog} = require('../modules/sok-oppgaver');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/sok-oppgaver-schema.json`;
const schema = Utils.lesSchema(schemajson);
const catalog = lesSokOppgaveKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Sok Oppgaver'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const SokOppgaver = {
  testAll,
};
module.exports.SokOppgaver = SokOppgaver;

