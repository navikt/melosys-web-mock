const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Schema = require('./schema-util');
const { lesSokOppgaveKatalog} = require('../modules/sok-oppgaver');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/oppgaver-schema.json`;
const schema = Schema.lesSchema(schemajson);
const catalog = lesSokOppgaveKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Sok Oppgaver'));
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const SokOppgaver = {
  testAll,
  testOne,
};
module.exports.SokOppgaver = SokOppgaver;

