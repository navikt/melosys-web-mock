//const { getInstalledPathSync } = require('get-installed-path');

//const SCRIPTS_DIR = getInstalledPathSync('melosys-schema', { local: true });
const SCRIPTS_DIR = `${process.cwd()}/scripts`;
module.exports.SCRIPTS_DIR = SCRIPTS_DIR;

const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;
module.exports.SCHEMA_DIR = SCHEMA_DIR;

const MOCK_DATA_DIR = `${SCRIPTS_DIR}/mock_data`;
module.exports.MOCK_DATA_DIR = MOCK_DATA_DIR;
