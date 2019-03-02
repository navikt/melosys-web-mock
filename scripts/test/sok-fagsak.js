const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const { SCHEMA_DIR } = require('../../mock.config');
const Schema = require('./schema-util');

const { lesSokFagsakerKatalog } = require('../modules/sok-fagsaker');

const schemajson = `${SCHEMA_DIR}/sok-fagsaker-schema.json`;
const definitionsPath = `${SCHEMA_DIR}/definitions-schema.json`;
const definitions = Schema.lesSchemaSync(definitionsPath);

const schema = Schema.lesSchemaSync(schemajson);
const catalog = lesSokFagsakerKatalog();

const validate = ajv.addSchema(definitions).compile(schema);


const testAll = () => {
  Schema.prettyTittel('Sok Fagsak');
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const SokFagsak = {
  testAll,
  testOne,
};
module.exports.SokFagsak = SokFagsak;

