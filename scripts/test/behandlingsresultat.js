const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Schema = require('./schema-util');
const { lesBehandlingsresultatKatalog } = require('../modules/behandlingsresultat');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const definitionsPath = `${SCHEMA_DIR}/definitions-schema.json`;
const definitions = Schema.lesSchemaSync(definitionsPath);

const schemajson = `${SCHEMA_DIR}/behandlingsresultat-schema.json`;
const schema = Schema.lesSchemaSync(schemajson);
const catalog = lesBehandlingsresultatKatalog();

const validate = ajv.addSchema(definitions).compile(schema);

const testAll = () => {
  console.log(colors.blue('Behandlingsresultat'));
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const behandlingsresultat = {
  testAll,
  testOne,
};
module.exports.behandlingsresultat = behandlingsresultat;
