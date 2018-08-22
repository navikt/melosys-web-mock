const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Schema = require('./schema-util');
const Vurderinger = require('../modules/vurdering');
const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/vurdering-schema.json`;
const schema = Schema.lesSchema(schemajson);
const katalog = Vurderinger.lesVurderingsKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Vurdering'));
  katalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};
const vurdering = {
  testAll,
  testOne,
};
module.exports.vurdering = vurdering;

