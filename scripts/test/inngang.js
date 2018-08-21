const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Utils = require('../modules/utils');
const { lesInngangKatalog } = require('../modules/inngang');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/inngang-schema.json`;
const schema = Utils.lesSchema(schemajson);
const catalog = lesInngangKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Inngang'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Utils.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Utils.lesKatalogElement(path);
  return Utils.runTest(elem, ajv, validate);
};

const inngang = {
  testAll,
  testOne,
};
module.exports.inngang = inngang;

