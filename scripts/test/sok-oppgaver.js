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

const testOne = (path) => {
  const tittel = Utils.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Utils.lesKatalogElement(path);
  return Utils.runTest(elem, ajv, validate);
};

const SokOppgaver = {
  testAll,
  testOne,
};
module.exports.SokOppgaver = SokOppgaver;

