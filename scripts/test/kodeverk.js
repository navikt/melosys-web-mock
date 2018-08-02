const fs = require('fs');
const Kodeverk = require('../modules/kodeverk');
const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/kodeverk-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
const dokument = Kodeverk.kodeverk;
const kodeverk = {
  schema,
  dokument,
};

//console.log(kodeverk);
exports.kodeverk = kodeverk;
