const fs = require('fs');
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const cwd = process.cwd();
const SCRIPTS_DIR = cwd.endsWith('scripts') ? cwd : `${cwd}/scripts`;
const MOCK_DATA_DIR = `${SCRIPTS_DIR}/mock_data`;
const FAGSAKER_MOCK_DIR = `${MOCK_DATA_DIR}/organisasjoner`;

const schemajson = `${FAGSAKER_MOCK_DIR}/organisasjoner-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));

const validate = ajv.compile(schema);

// noinspection JSAnnotator
fs.readdirSync(FAGSAKER_MOCK_DIR).forEach(file => {
  if (!file.endsWith('schema.json')){
    const dokumentjson = `${FAGSAKER_MOCK_DIR}/${file}`;
    const dokument = JSON.parse(fs.readFileSync(dokumentjson, "utf8"));
    test(file, dokument);
  }
});

function test(file, data) {
  const valid = validate(data);
  if (valid) console.log(`${file} Valid!`);
  else console.log(`${file} Invalid!\n` + ajv.errorsText(validate.errors));
}
