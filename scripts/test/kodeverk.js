const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
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
    console.log('Valid!');
    return 0;
  }
  else {
    console.log('Invalid: ' + ajv.errorsText(validate.errors));
    return -1;
  }
}
const test = () => {
  runTest(dokument);
};

const kodeverk = {
  test,
};
exports.kodeverk = kodeverk;

