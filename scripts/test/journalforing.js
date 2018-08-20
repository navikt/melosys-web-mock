const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Utils = require('../modules/utils');
const { lesJournalforingKatalog } = require('../modules/journalforing');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/person-schema.json`;
const schema = Utils.lesSchema(schemajson);
const catalog = lesJournalforingKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Journalforing'));
  catalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const journalforing = {
  testAll,
};
module.exports.journalforing = journalforing;

