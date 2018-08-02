const fs = require('fs');
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const MOCK_DATA_DIR = `${process.cwd()}/mock_data`;
const FAKTAAVKLARING_MOCK_DIR = `${MOCK_DATA_DIR}/faktaavklaring`;

const schemajson = `${FAKTAAVKLARING_MOCK_DIR}/faktaavklaring-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));

const validate = ajv.compile(schema);

// noinspection JSAnnotator
fs.readdirSync(FAKTAAVKLARING_MOCK_DIR).forEach(file => {
  if (!file.endsWith('schema.json')){
    const dokumentjson = `${FAKTAAVKLARING_MOCK_DIR}/${file}`;
    const dokument = JSON.parse(fs.readFileSync(dokumentjson, "utf8"));
    test(file, dokument);
  }
});

function test(file, data) {
  const valid = validate(data);
  if (valid) console.log(`${file} Valid!`);
  else console.log(`${file} Invalid!\n` + ajv.errorsText(validate.errors));
}
