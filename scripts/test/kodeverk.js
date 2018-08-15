const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');
const fs = require('fs');

const Kodeverk = require('../modules/kodeverk');
const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/kodeverk-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
const dokument = Kodeverk.kodeverk;

const validate = ajv.compile(schema);

function runTest(data) {
  const valid = validate(data);
  if (valid) {
    console.log(colors.green('\tValid!'));
  }
  else {
    console.log(colors.red('Invalid: ') + ajv.errorsText(validate.errors));
  }
}
const test = () => {
  console.log(colors.blue('Kodeverk'));
  runTest(dokument);
};

const kodeverk = {
  test,
};
exports.kodeverk = kodeverk;

