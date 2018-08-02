const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const { kodeverk } = require('./test/kodeverk');

let validate = ajv.compile(kodeverk.schema);
test(kodeverk.dokument);

function test(data) {
  const valid = validate(data);
  if (valid) console.log('Valid!');
  else console.log('Invalid: ' + ajv.errorsText(validate.errors));
}
