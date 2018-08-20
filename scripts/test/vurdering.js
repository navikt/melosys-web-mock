const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Utils = require('../modules/utils');
const Vurderinger = require('../modules/vurdering');
const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/vurdering-schema.json`;
const schema = Utils.lesSchema(schemajson);
const katalog = Vurderinger.lesVurderingsKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Vurdering'));
  katalog.forEach((elem) => Utils.runTest(elem, ajv, validate));
};

const vurdering = {
  testAll,
};
module.exports.vurdering = vurdering;

