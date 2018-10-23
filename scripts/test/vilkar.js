const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Schema = require('./schema-util');
const Vilkarer = require('../modules/vilkar');
const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/vilkar-schema.json`;
const schema = Schema.lesSchemaSync(schemajson);
const katalog = Vilkarer.lesVilkarsKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Vilkar'));
  katalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const vilkar = {
  testAll,
  testOne,
};
module.exports.vilkar = vilkar;

