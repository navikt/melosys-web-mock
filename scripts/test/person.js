const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');
const fs = require('fs');

const Personer = require('../modules/personer');
const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/kodeverk-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
const dokumenter = Personer.lesAllePersoner();

const validate = ajv.compile(schema);

function runTest(data) {
  const valid = validate(data);
  if (valid) {
    console.log(colors.green('\tPerson Valid!'));
    return 0;
  }
  else {
    console.log(colors.red('\tInvalid: '+ ajv.errorsText(validate.errors)));
    return -1;
  }
}
const test = () => {
  console.log(colors.blue('Person'));
  dokumenter.every((document) => runTest(document));
};

const person = {
  test,
};
exports.person = person;

