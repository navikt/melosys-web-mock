const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');
const fs = require('fs');

const Soknader = require('../modules/soknader');
const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/soknad-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
const dokumenter = Soknader.lesAlleSoknader();

const validate = ajv.compile(schema);

function runTest(data) {
  const valid = validate(data);
  if (valid) {
    console.log(colors.green('\tValid!'));
    return 0;
  }
  else {
    console.log(colors.red('\tInvalid: ' + ajv.errorsText(validate.errors)));
    return -1;
  }
}
const test = () => {
  console.log(colors.blue('Soknad'));
  dokumenter.every((document) => runTest(document));
};

const soknad = {
  test,
};
exports.soknad = soknad;

