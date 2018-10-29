const Ajv = require('ajv');
const colors = require('colors/safe');

const Schema = require('./schema-util');
const { lesOppgaveKatalog } = require('../modules/oppgaver');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const definitionsPath = `${SCHEMA_DIR}/definitions-schema.json`;
const definitions = Schema.lesSchemaSync(definitionsPath);

const catalog = lesOppgaveKatalog();
/*
  Default system er 1 schema og N mock-data filer.
  I og med at oppgaver har 2 mock data filer med forskjellig struktur, så må nytt schema tilordnes og kompileres.
  mock_data/oppgaver/
  oversikt.json => oppgaver-oversikt-schema.json
  tilbakelegge.json => oppgaver-tilbakelegge-schema.json
  MAO, benytter navnet fra mock_data filen som en en del av schema navnet og konvensjon.
  mock_oppgaver/sok/fnr-*.json => oppgaver-oversikt-schema.json, NB! Renamed from oppgaver-schema.json
 */
const testAll = () => {
  console.log(colors.blue('Oppgaver'));
  catalog.forEach((elem) => {
    const { navn } = elem;
    const fornavn = navn.split('.')[0];
    const schemajson = `${SCHEMA_DIR}/oppgaver-${fornavn}-schema.json`;
    const schema = Schema.lesSchemaSync(schemajson);
    const ajv = new Ajv({allErrors: true});
    const validate = ajv.addSchema(definitions).compile(schema);
    Schema.runTest(elem, ajv, validate)
  });
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const oppgaver = {
  testAll,
  testOne,
};
module.exports.oppgaver = oppgaver;
